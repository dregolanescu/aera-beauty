'use client'

import { usePrecomanda } from './PrecomandaContext'
import { Button } from '@/components/ui/Button'

type Props = {
  size?: 'default' | 'sm'
  className?: string
  brand?: 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha'
  product?: string
  /** Called after opening modal (e.g. to close mobile menu) */
  onAfterOpen?: () => void
}

export function PrecomandaCTA({
  size = 'default',
  className,
  brand,
  product,
  onAfterOpen,
}: Props) {
  const { open } = usePrecomanda()

  return (
    <Button
      variant="primary"
      size={size}
      className={className}
      onClick={() => {
        const prefill = brand || product ? { brand, product } : undefined
        open(prefill)
        onAfterOpen?.()
      }}
    >
      Precomandă
    </Button>
  )
}
