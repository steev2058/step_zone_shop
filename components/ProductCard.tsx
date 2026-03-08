import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl fade-up">
      <Link href={`/product/${product.slug}`} className="block overflow-hidden bg-[#efefef]">
        <Image
          src={product.image}
          alt={product.name}
          width={900}
          height={700}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </Link>
      <div className="p-5">
        <h3 className="text-base font-semibold tracking-tight">{product.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-black/45">{product.brand}</p>
        <p className="mt-1 text-sm text-black/70">${product.price}</p>
        <AddToCartButton slug={product.slug} name={product.name} price={product.price} image={product.image} />
      </div>
    </article>
  );
}
