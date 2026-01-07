# Claude Code Prompt: Gothic NPC Creator with 3D Preview

## Project Overview

Create a web-based Gothic (1/2) NPC Creator application that allows users to:
1. Visually compose NPCs by selecting body types, armor, head/face types
2. Preview the NPC in 3D with applied textures
3. Generate valid Gothic Daedalus script code for the NPC
4. Export the complete NPC definition

## Technical Requirements

### Core Technologies
- **Frontend**: React + TypeScript + Three.js for 3D rendering
- **Build System**: Vite
- **3D Engine**: Three.js with custom loaders for Gothic formats
- **UI Framework**: Tailwind CSS + shadcn/ui components

### File Format Support

#### 1. ASC Files (Gothic 3D Models)
The ASC format is an ASCII-based 3D model format exported from 3DS Max using the ZenGin ASC Exporter. Key characteristics:

```
// ASC file structure (simplified)
*GEOMOBJECT {
    *NODE_NAME "mesh_name"
    *NODE_PARENT "parent_bone"
    *NODE_TM {
        *TM_ROW0 x y z
        *TM_ROW1 x y z
        *TM_ROW2 x y z
        *TM_ROW3 x y z  // position
    }
    *MESH {
        *TIMEVALUE 0
        *MESH_NUMVERTEX n
        *MESH_NUMFACES n
        *MESH_VERTEX_LIST {
            *MESH_VERTEX index x y z
            ...
        }
        *MESH_FACE_LIST {
            *MESH_FACE index: A: v1 B: v2 C: v3 ...
            ...
        }
        *MESH_TVERTLIST {
            *MESH_TVERT index u v w
            ...
        }
        *MESH_TFACELIST {
            *MESH_TFACE index uv1 uv2 uv3
            ...
        }
        *MESH_NORMALS {
            *MESH_FACENORMAL index x y z
            *MESH_VERTEXNORMAL index x y z
            ...
        }
    }
    *MATERIAL_REF material_index
}

// For skinned meshes (armors, bodies)
*BONE_LIST {
    *BONE index "bone_name"
    ...
}
*SOFT_SKIN {
    // vertex weights
}
```

The parser should:
- Parse mesh geometry (vertices, faces, UVs, normals)
- Handle bone hierarchy for skeletal meshes
- Support soft skin vertex weights
- Convert coordinate system (Gothic uses centimeters, Z-up)

#### 2. TEX Files (Gothic Textures)
TEX files are DXTC/S3TC compressed textures with mipmaps. Structure:

```
Header:
- Format signature
- Width, Height
- Mipmap count
- Compression type (DXT1, DXT3, DXT5)
- Pixel data (compressed blocks)
```

For this project, support both:
- **TEX files**: Parse header, decompress DXT data, convert to usable format
- **PNG fallback**: Allow users to provide PNG versions of textures

Consider using a library like `dxt-js` or implementing DXT decompression.

### Gothic NPC Script Structure

Reference the Daedalus script format:

```daedalus
instance NPC_NAME (Npc_Default)
{
    // Primary data
    name        = "Display Name";
    npctype     = npctype_main;      // or npctype_ambient, npctype_friend
    guild       = GIL_NONE;          // GIL_GRD, GIL_SLD, GIL_KDF, etc.
    level       = 1;
    voice       = 0;                 // Voice set (0-17 typically)
    id          = 0;                 // Unique NPC ID
    
    // Attributes
    attribute[ATR_STRENGTH]      = 10;
    attribute[ATR_DEXTERITY]     = 10;
    attribute[ATR_MANA_MAX]      = 0;
    attribute[ATR_MANA]          = 0;
    attribute[ATR_HITPOINTS_MAX] = 40;
    attribute[ATR_HITPOINTS]     = 40;
    
    // Visuals - THIS IS WHAT WE'RE CONFIGURING
    Mdl_SetVisual(self, "HUMANS.MDS");
    Mdl_ApplyOverlayMds(self, "Humans_Militia.mds");
    
    // Body configuration:
    // Mdl_SetVisualBody(self, body_mesh, body_tex, skin_color, head_mesh, head_tex, teeth_tex, armor_instance);
    Mdl_SetVisualBody(self, "hum_body_Naked0", 0, 1, "Hum_Head_Psionic", 14, 1, -1);
    
    B_Scale(self);
    Mdl_SetModelFatness(self, 0);
    
    // Fight settings
    fight_tactic = FAI_HUMAN_NORMAL;
    
    // Talents
    Npc_SetTalentSkill(self, NPC_TALENT_1H, 0);
    
    // Inventory
    CreateInvItems(self, ItFo_Apple, 1);
    
    // Daily routine
    daily_routine = Rtn_Start_NPC_NAME;
};

FUNC VOID Rtn_Start_NPC_NAME()
{
    TA_Stand_Guarding(08,00, 20,00, "WAYPOINT");
    TA_Stand_Guarding(20,00, 08,00, "WAYPOINT");
};
```

## Application Architecture

### Directory Structure
```
gothic-npc-creator/
├── src/
│   ├── components/
│   │   ├── NPCPreview3D.tsx        # Three.js 3D preview component
│   │   ├── BodySelector.tsx         # Body mesh selection
│   │   ├── ArmorSelector.tsx        # Armor selection
│   │   ├── HeadSelector.tsx         # Head/face selection
│   │   ├── TextureSelector.tsx      # Texture variant picker
│   │   ├── AttributeEditor.tsx      # Stats configuration
│   │   ├── ScriptPreview.tsx        # Generated script display
│   │   └── ExportPanel.tsx          # Export options
│   ├── loaders/
│   │   ├── ASCLoader.ts             # Gothic ASC file parser
│   │   ├── TEXLoader.ts             # Gothic TEX texture parser
│   │   └── types.ts                 # Type definitions
│   ├── utils/
│   │   ├── daedalusGenerator.ts     # Script code generator
│   │   ├── coordinateTransform.ts   # Gothic → Three.js coords
│   │   └── textureUtils.ts          # Texture processing
│   ├── data/
│   │   ├── bodies.ts                # Available body meshes
│   │   ├── heads.ts                 # Available head meshes
│   │   ├── armors.ts                # Available armor options
│   │   ├── guilds.ts                # Guild definitions
│   │   └── voiceSets.ts             # Voice options
│   ├── hooks/
│   │   ├── useASCModel.ts           # Hook for loading ASC models
│   │   └── useGothicTexture.ts      # Hook for loading textures
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── assets/
│       ├── models/                  # ASC files or converted GLTF
│       │   ├── bodies/
│       │   ├── heads/
│       │   └── armors/
│       └── textures/                # TEX or PNG textures
│           ├── bodies/
│           ├── heads/
│           └── armors/
├── package.json
└── vite.config.ts
```

### Core Components

#### 1. ASC Loader (`src/loaders/ASCLoader.ts`)

```typescript
interface ASCMesh {
  name: string;
  vertices: Float32Array;
  indices: Uint32Array;
  uvs: Float32Array;
  normals: Float32Array;
  materialRef: number;
}

interface ASCModel {
  meshes: ASCMesh[];
  materials: ASCMaterial[];
  bones?: ASCBone[];
  skinWeights?: SkinWeight[];
}

class ASCLoader extends THREE.Loader {
  load(url: string, onLoad: (model: ASCModel) => void): void;
  parse(text: string): ASCModel;
}
```

Key parsing considerations:
- Gothic uses centimeters, Three.js uses meters (scale by 0.01)
- Gothic is Z-up, Three.js is Y-up (rotate -90° on X)
- Face winding may need to be reversed
- UV coordinates might need V-flip (1 - v)

#### 2. TEX Loader (`src/loaders/TEXLoader.ts`)

```typescript
interface TEXHeader {
  format: number;
  width: number;
  height: number;
  mipmapCount: number;
  compressionType: 'DXT1' | 'DXT3' | 'DXT5';
}

class TEXLoader extends THREE.Loader {
  load(url: string, onLoad: (texture: THREE.Texture) => void): void;
  parseHeader(buffer: ArrayBuffer): TEXHeader;
  decompressDXT(buffer: ArrayBuffer, header: TEXHeader): Uint8Array;
}
```

For simplicity, you may want to:
1. Pre-convert TEX files to PNG and load those
2. Or implement a simple DXT1/DXT5 decompressor in JavaScript

#### 3. 3D Preview Component (`src/components/NPCPreview3D.tsx`)

```typescript
interface NPCPreviewProps {
  bodyMesh: string;
  bodyTexture: number;
  skinColor: number;
  headMesh: string;
  headTexture: number;
  armorInstance?: string;
  fatness: number;
}

const NPCPreview3D: React.FC<NPCPreviewProps> = (props) => {
  // Three.js scene setup
  // Load and composite body + head + armor meshes
  // Apply textures based on selections
  // Orbit controls for user interaction
  // Lighting setup (ambient + directional)
};
```

Features needed:
- Orbit controls (zoom, rotate, pan)
- Composite multiple meshes (body + head attached to head bone + optional armor overlay)
- Real-time texture swapping
- Optional T-pose or idle animation

#### 4. Script Generator (`src/utils/daedalusGenerator.ts`)

```typescript
interface NPCConfig {
  // Identity
  instanceName: string;
  displayName: string;
  npcType: 'main' | 'ambient' | 'friend';
  guild: string;
  level: number;
  voice: number;
  id: number;
  
  // Attributes
  strength: number;
  dexterity: number;
  manaMax: number;
  hitpointsMax: number;
  
  // Visuals
  visualMds: string;
  overlayMds?: string;
  bodyMesh: string;
  bodyTexture: number;
  skinColor: number;
  headMesh: string;
  headTexture: number;
  teethTexture: number;
  armorInstance?: string;
  fatness: number;
  
  // Combat
  fightTactic: string;
  talents: TalentConfig[];
  
  // Inventory
  equipment: EquipmentItem[];
  
  // Routine
  waypoint: string;
}

function generateDaedalusScript(config: NPCConfig): string;
```

### Data Configuration

#### Body Meshes (Gothic 2)
```typescript
const BODY_MESHES = [
  { id: 'hum_body_Naked0', name: 'Male Standard', gender: 'male' },
  { id: 'hum_body_Naked1', name: 'Male Muscular', gender: 'male' },
  { id: 'hum_body_Naked2', name: 'Male Slim', gender: 'male' },
  { id: 'hum_body_Babe0', name: 'Female Standard', gender: 'female' },
  // ... more body types
];
```

#### Head Meshes
```typescript
const HEAD_MESHES = [
  { id: 'Hum_Head_Bald', name: 'Bald', textureVariants: 20 },
  { id: 'Hum_Head_Fighter', name: 'Fighter', textureVariants: 15 },
  { id: 'Hum_Head_Psionic', name: 'Psionic', textureVariants: 18 },
  { id: 'Hum_Head_Pony', name: 'Ponytail', textureVariants: 12 },
  { id: 'Hum_Head_Thief', name: 'Thief', textureVariants: 10 },
  // ... more head types
];
```

#### Armor Instances
```typescript
const ARMOR_INSTANCES = [
  { id: -1, name: 'No Armor', mesh: null },
  { id: 'GRD_ARMOR_L', name: 'Guard Light Armor', mesh: 'Armor_GRD_L' },
  { id: 'GRD_ARMOR_M', name: 'Guard Medium Armor', mesh: 'Armor_GRD_M' },
  { id: 'GRD_ARMOR_H', name: 'Guard Heavy Armor', mesh: 'Armor_GRD_H' },
  { id: 'SLD_ARMOR', name: 'Mercenary Armor', mesh: 'Armor_SLD' },
  { id: 'KDF_ARMOR', name: 'Fire Mage Robe', mesh: 'Armor_KDF' },
  // ... more armors
];
```

#### Guilds
```typescript
const GUILDS = [
  { id: 'GIL_NONE', name: 'None' },
  { id: 'GIL_GRD', name: 'Guard' },
  { id: 'GIL_SLD', name: 'Mercenary' },
  { id: 'GIL_KDF', name: 'Fire Mage' },
  { id: 'GIL_KDW', name: 'Water Mage' },
  { id: 'GIL_VLK', name: 'Citizen' },
  { id: 'GIL_MIL', name: 'Militia' },
  { id: 'GIL_SFB', name: 'Pirate' },
  { id: 'GIL_BAU', name: 'Farmer' },
  { id: 'GIL_NOV', name: 'Novice' },
  // ... all guilds
];
```

## UI Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  Gothic NPC Creator                                    [Export ▼]  │
├─────────────────────┬──────────────────────────────────────────────┤
│                     │                                              │
│  VISUAL OPTIONS     │                                              │
│  ───────────────    │                                              │
│                     │                                              │
│  Body Type:         │          ┌─────────────────────┐             │
│  [▼ Select Body]    │          │                     │             │
│                     │          │                     │             │
│  Body Texture: 0    │          │    3D PREVIEW       │             │
│  [────●────────]    │          │                     │             │
│                     │          │   (Orbit Controls)  │             │
│  Skin Color: 1      │          │                     │             │
│  [──●──────────]    │          │                     │             │
│                     │          │                     │             │
│  Head Type:         │          │                     │             │
│  [▼ Select Head]    │          └─────────────────────┘             │
│                     │                                              │
│  Head Texture: 14   │                                              │
│  [────────●────]    │                                              │
│                     │                                              │
│  Armor:             │                                              │
│  [▼ Select Armor]   │                                              │
│                     │                                              │
│  Fatness: 0         │                                              │
│  [────●────────]    │                                              │
│                     │                                              │
├─────────────────────┴──────────────────────────────────────────────┤
│  IDENTITY           │  ATTRIBUTES        │  SCRIPT PREVIEW         │
│  ─────────────      │  ──────────        │  ──────────────         │
│  Instance: GRD_001  │  STR: [35]         │  instance GRD_001...    │
│  Name: Guard        │  DEX: [35]         │    name = "Guard";      │
│  Guild: [▼ Guard]   │  MANA: [0]         │    guild = GIL_GRD;     │
│  Level: [10]        │  HP: [160]         │    ...                  │
│  Voice: [▼ 40]      │                    │                         │
│  ID: [254]          │  Fight: [▼ Strong] │  [Copy to Clipboard]    │
└─────────────────────┴────────────────────┴─────────────────────────┘
```

## Implementation Notes

### 1. Mesh Compositing
Gothic NPCs are composed of:
- Base body mesh (skeletal mesh with skin weights)
- Head mesh (attached to `Bip01 Head` bone)
- Optional armor mesh (replaces or overlays body)

The head needs to be positioned at the head bone's location in the skeleton.

### 2. Texture Mapping
- Body textures: `HUM_BODY_NAKED0_V{n}.TGA` where n is the variant
- Head textures: `HUM_HEAD_{type}_V{n}.TGA`
- Armor textures: Named per armor

### 3. Coordinate System Conversion
```typescript
function gothicToThreeJS(vertex: {x: number, y: number, z: number}) {
  return {
    x: vertex.x * 0.01,      // cm to meters
    y: vertex.z * 0.01,      // Z-up to Y-up
    z: -vertex.y * 0.01      // Flip Y
  };
}
```

### 4. Fallback for Complex Formats
If parsing TEX/ASC proves too complex, consider:
- Pre-converting models to GLTF/GLB using a tool like KrxImpExp + Blender export
- Pre-converting textures to PNG
- Including a simple set of pre-converted assets for demo

## Asset Preparation (Alternative Approach)

If native ASC/TEX parsing is too complex, prepare assets beforehand:

1. **Extract ASC files** using Gothic Sourcer
2. **Import to Blender** using KrxImpExp or Shoun's ASCII Model Importer
3. **Export to GLTF** from Blender
4. **Convert TEX to PNG** using Gothic ZTEX tool or GoMan

This gives you standard Three.js-loadable assets while maintaining the Gothic modding workflow.

## Testing

Include sample Gothic assets:
- At least 2-3 body meshes
- At least 3-4 head meshes  
- At least 2-3 armors
- Corresponding textures

## Stretch Goals

1. **Animation Preview**: Load and play idle animation from ASC
2. **Weapon Preview**: Show equipped weapon in hand slot
3. **Bulk Generation**: Generate multiple NPCs from CSV/JSON config
4. **Mod Export**: Package generated NPCs as a ready-to-use Gothic mod folder
5. **Voice Preview**: Play sample voice lines for selected voice set

## Reference Projects

- OpenGothic (C++ Gothic reimplementation): https://github.com/Try/OpenGothic
- ZenLib (C++ Gothic format library): used by OpenGothic for asset loading
- KrxImpExp (3DS Max plugins): https://krximpexp.sourceforge.net/
- Gothic Modding Community docs: https://gothic-modding-community.github.io/gmc/

## Getting Started

1. Set up a new Vite + React + TypeScript project
2. Install Three.js and @react-three/fiber, @react-three/drei
3. Implement the ASC parser (start with static meshes, add skeletal later)
4. Create the basic UI layout
5. Add texture loading (start with PNG fallback)
6. Implement the script generator
7. Add export functionality

---

Please implement this Gothic NPC Creator application step by step. Start with the project setup and basic UI, then add the 3D preview functionality, and finally implement the script generation and export features.
