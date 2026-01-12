# Dynamic Asset Discovery Guide

The NPC Maker discovers most selectable content (meshes, textures, scenes, ZEN files, etc.) **from files under `public/assets/`** using Vite `import.meta.glob` at **build time** (`src/utils/assetDiscovery.ts`).

That means:
- There are **no hardcoded lists/manifests** to update for assets.
- After adding/removing files, you must **restart `npm run dev`** (or run a new build) so Vite re-indexes assets.

## How to Add New Items

### Bodies (Directory-Based)

**Location:**
```text
/public/assets/{g1|g2}/{male|female}/bodies/{CATEGORY}/
```

Put one or more `.glb` body meshes into the same `{CATEGORY}` directory.

Example:
```text
/public/assets/g2/male/bodies/HUM_BODY_NAKED/HUM_BODY_NAKED0.glb
/public/assets/g2/male/bodies/HUM_BODY_NAKED/HUM_BODY_NAKED1.glb
```

> Backward compatibility: legacy bodies at `/public/assets/{g1|g2}/{male|female}/bodies/{MESH}.glb` are still supported; the mesh name is treated as the directory name for texture lookup.

### Body Textures (Stored Next To Body Meshes)

**Location:** (same directory as the body meshes)
```text
/public/assets/{g1|g2}/{male|female}/bodies/{CATEGORY}/
```

**Discovery rule:** any texture file in that directory that contains `_V{variant}` and optional `_C{skinColor}` is treated as a body texture.

Examples:
```text
/public/assets/g2/male/bodies/HUM_BODY_NAKED/V0_C0.png
/public/assets/g2/male/bodies/HUM_BODY_NAKED/V0_C1.png
/public/assets/g2/male/bodies/HUM_BODY_NAKED/FOO_V2_C0.tga
```

Notes:
- `_C{skinColor}` is optional; if omitted, skin color defaults to `0`.
- **All textures in a body category directory apply to all meshes in that directory** (no string/base-name matching).

### Heads

**Location:**
```text
/public/assets/{g1|g2}/{male|female}/heads/
```

Drop head `.glb` files into that folder.

Example:
```text
/public/assets/g1/male/heads/HUM_HEAD_BALD.glb
```

### Head Textures

**Location:**
```text
/public/assets/{g1|g2}/{male|female}/textures/head/
```

**Naming convention:** `{BASENAME}_V{x}_C{y}.{png|tga|jpg}`

Important notes:
- **Male head textures:** use V0-V136
- **Female head textures:** use V137+
- The variant number is extracted directly from the filename (no offset conversion)

Example:
```text
/public/assets/g1/male/textures/head/HUM_HEAD_V0_C0.png
/public/assets/g1/female/textures/head/HUM_HEAD_V137_C0.png
```

### Armors

**Location:**
```text
/public/assets/{g1|g2}/armors/
```

Drop armor `.glb` files into that folder.

Example:
```text
/public/assets/g2/armors/ITAR_PAL_H.glb
```

### Guilds

**Location:** `/public/assets/{g1|g2}/data/guilds.txt`

One guild ID per line. Lines starting with `#` are treated as comments.

Example:
```text
# My custom guilds
GIL_NONE
GIL_GRD
GIL_CUSTOM_FACTION
```

### Fight Tactics

**Location:** `/public/assets/{g1|g2}/data/tactics.txt`

One tactic ID per line. Lines starting with `#` are treated as comments.

Example:
```text
# Fight AI tactics
FAI_HUMAN_COWARD
FAI_HUMAN_NORMAL
FAI_CUSTOM_BERSERKER
```

### Voice Sets

**Location:** `/public/assets/{g1|g2}/{male|female}/voices/`

**Naming convention:** `SVM_{id}_*.{wav|mp3|ogg}` (case-insensitive extensions are supported)

All audio files with the same `{id}` are grouped as one voice set.

Example:
```text
/public/assets/g1/male/voices/SVM_1_Smalltalk01.wav
/public/assets/g1/male/voices/SVM_1_Smalltalk02.wav
/public/assets/g1/male/voices/SVM_2_Smalltalk01.wav
```

### Scenes (3D Preview Backgrounds)

**Location:** `/public/assets/scenes/`

Drop `.glb` scene files. The filename (without extension) becomes the scene ID.

Example:
```text
/public/assets/scenes/oldcamp.glb  -> Scene ID: oldcamp
/public/assets/scenes/newworld.glb -> Scene ID: newworld
```

### ZEN World Files

**Location:** `/public/assets/{g1|g2}/worlds/`

Drop uncompiled (ASCII) `.ZEN`/`.zen` files. The app validates that the file is text-readable and then parses waypoints for routine autocomplete.

Example:
```text
/public/assets/g1/worlds/WORLD_UNCOMPILED.ZEN
/public/assets/g2/worlds/NEWWORLD.ZEN
```

## After Adding Files

Because discovery is build-time:
- Dev: restart the dev server (`npm run dev`)
- Production: rebuild (`npm run build`)

## Known Limitations

1. **Build-time discovery:** new/removed files require dev server restart/rebuild.
2. **Body textures must be discoverable:** body textures must include `_V{n}` in the filename to be detected.
3. **Head texture variants are absolute:** female head textures must use V137+ in filenames.
4. **ZEN parsing:** only uncompiled (text) ZEN files are supported.
5. **G1 Female restrictions:** no armor support; preview uses file-based texture selection.
