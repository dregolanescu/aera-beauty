'use client'

import { useMotionValue, motion, useMotionTemplate } from 'motion/react'

/**
 * Dot pattern hero background with mouse-follow highlight.
 * Adapted from Aceternity HeroHighlight — tuned for AERA:
 *   - cream-100 base, taupe-500 dots, cocoa-700 highlight dots
 *   - no dark mode, no indigo/purple
 */
export function ShaderBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const dotPattern = (color: string) => ({
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: '16px 16px',
  })

  return (
    <div
      className="absolute inset-0 w-full h-full group"
      onMouseMove={handleMouseMove}
      style={{ background: '#F5EFE7' }}
    >
      {/* Static dot grid — taupe on cream */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={dotPattern('rgb(140, 117, 103)')}
      />

      {/* Mouse-follow highlight — cocoa dots revealed on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          ...dotPattern('rgb(91, 70, 56)'),
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
    </div>
  )
}
