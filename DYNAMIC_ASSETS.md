# Dynamic Asset Discovery Guide

All selects/dropdowns in the NPC Maker now dynamically discover their options from the filesystem. No hardcoded data in code files.

## How to Add New Items

### Bodies, Heads, Armors
**Location:** `/public/assets/{g1|g2}/{male|female}/{bodies|heads|armors}/`

Just drop GLB files in the appropriate folder. They'll be auto-discovered on next build.

Example:
```
/public/assets/g1/male/bodies/MY_NEW_BODY.glb
```

### Textures
**Location:** `/public/assets/{g1|g2}/{male|female}/textures/{body|head}/`

**Naming convention:** `BASENAME_Vx_Cy.{png|PNG|tga|TGA}`
- `x` = variant number (0-N) - **absolute variant number** from the texture files
- `y` = skin color number (0-2, typically)

**Important Notes:**
- **Male head textures:** Use V0-V136 (e.g., `HUM_HEAD_V0_C0.png`)
- **Female head textures:** Use V137+ (e.g., `HUM_HEAD_V137_C0.png`)
- The variant number is extracted directly from the filename - no offset calculation needed
- **Body textures can have multiple base names** for the same body mesh

**Body Texture Base Names:**
Male bodies support multiple texture base names (defined in `src/data/textures.ts`):
- `HUM_BODY_NAKED_V0_C0.png` - Standard naked body texture
- `HUM_BODY_COOKSMITH_V0_C0.png` - Alternative cooksmith texture

When selecting a body variant and skin color, the app will try loading textures from all configured base names in sequence until one succeeds.

Example:
```
/public/assets/g1/male/textures/body/HUM_BODY_NAKED_V0_C0.PNG
/public/assets/g1/male/textures/body/HUM_BODY_NAKED_V0_C1.PNG
/public/assets/g1/male/textures/body/HUM_BODY_COOKSMITH_V0_C0.PNG
/public/assets/g1/male/textures/head/HUM_HEAD_V0_C0.PNG
/public/assets/g1/female/textures/head/HUM_HEAD_V137_C0.PNG
```

**G1 Female Special Case:**
- G1 female uses **file-based texture selection** instead of variant-based
- No skin color selector (textures are picked directly by filename)
- No armor support
- All available texture files are discovered and presented as a slider

### Guilds
**Location:** `/public/assets/{g1|g2}/data/guilds.txt`

One guild ID per line. Lines starting with `#` are comments (ignored).

Example:
```
# My custom guilds
GIL_NONE
GIL_GRD
GIL_PAL
GIL_CUSTOM_FACTION
```

### Fight Tactics
**Location:** `/public/assets/{g1|g2}/data/tactics.txt`

One tactic ID per line. Lines starting with `#` are comments.

Example:
```
# Fight AI tactics
FAI_HUMAN_COWARD
FAI_HUMAN_NORMAL
FAI_HUMAN_STRONG
FAI_CUSTOM_BERSERKER
```

### Voice Sets
**Location:** `/public/assets/{g1|g2}/{male|female}/voices/`

**Naming convention:** `SVM_{id}_*.{wav|WAV|mp3|MP3|ogg|OGG}`
- `id` = voice set number

All audio files matching the same ID are grouped together as samples.

Example:
```
/public/assets/g1/male/voices/SVM_1_Smalltalk01.wav
/public/assets/g1/male/voices/SVM_1_Smalltalk02.wav
/public/assets/g1/male/voices/SVM_2_Smalltalk01.wav
```

### Scenes
**Location:** `/public/assets/scenes/`

Just drop GLB scene files. The filename (without extension) becomes the scene ID.

Example:
```
/public/assets/scenes/oldcamp.glb  → Scene ID: "oldcamp"
/public/assets/scenes/newworld.glb → Scene ID: "newworld"
```

**Note:** Scenes are game-version independent and shared across G1/G2.

### ZEN World Files
**Location:** `/public/assets/{g1|g2}/worlds/`

Drop uncompiled (ASCII) `.ZEN` files. The app will parse waypoints from them for autocomplete in the daily routine editor.

Example:
```
/public/assets/g1/worlds/WORLD UNCOMPILED.ZEN
/public/assets/g2/worlds/NEWWORLD.ZEN
```

**Note:** Only uncompiled (text-based) ZEN files are supported. Binary ZEN files cannot be parsed.

## Texture Loading System

The app uses a multi-path texture loading system:

1. **Discovery:** `src/utils/assetDiscovery.ts` scans texture files using `import.meta.glob`
2. **Path Resolution:** `src/utils/assetPaths.ts` returns all possible texture paths for a given variant/skin color
3. **Sequential Loading:** `src/utils/textureLoader.ts` tries each path until one succeeds
4. **Fallback:** If no texture loads, a placeholder color is shown

**Configuration:**
Body texture base names are configured in `src/data/textures.ts`:
```typescript
export const BODY_TEXTURES: Record<string, BodyTextureConfig> = {
  'hum_body_Naked0': {
    gender: 'male',
    baseFileName: ['HUM_BODY_NAKED', 'HUM_BODY_COOKSMITH'],
    variantCount: 5,
    skinColorCount: 3,
  },
  // ...
}
```

## After Adding Files

Run `npm run build` to regenerate the asset manifest. Vite's `import.meta.glob` discovers files at build time, not runtime.

For development, restart the dev server (`npm run dev`) after adding new files.

## Showing Friendly Names

All selects now show the raw IDs/filenames (e.g., "GIL_PAL", "FAI_HUMAN_STRONG"). This is intentional for a developer-focused tool. If you want friendly names, edit the component to add a mapping function.

## Known Limitations

1. **Head texture variants are absolute:** No relative-to-absolute conversion happens. Female head textures must use V137+ in filenames.
2. **G1 Female restrictions:** No armor support, file-based texture selection only.
3. **Build-time discovery:** New assets require rebuild/dev server restart to be detected.
