/**
 * Scene lighting setup
 * Bluish ambient light only
 */
export function Lighting() {
  return (
    <>
      {/* Ambient light with bluish sky tint */}
      <ambientLight intensity={1} color="#b3d9ff" />
    </>
  )
}
