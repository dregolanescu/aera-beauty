'use client'

import { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type MovingBorderButtonProps = {
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

const shadowDefault =
  'inset 0 1px 0 rgba(251, 247, 240, 0.08), 0 2px 8px rgba(61, 47, 37, 0.12)'
const shadowHover =
  'inset 0 1px 0 rgba(251, 247, 240, 0.1), 0 4px 12px rgba(61, 47, 37, 0.18)'

/**
 * Primary button with tactile depth and "travelling light" border on hover.
 *
 * Visual language: refined beauty packaging detail.
 * - Inset top highlight = light catching the top edge of lacquer
 * - Outer shadow = physical depth, button sits above the surface
 * - Travelling light = soft pearlescent reflection on hover (6s, ivory glow)
 * - Hover lift = -1px, shadow deepens
 *
 * Completely safe under prefers-reduced-motion (light effect disabled).
 */
export function MovingBorderButton({
  href,
  children,
  className,
  onClick,
  type = 'button',
  size = 'default',
}: MovingBorderButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduce = useReducedMotion()

  const innerClasses = cn(
    'relative z-10 inline-flex w-full items-center justify-center',
    'font-medium uppercase',
    'bg-cocoa-700 text-ivory-50 rounded-[13px]',
    'border-[0.5px] border-cocoa-700/70',
    'transition-all duration-[280ms] ease-out',
    'hover:bg-cocoa-900 hover:-translate-y-px',
  )

  const innerStyle = {
    ...sizeStyles[size],
    boxShadow: isHovered ? shadowHover : shadowDefault,
    transition: 'all 280ms ease-out',
  }

  const inner = href ? (
    <Link href={href} className={innerClasses} style={innerStyle}>
      {children}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={innerClasses} style={innerStyle}>
      {children}
    </button>
  )

  return (
    <div
      className={cn('relative inline-flex rounded-[14px]', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Travelling light — pearlescent reflection on hover, not neon */}
      <AnimatePresence>
        {isHovered && !shouldReduce && (
          <motion.div
            className="pointer-events-none absolute inset-[-1px] rounded-[15px] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0%, transparent 55%, rgba(251, 247, 240, 0.35) 75%, transparent 100%)',
                filter: 'blur(10px)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {inner}
    </div>
  )
}
