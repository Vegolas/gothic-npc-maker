/**
 * Scene lighting setup
 * Uses only ambient light for flat, unlit rendering
 */
export function Lighting() {
  return (
    <>
      {/* Full ambient light for flat rendering */}
      <ambientLight intensity={1} color="#ffffff" />
    </>
  )
}
