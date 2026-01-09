# ZEN File Integration for NPC Routines

## Overview

The NPC Creator now supports loading Gothic world files (.ZEN) to provide waypoint suggestions for NPC daily routines.

## Features

- **World File Selection**: Choose from available .ZEN world files in the `public/assets/{g1|g2}/worlds/` directory
- **Validation**: Automatically detects if a .ZEN file is compiled or uncompiled
  - Only uncompiled (ASCII text-based) .ZEN files are supported
  - Compiled binary .ZEN files will show an error message
- **Waypoint Parsing**: Extracts all waypoints (WP_* and FP_*) from the selected world file
- **Autocomplete**: Waypoint fields in routine entries show suggestions from the loaded world file

## Usage

1. In the **Routine** editor tab, select a world file from the dropdown
2. The system will validate if the file is readable (uncompiled)
3. If valid, waypoints will be extracted and shown in the status indicator
4. When adding routine entries, waypoint fields will show autocomplete suggestions

## File Format Requirements

### Supported Format (Uncompiled ZEN)
```
ZenGin Archive
ver 1
zCArchiverGeneric
ASCII
...
wpName=string:WP_MARKET_01
...
```

### Unsupported Format (Compiled ZEN)
Binary files starting with non-ASCII characters - these will be rejected with an error message.

## Adding New World Files

To add new world files:

1. Place the uncompiled .ZEN file in `public/assets/{g1|g2}/worlds/`
2. Add the filename to the manifest in `src/data/zenFiles.ts`:

```typescript
export const ZEN_FILES: ZenFileManifest = {
  g1: [
    'WORLD UNCOMPILED.ZEN',
    'YOUR_NEW_WORLD.ZEN'  // Add here
  ],
  g2: [
    'WORLD UNCOMPILED.ZEN',
    'YOUR_NEW_WORLD.ZEN'  // Add here
  ]
}
```

## Technical Details

### Components
- `ZenFileSelector.tsx` - UI component for file selection and status display
- `zenParser.ts` - Utilities for validating and parsing ZEN files
- `zenFiles.ts` - Manifest of available world files

### Parsing Logic
The parser extracts waypoint names using regex patterns:
- `wpName=string:(WP_[A-Z0-9_]+)` - Standard waypoints
- `wpName=string:(FP_[A-Z0-9_]+)` - Free points

### State Management
The selected world file path is stored in the NPC configuration:
```typescript
config.zenWorldFile: string | null
```

This is persisted when exporting/loading NPC configurations.
