# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gothic NPC Creator is a web-based tool for creating NPCs (Non-Player Characters) for the Gothic 1 and Gothic 2 video games. The application provides a 3D preview of NPCs and generates valid Daedalus script code for use in Gothic mods.

**Key Features:**
- Visual NPC composition with 3D preview (body, head, armor)
- Real-time texture swapping with multi-path fallback system
- Daedalus script generation for Gothic 1 & 2
- Daily routine editor with waypoint autocomplete from .ZEN world files
- Export NPC configurations as JSON
- Hybrid texture system (variant-based for standard mode, file-based for G1 Female)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint TypeScript/TSX files
npm run lint

# Preview production build
npm run preview
```

## Architecture

### State Management with Zustand

The app uses a single Zustand store (`src/stores/npcStore.ts`) that holds the entire NPC configuration. All components access and modify state through this store using selector hooks to minimize re-renders.

**Key selectors:**
- `useNPCStore((state) => state.config.gameVersion)` - Get current game version (g1/g2)
- `useNPCStore((state) => state.config.gender)` - Get current NPC gender
- `useNPCStore((state) => state.config.bodyMesh)` - Get body mesh ID

**State updates trigger component remounts:**
- Gender/game version changes use React `key` prop to force remount and avoid stale state
- Example: `<TextureSelector key={`${gameVersion}-${gender}`} />`

### Dynamic Asset Discovery

Assets (3D models and textures) are **dynamically discovered at build time** using Vite's `import.meta.glob` in `src/utils/assetDiscovery.ts`. This means:

- No hardcoded asset lists - models and textures are auto-detected from the filesystem
- Assets must follow naming conventions:
  - Models: `/public/assets/{g1|g2}/{male|female}/{bodies|heads|armors}/FILENAME.glb`
  - Textures: `/public/assets/{g1|g2}/{male|female}/textures/{body|head}/BASENAME_Vx_Cy.{png|PNG|tga|TGA}`
  - Scenes: `/public/assets/scenes/FILENAME.glb` (game-version independent)

**Adding new assets:**
1. Place GLB model in appropriate folder
2. Place textures with `_Vx_Cy` suffix (variant + skin color)
3. Rebuild or restart dev server - assets are discovered on build automatically

### Texture System (Hybrid)

**Standard Mode (G2 Male/Female, G1 Male):**
- Variant-based selection using `bodyTexture` + `skinColor`
- Card-based UI showing texture previews
- Textures are auto-discovered from the filesystem (no configuration needed)

**G1 Female Mode:**
- File-based selection using `bodyTextureFile` + `headTextureFile`
- Slider-based UI showing texture count
- No skin color selector
- No armor support
- Direct filename selection

**Multi-Path Loading Pipeline:**
1. `assetDiscovery.ts` - Scans and catalogues all texture files
2. `assetPaths.ts` - Returns array of possible texture paths to try
3. `textureLoader.ts` - Tries each path sequentially (PNG → TGA → JPG)
4. `BodyMesh.tsx`/`HeadMesh.tsx` - Applies loaded texture or fallback color

### Three.js 3D Preview

The 3D preview is built with `@react-three/fiber` and `@react-three/drei`:

- **NPCPreview3D.tsx** - Main Canvas component
- **NPCModel.tsx** - Composites body, head, and armor meshes
- **BodyMesh.tsx**, **HeadMesh.tsx**, **ArmorMesh.tsx** - Individual mesh components with texture loading
- **SceneLoader.tsx** - Loads Gothic .ZEN world files as background scenes

**Important Details:**
- Head meshes use `headOffsetX/Y/Z` for skeleton alignment (stored in NPC config)
- Textures use `MeshBasicMaterial` (unlit) for consistent preview
- `fatness` parameter scales X/Z only (preserves height)
- Texture loading uses dependency optimization: `useEffect(() => {...}, [texturePaths.join(',')])`

### Daedalus Script Generation

The `src/utils/daedalusGenerator.ts` module converts the NPC configuration to valid Daedalus script format. Key points:

- Generates `instance` definitions with all NPC properties
- Automatically creates daily routine functions (`Rtn_Start_INSTANCENAME`)
- **Head texture variants are used directly** (no offset calculation)
  - Male heads: 0-136 in filenames → used as-is in script
  - Female heads: 137+ in filenames → used as-is in script
- Validates instance names for Daedalus compatibility

### Component Organization

```
src/
├── components/
│   ├── editors/          # Identity, Attribute, Combat, Visual, Routine editors
│   ├── selectors/        # Game, Gender, Body, Head, Armor, Texture selectors
│   │   ├── TextureSelector.tsx  # Hybrid texture selector (standard + G1 Female)
│   │   ├── ArmorSelector.tsx    # Hidden for G1 Female
│   │   └── ...
│   ├── preview/          # All Three.js 3D components
│   ├── layout/           # Sidebar, MainPanel, BottomPanel layout containers
│   ├── ui/               # Reusable UI primitives (shadcn/ui based)
│   ├── ExportPanel.tsx   # Export/Import functionality
│   └── ScriptPreview.tsx # Daedalus script display
├── stores/
│   ├── npcStore.ts       # Central Zustand state management
│   └── thumbnailStore.ts # Cached thumbnails for armor/body previews
├── utils/
│   ├── assetDiscovery.ts # Dynamic asset discovery via import.meta.glob
│   ├── assetPaths.ts     # Path resolution for models/textures
│   ├── textureLoader.ts  # Multi-path texture loading with format fallbacks
│   ├── daedalusGenerator.ts # Script generation
│   ├── zenParser.ts      # .ZEN world file parser for waypoints
│   └── exportUtils.ts    # JSON export/import
├── types/
│   ├── npc.ts            # NPCConfig interface and types
│   └── assets.ts         # Asset-related types
├── config/
│   └── constants.ts      # Centralized application constants (ranges, defaults)
└── data/
    ├── guilds.ts         # Guild discovery (wraps assetDiscovery)
    ├── voiceSets.ts      # Voice set discovery (wraps assetDiscovery)
    ├── fightTactics.ts   # Combat AI tactics discovery
    ├── scenes.ts         # Scene discovery (wraps assetDiscovery)
    └── zenFiles.ts       # ZEN world file discovery
```

## Gothic-Specific Knowledge

### Game Version Differences

- **Gothic 1 (g1)**: Simpler body/head system, fewer armors
  - **G1 Female**: Special case - no armor, file-based texture selection
- **Gothic 2 (g2)**: More body/head variants, expanded armor sets

Assets are stored separately: `/public/assets/g1/` and `/public/assets/g2/`

### Asset File Formats

- **Models**: GLB format (converted from Gothic's ASC format)
- **Textures**: PNG/TGA with naming pattern `BASENAME_V{variant}_C{skinColor}.png`
  - Multiple base names supported per body mesh
  - Head textures use absolute variant numbers (0-136 male, 137+ female)

### Daedalus Script Structure

Generated scripts follow this pattern:
```daedalus
instance NPC_NAME (Npc_Default) {
    // Identity, attributes, visuals, combat, routine
    Mdl_SetVisualBody(self, "hum_body_Naked0", 0, 1, "Hum_Head_Pony", 5, 0, ITAR_PAL_H);
    //                       bodyMesh          bodyTex skinColor headMesh    headTex teeth armor
    // ...
}

func void Rtn_Start_NPC_NAME() {
    // Daily routine entries (TA_* functions)
    TA_Stand_Guarding(08, 00, 20, 00, "WP_CASTLE_GATE");
}
```

**Important:** Head texture index is the absolute variant number from the filename (no conversion needed).

### ZEN World Files

The app can parse **uncompiled** (ASCII) .ZEN files to extract waypoint names for routine autocomplete. Compiled binary .ZEN files are not supported.

Waypoints are extracted via regex: `wpName=string:(WP_[A-Z0-9_]+)` and `wpName=string:(FP_[A-Z0-9_]+)`

## React Hooks Rules

**Critical:** Always call hooks in the same order. Never conditionally return before all hooks are called.

**Bad:**
```typescript
function Component() {
  if (condition) return null  // ❌ Early return before hooks
  const [state, setState] = useState(0)
  useEffect(() => {...}, [])
}
```

**Good:**
```typescript
function Component() {
  const [state, setState] = useState(0)
  useEffect(() => {...}, [])
  if (condition) return null  // ✅ Return after all hooks
}
```

**Gender/Version Switching:**
- Use React `key` prop to force remount: `<Component key={`${gameVersion}-${gender}`} />`
- This prevents stale state and hook order issues

## Path Alias

TypeScript is configured with `@/*` alias pointing to `src/*`. Use this for imports:

```typescript
import { useNPCStore } from '@/stores/npcStore'
import { generateDaedalusScript } from '@/utils/daedalusGenerator'
import { loadTextureFromPaths } from '@/utils/textureLoader'
```

## Styling

- **Tailwind CSS** for utility classes
- **Custom theme** in `tailwind.config.js` with Gothic-inspired colors (obsidian, ember, stone, iron)
- **shadcn/ui components** in `src/components/ui/` (accordion, tabs, sliders, etc.)

## Important Constraints

- **No backend** - purely client-side application
- **Assets must be pre-converted** - Original Gothic ASC/TEX formats are converted to GLB/PNG offline
- **Asset discovery is build-time only** - New assets require rebuild to be detected
- **ZEN parsing is limited** - Only uncompiled ASCII .ZEN files are supported
- **Head texture variants are absolute** - Female heads use V137+ in filenames (no offset conversion)
- **G1 Female restrictions** - No armor support, file-based texture selection only
- **All assets are auto-discovered** - No manual configuration needed for new assets

## Testing

No test framework is currently configured. Manual testing via the dev server is the primary method.

## Documentation Files

- **application.md** - Original project specification (Gothic NPC Creator design doc)
- **ZEN_FILE_INTEGRATION.md** - Details on ZEN world file integration for waypoint suggestions
- **DYNAMIC_ASSETS.md** - Guide for adding new assets dynamically
- **TEXTURE_SYSTEM.md** - Complete texture system documentation (hybrid mode explanation)
