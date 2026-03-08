import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block">
        <Image src={product.image} alt={product.name} width={700} height={500} className="h-56 w-full object-cover" loading="lazy" />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm text-black/70">${product.price}</p>
        <Link href={`/checkout?product=${product.slug}`} className="btn-primary mt-4 w-full">Add to Cart</Link>
      </div>
    </article>
  );
}
