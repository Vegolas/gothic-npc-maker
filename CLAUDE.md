# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gothic NPC Creator is a web-based tool for creating NPCs (Non-Player Characters) for the Gothic 1 and Gothic 2 video games. The application provides a 3D preview of NPCs and generates valid Daedalus script code for use in Gothic mods.

**Key Features:**
- Visual NPC composition with 3D preview (body, head, armor)
- Real-time texture swapping and body modifications
- Daedalus script generation for Gothic 1 & 2
- Daily routine editor with waypoint autocomplete from .ZEN world files
- Export NPC configurations as JSON

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
- `useNPCGameVersion()` - Get current game version (g1/g2)
- `useNPCGender()` - Get current NPC gender
- `useNPCVisuals()` - Get all visual properties (body, head, armor, etc.)

### Dynamic Asset Discovery

Assets (3D models and textures) are **dynamically discovered at build time** using Vite's `import.meta.glob` in `src/utils/assetDiscovery.ts`. This means:

- No hardcoded asset lists - models and textures are auto-detected from the filesystem
- Assets must follow the naming convention: `/public/assets/{g1|g2}/{male|female}/{bodies|heads|armors}/FILENAME.glb`
- Textures follow: `/public/assets/{g1|g2}/{male|female}/textures/{body|head}/BASENAME_Vx_Cy.{png|PNG|tga|TGA}`

**Adding new assets:**
1. Place GLB model in appropriate folder
2. Place textures with `_Vx_Cy` suffix (variant + skin color)
3. Assets are automatically discovered on next build

### Three.js 3D Preview

The 3D preview is built with `@react-three/fiber` and `@react-three/drei`:

- **NPCPreview3D.tsx** - Main Canvas component
- **NPCModel.tsx** - Composites body, head, and armor meshes
- **BodyMesh.tsx**, **HeadMesh.tsx**, **ArmorMesh.tsx** - Individual mesh components with texture loading
- **SceneLoader.tsx** - Loads Gothic .ZEN world files as background scenes

**Important:** Head meshes are positioned using `headOffsetX/Y/Z` to align properly with body skeletons. These offsets are per-head and stored in the NPC config.

### Daedalus Script Generation

The `src/utils/daedalusGenerator.ts` module converts the NPC configuration to valid Daedalus script format. Key points:

- Generates `instance` definitions with all NPC properties
- Automatically creates daily routine functions (`Rtn_Start_INSTANCENAME`)
- Handles texture index mapping (female textures have different offsets)
- Validates instance names for Daedalus compatibility

### Component Organization

```
src/
├── components/
│   ├── editors/          # Identity, Attribute, Combat, Visual, Routine editors
│   ├── selectors/        # Game, Gender, Body, Head, Armor, Voice selectors
│   ├── preview/          # All Three.js 3D components
│   ├── layout/           # Sidebar, MainPanel, BottomPanel layout containers
│   ├── ui/               # Reusable UI primitives (shadcn/ui based)
│   ├── ExportPanel.tsx   # Export/Import functionality
│   └── ScriptPreview.tsx # Daedalus script display
├── stores/
│   └── npcStore.ts       # Central Zustand state management
├── utils/
│   ├── assetDiscovery.ts # Dynamic asset discovery via import.meta.glob
│   ├── assetPaths.ts     # Path resolution for models/textures
│   ├── daedalusGenerator.ts # Script generation
│   ├── zenParser.ts      # .ZEN world file parser for waypoints
│   └── exportUtils.ts    # JSON export/import
├── types/
│   ├── npc.ts            # NPCConfig interface and types
│   └── assets.ts         # Asset-related types
└── data/
    ├── guilds.ts         # Gothic guild definitions
    ├── voiceSets.ts      # Voice set mappings
    ├── fightTactics.ts   # Combat AI tactics
    ├── scenes.ts         # Available preview scenes
    └── zenFiles.ts       # ZEN world file manifest
```

## Gothic-Specific Knowledge

### Game Version Differences

- **Gothic 1 (g1)**: Simpler body/head system, fewer armors
- **Gothic 2 (g2)**: More body/head variants, expanded armor sets

Assets are stored separately: `/public/assets/g1/` and `/public/assets/g2/`

### Asset File Formats

- **Models**: GLB format (converted from Gothic's ASC format)
- **Textures**: PNG/TGA with naming pattern `BASENAME_V{variant}_C{skinColor}.png`

### Daedalus Script Structure

Generated scripts follow this pattern:
```daedalus
instance NPC_NAME (Npc_Default) {
    // Identity, attributes, visuals, combat, routine
    Mdl_SetVisualBody(self, bodyMesh, bodyTex, skinColor, headMesh, headTex, teethTex, armor);
    // ...
}

func void Rtn_Start_NPC_NAME() {
    // Daily routine entries (TA_* functions)
}
```

### ZEN World Files

The app can parse **uncompiled** (ASCII) .ZEN files to extract waypoint names for routine autocomplete. Compiled binary .ZEN files are not supported.

Waypoints are extracted via regex: `wpName=string:(WP_[A-Z0-9_]+)` and `wpName=string:(FP_[A-Z0-9_]+)`

## Path Alias

TypeScript is configured with `@/*` alias pointing to `src/*`. Use this for imports:

```typescript
import { useNPCStore } from '@/stores/npcStore'
import { generateDaedalusScript } from '@/utils/daedalusGenerator'
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

## Testing

No test framework is currently configured. Manual testing via the dev server is the primary method.

## Documentation Files

- **application.md** - Original project specification (Gothic NPC Creator design doc)
- **ZEN_FILE_INTEGRATION.md** - Details on ZEN world file integration for waypoint suggestions
