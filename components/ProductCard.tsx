import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block">
        <Image src={product.image} alt={product.name} width={700} height={500} className="h-56 w-full object-cover" loading="lazy" />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm text-black/70">${product.price}</p>
        <AddToCartButton slug={product.slug} name={product.name} price={product.price} image={product.image} />
      </div>
    </article>
  );
}
