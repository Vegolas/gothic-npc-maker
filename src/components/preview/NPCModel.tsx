import { useNPCVisuals, useNPCGender, useNPCGameVersion } from '../../hooks/useNPCConfig'
import { BodyMesh } from './BodyMesh'
import { HeadMesh } from './HeadMesh'
import { ArmorMesh } from './ArmorMesh'

/**
 * NPC model composite component
 * Combines body, head, and armor meshes based on current configuration
 */
export function NPCModel() {
  const gameVersion = useNPCGameVersion()
  const gender = useNPCGender()
  const visuals = useNPCVisuals()

  return (
    <group position={[0, 0, 0]}>
      {/* Body mesh - only when no armor (armor replaces entire body in Gothic) */}
      {!visuals.armorInstance && (
        <BodyMesh
          meshId={visuals.bodyMesh}
          textureVariant={visuals.bodyTexture}
          textureFile={visuals.bodyTextureFile}
          skinColor={visuals.skinColor}
          gender={gender}
          gameVersion={gameVersion}
          fatness={visuals.fatness}
        />
      )}

      {/* Head mesh - attached to body with offset */}
      <HeadMesh
        meshId={visuals.headMesh}
        textureVariant={visuals.headTexture}
        textureFile={visuals.headTextureFile}
        skinColor={visuals.skinColor}
        gender={gender}
        gameVersion={gameVersion}
        headOffsetX={visuals.headOffsetX}
        headOffsetY={visuals.headOffsetY}
        headOffsetZ={visuals.headOffsetZ}
        fatness={visuals.fatness}
      />

      {/* Armor mesh - only if armor is selected */}
      {visuals.armorInstance && (
        <ArmorMesh 
          armorId={visuals.armorInstance} 
          gameVersion={gameVersion}
          fatness={visuals.fatness}
          bodyMesh={visuals.bodyMesh}
          bodyTextureVariant={visuals.bodyTexture}
          bodyTextureFile={visuals.bodyTextureFile}
          skinColor={visuals.skinColor}
          gender={gender}
        />
      )}
    </group>
  )
}
