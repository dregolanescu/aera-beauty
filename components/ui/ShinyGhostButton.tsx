'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type ShinyGhostButtonProps = {
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  size?: 'default' | 'sm'
}

const sizeStyles = {
  default: {
    fontSize: '0.78rem',
    letterSpacing: '0.08em',
    padding: '12px 22px',
    minHeight: '42px',
  },
  sm: {
    fontSize: '0.72rem',
    letterSpacing: '0.08em',
    padding: '10px 18px',
    minHeight: '36px',
  },
} as const

/**
 * Ghost button with diagonal light sweep on hover.
 * Adapted from Magic UI ShinyButton — tuned for AERA:
 *   - warm ivory flash across cocoa text
 *   - matching border shine via mask-composite
 *   - spring physics, slow & premium
 *   - hover-only, reduced-motion safe
 */
export function ShinyGhostButton({
  href,
  children,
  className,
  onClick,
  type = 'button',
  size = 'default',
}: ShinyGhostButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduce = useReducedMotion()

  const showEffect = isHovered && !shouldReduce

  const baseClasses = cn(
    'relative inline-flex items-center justify-center w-full',
    'font-medium uppercase',
    'bg-transparent text-cocoa-700 rounded-[14px]',
    'border-[0.5px] border-cocoa-700',
    'transition-all duration-[280ms] ease-out',
    'hover:bg-cream-100 hover:text-cocoa-900',
  )

  // Text mask: diagonal band of transparency sweeps across the letters
  const textMask = showEffect
    ? {
        maskImage:
          'linear-gradient(-75deg, rgb(91,70,56) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), rgb(91,70,56) calc(var(--x) + 100%))',
      }
    : undefined

  // Border shine: warm ivory flash on the border via mask-composite exclude
  const borderShine = showEffect ? (
    <span
      className="pointer-events-none absolute inset-0 z-10 block rounded-[inherit] p-px"
      style={{
        background:
          'linear-gradient(-75deg, rgba(232,223,211,0.05) calc(var(--x) + 20%), rgba(251,247,240,0.6) calc(var(--x) + 25%), rgba(232,223,211,0.05) calc(var(--x) + 100%))',
        mask: 'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
        maskComposite: 'exclude',
        WebkitMaskComposite: 'xor',
      }}
      aria-hidden="true"
    />
  ) : null

  const content = (
    <>
      <span className="relative block" style={textMask}>
        {children}
      </span>
      {borderShine}
    </>
  )

  return (
    <motion.div
      className={cn('inline-flex', className)}
      style={{ '--x': '100%' } as React.CSSProperties}
      animate={
        showEffect
          ? ({ '--x': '-100%' } as Record<string, string>)
          : ({ '--x': '100%' } as Record<string, string>)
      }
      transition={
        showEffect
          ? {
              repeat: Infinity,
              repeatType: 'loop' as const,
              repeatDelay: 1,
              type: 'spring' as const,
              stiffness: 20,
              damping: 15,
              mass: 2,
            }
          : { duration: 0.3 }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {href ? (
        <Link href={href} className={baseClasses} style={sizeStyles[size]}>
          {content}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={baseClasses}
          style={sizeStyles[size]}
        >
          {content}
        </button>
      )}
    </motion.div>
  )
}
