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
}

/**
 * Primary button with "travelling light" border effect on hover.
 * Inspired by Aceternity UI Moving Border, tuned for quiet luxury:
 * slow (6s), ivory glow at 35% opacity, blur 10px.
 * Looks like reflected light on a perfume bottle's lacquer, not neon.
 * Completely disabled under prefers-reduced-motion.
 */
export function MovingBorderButton({
  href,
  children,
  className,
  onClick,
  type = 'button',
}: MovingBorderButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduce = useReducedMotion()

  const btnStyle = {
    fontSize: '0.78rem',
    letterSpacing: '0.08em',
    padding: '0.85rem 1.4rem',
  }

  const innerClasses = cn(
    'relative z-10 inline-flex w-full items-center justify-center',
    'font-medium uppercase',
    'bg-cocoa-700 text-ivory-50 rounded-[13px]',
    'border-[0.5px] border-cocoa-700/80',
    'transition-colors duration-[280ms] ease-out',
    'hover:bg-cocoa-900',
  )

  const inner = href ? (
    <Link href={href} className={innerClasses} style={btnStyle}>
      {children}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={innerClasses} style={btnStyle}>
      {children}
    </button>
  )

  return (
    <div
      className={cn('relative inline-flex rounded-[14px]', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Travelling light — conic gradient glow rotating behind the button border */}
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
