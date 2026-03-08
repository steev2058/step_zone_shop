import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function ShopPage() {
  return (
    <main className="container-shell py-10">
      <h1 className="mb-6 text-3xl font-bold">Shop</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </main>
  );
}
