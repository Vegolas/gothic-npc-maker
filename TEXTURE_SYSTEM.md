# Texture Selection System

The NPC Maker uses a **hybrid texture selection system** that combines variant-based selection (standard) with file-based selection (G1 Female special case).

## How It Works

### Standard System (Variant-Based)

**Used for:** G2 Male, G2 Female, G1 Male

Textures are selected using two parameters:
- **Variant** (V0, V1, V2...) - Texture variation/design
- **Skin Color** (C0, C1, C2) - Skin tone (light, medium, dark)

The system constructs and tries multiple filename patterns based on configured base names.

**Example for male body with variant 0 and skin color 1:**
```
HUM_BODY_NAKED_V0_C1.PNG     ← Tried first
HUM_BODY_COOKSMITH_V0_C1.PNG ← Tried if first fails
```

**Key Features:**
- Card-based UI showing texture thumbnails
- Skin color selector (always uses V0 for preview consistency)
- Body variant selector
- Head variant selector
- All selectors show actual texture previews

### G1 Female System (File-Based)

**Used for:** G1 Female only

G1 female models use direct file selection because:
- Textures don't follow the standard V/C naming convention
- No armor support
- Historically used custom texture names

**Features:**
- Slider-based UI showing texture count (1/5, 2/5...)
- Filename display below slider
- No skin color selector
- No armor selector
- Direct file path selection

## Texture Discovery

### Body Textures

**Location:** `/public/assets/{g1|g2}/{male|female}/textures/body/`

**Naming Convention:** `BASENAME_Vx_Cy.{png|PNG|tga|TGA}`
- `BASENAME` - One or more configured base names (e.g., HUM_BODY_NAKED, HUM_BODY_COOKSMITH)
- `x` - Variant number (0-N)
- `y` - Skin color (0-2)

**Multi-Base Name Support:**
Body meshes can have multiple texture base names configured in `src/data/textures.ts`:
```typescript
'hum_body_Naked0': {
  baseFileName: ['HUM_BODY_NAKED', 'HUM_BODY_COOKSMITH'],
  variantCount: 5,
  skinColorCount: 3,
}
```

The loader tries all configured base names sequentially until one loads successfully.

**Discovery Rules:**
- Textures are matched by checking if the base name matches the body mesh
- Body mesh `hum_body_Naked0` matches both `HUM_BODY_NAKED_*` and `HUM_BODY_COOKSMITH_*`
- Female textures use the same base names but are in separate directories

### Head Textures

**Location:** `/public/assets/{g1|g2}/{male|female}/textures/head/`

**Naming Convention:** `HUM_HEAD_Vx_Cy.{png|PNG|tga|TGA}`

**Important - Absolute Variant Numbers:**
- **Male heads:** V0-V136 (e.g., `HUM_HEAD_V0_C0.png`)
- **Female heads:** V137+ (e.g., `HUM_HEAD_V137_C0.png`)

The variant number in the filename IS the Daedalus script value. No offset calculation is performed.

**Discovery Rules:**
- All head textures in the gender's directory are discovered
- Variant numbers are extracted directly from filenames
- No mesh-specific filtering (all heads can use any head texture)

## Storage

The NPC configuration stores:

**Standard Mode (G2 Male/Female, G1 Male):**
- `bodyTexture: number` - Body texture variant index (0-N)
- `headTexture: number` - Head texture variant index (absolute: 0-136 for male, 137+ for female)
- `skinColor: number` - Skin color index (0-2)
- `bodyTextureFile: null` - Not used
- `headTextureFile: null` - Not used

**G1 Female Mode:**
- `bodyTextureFile: string | null` - Full texture filename (e.g., "BABE_BODY_V0.PNG")
- `headTextureFile: string | null` - Full texture filename (e.g., "BABE_HEAD_V1.PNG")
- `bodyTexture: number` - Legacy, not used
- `headTexture: number` - Legacy, not used
- `skinColor: number` - Legacy, not used

## Texture Loading Pipeline

1. **Discovery** (`src/utils/assetDiscovery.ts`)
   - Scans texture files using `import.meta.glob` at build time
   - Extracts variant and skin color from filenames
   - Returns all matching texture paths

2. **Path Resolution** (`src/utils/assetPaths.ts`)
   - `getBodyTexturePaths()` returns array of possible paths to try
   - Uses `findBodyTextures()` to get all matching base names
   - `getHeadTexturePath()` returns single path (heads have one base name)

3. **Sequential Loading** (`src/utils/textureLoader.ts`)
   - `loadTextureFromPaths()` tries each path in sequence
   - Tries PNG, TGA, JPG extensions for each path
   - Returns first successful texture or null

4. **Mesh Application** (`src/components/preview/BodyMesh.tsx`, `HeadMesh.tsx`)
   - Receives texture paths based on mode (file-based or variant-based)
   - Applies loaded texture to mesh material
   - Falls back to placeholder color if loading fails

## Daedalus Script Generation

The script generator uses the stored values directly:

**Standard Mode:**
```daedalus
Mdl_SetVisualBody(self, "hum_body_Naked0", 0, 1, "Hum_Head_Pony", 5, 0, ITAR_PAL_H);
//                       body mesh        variant  skin  head mesh    variant  teeth  armor
```

**G1 Female Mode:**
- Body/head texture files are converted to variant numbers for script generation
- Or custom handling is applied (implementation-specific)

## Automatic Initialization

When changing:
- **Game Version** → Resets to defaults for that version
- **Gender** → Loads first body/head for gender, sets appropriate texture mode
  - G1 Female → File-based mode, first texture file
  - Others → Variant-based mode, variant 0, skin color 0
- **Body Mesh** → Loads first available texture for that mesh
- **Head Mesh** → Loads first available texture variant

## Adding New Textures

### Standard Textures (G2 Male/Female, G1 Male)

1. Create texture with proper naming: `BASENAME_V{variant}_C{skinColor}.png`
2. Place in: `/public/assets/{g1|g2}/{male|female}/textures/{body|head}/`
3. Rebuild or restart dev server

Example:
```
/public/assets/g1/male/textures/body/HUM_BODY_NAKED_V5_C0.PNG
/public/assets/g1/male/textures/body/HUM_BODY_COOKSMITH_V5_C0.PNG
/public/assets/g1/male/textures/head/HUM_HEAD_V20_C0.PNG
```

### G1 Female Textures

1. Any filename works (no strict naming convention)
2. Place in: `/public/assets/g1/female/textures/{body|head}/`
3. Rebuild or restart dev server

Example:
```
/public/assets/g1/female/textures/body/BABE_CUSTOM_DRESS.PNG
/public/assets/g1/female/textures/head/BABE_FACE_BLONDE.PNG
```

### Adding New Base Names

To add support for new body texture base names:

1. Edit `src/data/textures.ts`
2. Add to `baseFileName` array:
```typescript
'hum_body_Naked0': {
  baseFileName: ['HUM_BODY_NAKED', 'HUM_BODY_COOKSMITH', 'HUM_BODY_CUSTOM'],
  variantCount: 5,
  skinColorCount: 3,
}
```
3. Add corresponding texture files
4. Rebuild

## UI Components

### Card-Based Selector (Standard Mode)

**Location:** `src/components/selectors/TextureSelector.tsx`

- **Skin Color Cards** - Always show V0 textures for consistency
- **Body Variant Cards** - Show selected skin color
- **Head Variant Cards** - Show selected skin color
- Optional slider view (can toggle between cards/sliders)

### File-Based Selector (G1 Female)

**Location:** `src/components/selectors/TextureSelector.tsx` → `G1FemaleTextureSelector`

- Body texture slider with filename display
- Head texture slider with filename display
- No skin color selector
- No variant cards

## Known Limitations

1. **Build-time discovery** - New textures require rebuild/dev server restart
2. **G1 Female restrictions** - No armor support, file-based only
3. **Head texture variants must be absolute** - Female heads must use V137+ in filenames
4. **Texture format support** - PNG, TGA, JPG only (loaded in that order)
5. **Multiple base names must be configured** - Not auto-detected from filesystem
