# TODO - Gothic NPC Creator

## High Priority Issues

### 1. COOKSMITH Body Type
- **Issue**: HUM_BODY_COOKSMITH appears to be a different body type for males with only 2 texture variants (V0_C1 and V1_C1)
- **Current State**: System expects all body types to have multiple variants and skin colors
- **Impact**: COOKSMITH textures don't appear in the texture selector
- **Location**: 
  - Files exist in `public/assets/g1/male/textures/body/`
  - `HUM_BODY_COOKSMITH_V0_C1.PNG`
  - `HUM_BODY_COOKSMITH_V1_C1.PNG`
- **Possible Solutions**:
  - Option A: Treat COOKSMITH as a separate skin color variant that maps to C1
  - Option B: Create a special body type category for profession-specific bodies
  - Option C: Add more COOKSMITH variants to match standard body texture grid

### 2. Head Mesh Prefix in Daedalus Scripts ✓ FIXED
- **Issue**: Head mesh names in Mdl_SetVisualBody need "HUM_HEAD_" prefix
- **Status**: Updated default head mesh in `src/types/npc.ts` from `'BALD'` to `'HUM_HEAD_BALD'`. Now need to update the script generation part after user changes head mesh.
- **Verification Needed**: Check that all head selectors populate with full prefix from asset discovery

### 3. Armor Mesh Naming Convention
- **Issue**: Armor mesh filenames don't match Daedalus script instance names
- **Current State**: Armor files use descriptive names, but scripts expect Gothic armor instance constants
- **Impact**: Generated scripts won't work without manual armor name conversion
- **Examples Needed**:
  - File: `ITAR_PAL_H.glb` → Script: `ITAR_PAL_H`
  - Need to verify actual Gothic armor instance naming conventions
- **Locations to Update**:
  - `src/utils/assetDiscovery.ts` - Armor discovery function
  - `src/components/selectors/ArmorSelector.tsx` - Display vs. script value mapping
  - `src/utils/daedalusGenerator.ts` - Armor instance formatting
- **Action Required**: 
  1. Document Gothic 1 and Gothic 2 armor instance names
  2. Create mapping between friendly names and script constants
  3. Rename armor GLB files OR create ID mapping layer

## Medium Priority

### 4. Asset Discovery Performance
- **Note**: `import.meta.glob` scans all assets at build time
- **Consider**: Lazy loading for large asset libraries

## Documentation Needed

- [ ] Document all Gothic armor instance constants (G1 and G2)
- [ ] Create guide for adding new body types with non-standard texture counts
- [ ] Document head mesh naming requirements
- [ ] Add examples of valid Daedalus script output for reference

## Future Enhancements

- [ ] Support for COOKSMITH and other profession-specific body types
- [ ] Armor preview thumbnails in selector
- [ ] Validation warnings for incomplete NPC configurations
- [ ] Export presets for common NPC archetypes (Guard, Mage, Farmer, etc.)

---

Last Updated: 2026-01-10
