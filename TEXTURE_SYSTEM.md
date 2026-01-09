# Texture Selection System

The NPC Maker now uses a **file-based texture selection** system instead of parametric naming (variant + skin color).

## How It Works

### Old System (Parametric)
Previously, textures were selected using two parameters:
- **Variant** (V0, V1, V2...)
- **Skin Color** (C0, C1, C2...)

The system would construct filenames like: `HUM_BODY_NAKED_V0_C1.PNG`

**Problem:** Not all texture sets follow this naming convention, especially for Gothic 1 female models.

### New System (File-Based)

Textures are now discovered from the filesystem and selected directly by filename using sliders.

#### Body Texture Slider
- **Location:** Visual Editor tab
- **Function:** Slides through all discovered body texture files for the current body mesh
- **Display:** Shows `1/5`, `2/5`, etc. and the actual filename below

#### Head Texture Slider
- **Location:** Visual Editor tab
- **Function:** Slides through all discovered head texture files
- **Display:** Shows `1/12`, `2/12`, etc. and the actual filename below

## Discovery Rules

### Body Textures
Files in: `/public/assets/{g1|g2}/{male|female}/textures/body/`

Matched by checking if the filename contains the body mesh base name (e.g., "BABE", "HUM_BODY_NAKED").

Example for body mesh `BABE`:
```
BABE_BODY_V0.PNG      ← Matched
BABE_BODY_V1.PNG      ← Matched
BABE_BODY_V2.PNG      ← Matched
HUM_BODY_NAKED_V0.PNG ← Not matched (different body)
```

### Head Textures
Files in: `/public/assets/{g1|g2}/{male|female}/textures/head/`

**All head texture files** in the directory are shown (no filtering by head mesh name).

Example:
```
BABE_HEAD_V0.PNG
BABE_HEAD_V1.PNG
HUM_HEAD_V0.PNG
HUM_HEAD_V1.PNG
```
All are available in the slider for any head mesh.

## Storage

The NPC configuration now stores:
- `bodyTextureFile: string | null` - Full texture filename (e.g., "BABE_BODY_V0.PNG")
- `headTextureFile: string | null` - Full texture filename (e.g., "BABE_HEAD_V1.PNG")

Legacy fields still exist for backwards compatibility:
- `bodyTexture: number` - Old variant index
- `skinColor: number` - Old color index
- `headTexture: number` - Old variant index

## Automatic Initialization

When you change:
- **Gender** → First texture file for default body/head is selected
- **Body Mesh** → First texture file for that body is selected
- **Head Mesh** → First texture file is selected

## 3D Preview

The mesh components (BodyMesh, HeadMesh) now accept an optional `textureFile` prop:
- If `textureFile` is set → Use direct path: `/assets/{game}/{gender}/textures/body/{textureFile}`
- If `textureFile` is null → Fall back to old parametric system (variant + skinColor)

This ensures backwards compatibility with existing configs.

## Adding New Textures

Just drop texture files in the appropriate directory:
```
/public/assets/g1/female/textures/body/MY_NEW_TEXTURE.PNG
/public/assets/g1/female/textures/head/CUSTOM_FACE.PNG
```

Rebuild and the sliders will include them automatically.

## Legacy Support

The old skin color slider has been **removed** from the texture selectors since textures are now selected by full filename.

If you have old configs that use the parametric system (variant + color), they'll still work - the system falls back to constructing paths when `textureFile` is null.
