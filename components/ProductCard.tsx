import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg fade-up">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden bg-[#f2f2f2]">
        {product.tag && (
          <span className={`absolute left-2 top-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${product.tag === 'NEW' ? 'bg-green-500' : 'bg-amber-500'}`}>
            {product.tag}
          </span>
        )}
        <Image src={product.image} alt={product.name} width={900} height={900} className="h-[176px] w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-[208px]" loading="lazy" />
      </Link>

      <div className="p-3 rhythm-8">
        <div className="flex items-center justify-between text-[12px] font-medium text-black/55">
          <span>{product.category}</span>
          <span>⭐ {product.rating}</span>
        </div>

        <h3 className="line-clamp-1 text-[30px] leading-[1.05] font-bold tracking-tight">{product.name}</h3>

        <div className="flex items-center gap-2 text-[14px]">
          <span className="font-bold">${product.price}</span>
          {product.oldPrice ? <span className="text-black/35 line-through">${product.oldPrice}</span> : null}
        </div>

        <div className="flex gap-1.5">
          {product.colors.slice(0, 4).map((c, i) => (
            <span key={i} className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: c }} />
          ))}
        </div>

        <p className="text-[11px] text-black/45">{product.sizes.length} sizes available</p>

        <AddToCartButton slug={product.slug} name={product.name} price={product.price} image={product.image} />
      </div>
    </article>
  );
}
