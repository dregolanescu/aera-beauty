import Image from 'next/image'
import type { Product } from '@/content/products'

type Props = {
  product: Product
  brandName: string
  priority?: boolean
}

export function ProductCard({ product, brandName, priority = false }: Props) {
  return (
    <div
      className="flex flex-col h-full bg-ivory-50 border border-stone-200 rounded-md overflow-hidden"
      style={{ borderWidth: '0.5px' }}
    >
      <div className="relative h-56 md:h-64 bg-white">
        <Image
          src={product.image}
          alt={`${product.name} — ${brandName}`}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="card-title mb-1">{product.name}</h3>
        {product.volume && (
          <p className="text-sm text-taupe-500 mb-3">{product.volume}</p>
        )}
        <p className="body text-cocoa-700 flex-1">{product.description}</p>

        {product.activeIngredients && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <p
              className="eyebrow mb-1.5"
              style={{ color: 'var(--color-taupe-500)' }}
            >
              Ingrediente active
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-cocoa-700)' }}
            >
              {product.activeIngredients}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
