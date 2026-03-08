import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
export default function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;

  return (
    <article className="group overflow-hidden rounded-3xl bg-white fade-up">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden rounded-3xl bg-[#f2f2f2]">
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {discount ? <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white">-{discount}%</span> : null}
          {product.tag ? (
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold text-white ${product.tag === 'NEW' ? 'bg-green-500' : 'bg-amber-500'}`}>
              {product.tag}
            </span>
          ) : null}
        </div>
        <Image src={product.image} alt={product.name} width={900} height={900} className="h-[180px] w-full rounded-3xl object-cover transition duration-500 group-hover:scale-[1.02] sm:h-[220px]" loading="lazy" />
      </Link>

      <div className="p-2.5 rhythm-8">
        <div className="flex items-center justify-between text-[10px] font-medium text-black/60">
          <span>{product.category}</span>
          <span className="text-[12px]">⭐ {product.rating}</span>
        </div>

        <h3 className="line-clamp-1 text-[36px] leading-[1.05] font-semibold tracking-tight">{product.name}</h3>

        <div className="flex items-center gap-2 text-[18px] leading-none">
          <span className="font-bold">${product.price}</span>
          {product.oldPrice ? <span className="text-[14px] text-black/35 line-through">${product.oldPrice}</span> : null}
        </div>

        <div className="flex gap-1.5">
          {product.colors.slice(0, 4).map((c, i) => (
            <span key={i} className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: c }} />
          ))}
        </div>

        <p className="text-[11px] text-black/45">{product.sizes.length} sizes available</p>
      </div>
    </article>
  );
}
