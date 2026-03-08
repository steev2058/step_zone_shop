import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl fade-up">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden bg-[#efefef]">
        {product.tag && <span className={`absolute left-3 top-3 z-10 rounded-full px-2 py-1 text-[10px] font-bold text-white ${product.tag==='NEW'?'bg-green-500':'bg-amber-500'}`}>{product.tag}</span>}
        <Image src={product.image} alt={product.name} width={900} height={700} className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
      </Link>
      <div className="p-3">
        <div className="mb-1 flex items-center justify-between text-xs text-black/60"><span>{product.category}</span><span>⭐ {product.rating}</span></div>
        <h3 className="text-base font-semibold tracking-tight">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm"><span className="font-semibold">${product.price}</span>{product.oldPrice ? <span className="text-black/40 line-through">${product.oldPrice}</span> : null}</div>
        <div className="mt-2 flex gap-1.5">{product.colors.slice(0,4).map((c,i)=><span key={i} className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{background:c}} />)}</div>
        <p className="mt-2 text-[11px] text-black/50">{product.sizes.length} sizes available</p>
        <AddToCartButton slug={product.slug} name={product.name} price={product.price} image={product.image} />
      </div>
    </article>
  );
}
