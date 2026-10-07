'use client'

import { useEffect, useRef } from 'react'
import { startGlint } from './advanguard-glint'

/**
 * Stratul de lumină de peste logo-ul Advanguard din footer. Logo-ul de bază rămâne neatins
 * (.adv-credit-fill). Aici e doar un canvas gol, mascat cu silueta logo-ului: cometa de lumină
 * o desenează startGlint() în browser și apare numai pe muchia reală a literelor.
 */
export function AdvanguardGlint() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => (ref.current ? startGlint(ref.current) : undefined), [])
  return (
    <span ref={ref} className="adv-glint" aria-hidden="true">
      <canvas />
    </span>
  )
}
