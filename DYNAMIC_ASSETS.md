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
- `x` = variant number (0-N)
- `y` = skin color number (0-N)

Example:
```
/public/assets/g1/male/textures/body/HUM_BODY_NAKED_V0_C0.PNG
/public/assets/g1/male/textures/body/HUM_BODY_NAKED_V0_C1.PNG
/public/assets/g1/male/textures/body/HUM_BODY_NAKED_V1_C0.PNG
```

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
**Location:** `/public/assets/{g1|g2}/scenes/`

Just drop GLB scene files. The filename (without extension) becomes the scene ID.

Example:
```
/public/assets/g1/scenes/oldcamp.glb  → Scene ID: "oldcamp"
/public/assets/g1/scenes/newworld.glb → Scene ID: "newworld"
```

### ZEN World Files
**Location:** `/public/assets/{g1|g2}/worlds/`

Drop uncompiled (ASCII) `.ZEN` files. The app will parse waypoints from them.

Example:
```
/public/assets/g1/worlds/WORLD UNCOMPILED.ZEN
/public/assets/g2/worlds/NEWWORLD.ZEN
```

**Note:** Only uncompiled (text-based) ZEN files are supported. Binary ZEN files will show an error.

## After Adding Files

Run `npm run build` to regenerate the asset manifest. Vite's `import.meta.glob` discovers files at build time, not runtime.

For development, restart the dev server (`npm run dev`) after adding new files.

## Showing Friendly Names

All selects now show the raw IDs/filenames (e.g., "GIL_PAL", "FAI_HUMAN_STRONG"). This is intentional for a developer-focused tool. If you want friendly names, edit the component to add a mapping function.
