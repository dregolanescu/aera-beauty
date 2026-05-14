'use client'

import {
  useMotionValue,
  motion,
  useMotionTemplate,
  useReducedMotion,
} from 'motion/react'

/**
 * Hero background with dot grid + mouse-follow reveal.
 * Wrapper component — content passed as children sits above dots (z-20).
 * onMouseMove is on the wrapper itself so it always captures events.
 *
 * AERA palette: cream-100 base, taupe-500 static dots, cocoa-700 reveal dots.
 * prefers-reduced-motion: only static dots, no reveal.
 */
export function ShaderBackground({
  children,
}: {
  children: React.ReactNode
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const shouldReduce = useReducedMotion()

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
      className="relative overflow-hidden group"
      onMouseMove={handleMouseMove}
      style={{ background: '#F5EFE7' }}
    >
      {/* Static dot grid — subliminal taupe on cream */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={dotPattern('rgb(140, 117, 103)')}
      />

      {/* Mouse-follow reveal — cocoa dots, 300px radius */}
      {!shouldReduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            ...dotPattern('rgb(91, 70, 56)'),
            WebkitMaskImage: useMotionTemplate`
              radial-gradient(
                300px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                transparent 100%
              )
            `,
            maskImage: useMotionTemplate`
              radial-gradient(
                300px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                transparent 100%
              )
            `,
          }}
        />
      )}

      {/* Content above dots */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}
