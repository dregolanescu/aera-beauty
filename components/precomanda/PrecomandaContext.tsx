'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { useSearchParams } from 'next/navigation'
import { PrecomandaModal } from './PrecomandaModal'

type Prefill = {
  brand?: 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha'
  product?: string
}

type PrecomandaContextValue = {
  open: (prefill?: Prefill) => void
  close: () => void
}

const Ctx = createContext<PrecomandaContextValue | null>(null)

export function usePrecomanda() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('usePrecomanda must be inside PrecomandaProvider')
  return ctx
}

export function PrecomandaProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [prefill, setPrefill] = useState<Prefill | undefined>()
  const searchParams = useSearchParams()

  const open = useCallback((pf?: Prefill) => {
    setPrefill(pf)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setPrefill(undefined)
  }, [])

  // Auto-open from URL query: ?precomanda=true or ?precomanda=aqua
  useEffect(() => {
    const param = searchParams.get('precomanda')
    if (!param) return

    const brandMap: Record<string, Prefill['brand']> = {
      aqua: 'aqua-mineral',
      oliere: 'oliere-paris',
      redefine: 'redefine-matcha',
    }

    if (param === 'true') {
      open()
    } else if (brandMap[param]) {
      open({ brand: brandMap[param] })
    }
  }, [searchParams, open])

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <PrecomandaModal isOpen={isOpen} onClose={close} prefill={prefill} />
    </Ctx.Provider>
  )
}
