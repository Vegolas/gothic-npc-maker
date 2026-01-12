# Texture Selection System

The NPC Maker uses a **hybrid texture selection system**:
- **Standard mode (variant-based)** for G2 Male/Female and G1 Male
- **G1 Female mode (file-based override)** for previewing textures by exact filename

## How It Works

### Standard System (Variant-Based)

**Used for:** G2 Male, G2 Female, G1 Male

Textures are selected using two parameters:
- **Variant** (V0, V1, V2...) - texture variation/design
- **Skin Color** (C0, C1, C2...) - skin tone

**Body textures are resolved by directory, not by base-name matching.** The selected body mesh lives in a body *category directory*, and all textures inside that directory are considered compatible with all meshes in that directory.

**Example** (body directory contains multiple meshes sharing the same textures):
```text
/public/assets/g2/male/bodies/HUM_BODY_NAKED/
  HUM_BODY_NAKED0.glb
  HUM_BODY_NAKED1.glb
  V0_C0.png
  V0_C1.png
  V1_C0.png
```

**Key Features:**
- Card-based UI showing texture thumbnails
- Skin color selector (uses V0 for preview consistency)
- Body variant selector
- Head variant selector

### G1 Female System (File-Based Override)

**Used for:** G1 Female only

G1 female uses **direct texture filename selection** for preview because the available textures are best treated as a browseable set (and armor is disabled for G1 female).

**Features:**
- Card/slider UI for selecting **bodyTextureFile** and **headTextureFile**
- No skin color selector
- No armor selector

## Texture Discovery

All assets are discovered at build time via Vite `import.meta.glob` (see `src/utils/assetDiscovery.ts`).

### Body Meshes + Body Textures (Directory-Based)

**Location:**
```text
/public/assets/{g1|g2}/{male|female}/bodies/{CATEGORY}/
```

- One **CATEGORY** directory can contain **one or more** `.glb` body meshes.
- **All textures in that CATEGORY directory apply to all meshes in the same directory.**

**Body texture naming convention (discovery):**
- Any filename that contains `_V{variant}` and optional `_C{skinColor}` is discovered.
- Examples:
  - `V0_C0.png`
  - `HUM_BODY_SOMETHING_V2_C1.tga`
  - `FOO_V3.jpg`

If `_C{skinColor}` is omitted, skin color defaults to `0`.

> Backward compatibility: legacy bodies at `/public/assets/{g1|g2}/{male|female}/bodies/{MESH}.glb` are still supported; the mesh name is treated as the directory name for texture lookup.

### Head Textures

**Location:**
```text
/public/assets/{g1|g2}/{male|female}/textures/head/
```

**Naming convention:** `{BASENAME}_V{x}_C{y}.{png|tga|jpg}`

**Important - Absolute Variant Numbers:**
- **Male heads:** V0-V136
- **Female heads:** V137+

The variant number in the filename is used directly in Daedalus (no offset conversion).

## Storage

The NPC configuration stores:

**Standard Mode (G2 Male/Female, G1 Male):**
- `bodyTexture: number` - body variant index
- `skinColor: number` - skin color index
- `headTexture: number` - head variant index (absolute)
- `bodyTextureFile/headTextureFile: null`

**G1 Female Mode (preview):**
- `bodyTextureFile: string | null` - exact body texture filename
- `headTextureFile: string | null` - exact head texture filename
- The numeric fields (`bodyTexture/headTexture/skinColor`) are still present for legacy reasons.

## Texture Loading Pipeline

1. **Discovery** (`src/utils/assetDiscovery.ts`)
   - Scans texture files using `import.meta.glob` at build time
   - For bodies: extracts `{variant, skinColor}` from files in the selected body directory

2. **Path Resolution** (`src/utils/assetPaths.ts`)
   - Standard mode uses `getBodyTexturePaths()` / `getHeadTexturePath()`
   - G1 female preview can override with the exact filename (`bodyTextureFile` / `headTextureFile`)

3. **Sequential Loading** (`src/utils/textureLoader.ts`)
   - Tries candidate paths sequentially (PNG/TGA/JPG)

4. **Mesh Application** (`src/components/preview/BodyMesh.tsx`, `HeadMesh.tsx`)
   - Applies loaded texture (or a fallback color if missing)

## Daedalus Script Generation

The script generator currently uses the numeric values:

```daedalus
Mdl_SetVisualBody(self, "hum_body_Naked0", 0, 1, "Hum_Head_Pony", 5, 0, ITAR_PAL_H);
//                       body mesh        variant  skin  head mesh    variant  teeth  armor
```

Note: `bodyTextureFile/headTextureFile` are used for **preview/export**, but are **not currently converted** into Daedalus values by `src/utils/daedalusGenerator.ts`.

## Adding New Textures

### Standard Textures (G2 Male/Female, G1 Male)

1. Put the body mesh(es) and textures together in a category directory:
   - `/public/assets/{g1|g2}/{male|female}/bodies/{CATEGORY}/`
2. Name textures with `_V{variant}` (and optionally `_C{skinColor}`)
3. Restart dev server (or rebuild) so Vite picks up new assets

Example:
```text
/public/assets/g2/male/bodies/HUM_BODY_NAKED/V0_C0.png
/public/assets/g2/male/bodies/HUM_BODY_NAKED/V0_C1.png
/public/assets/g2/male/bodies/HUM_BODY_NAKED/V1_C0.png
```

### G1 Female Textures

- **Body:** same as above (textures are discovered from the selected body directory and must include `_V{n}` to be discoverable).
- **Head:** place files in `/public/assets/g1/female/textures/head/` (any filename is listable, but using `_V{n}` keeps the UI labels meaningful).

## Known Limitations

1. **Build-time discovery** - new assets require dev server restart/rebuild
2. **G1 Female restrictions** - no armor support
3. **Head texture variants must be absolute** - female heads must use V137+ in filenames
4. **Texture format support** - PNG, TGA, JPG only (loaded in that order)
5. **Bodies are directory-scoped** - textures are selected only from the chosen body category directory
