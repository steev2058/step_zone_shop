import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function NewCollectionPage() {
  const newItems = products.filter((p) => p.isNew);
  return (
    <main className="container-shell py-10">
      <h1 className="mb-6 text-3xl font-bold">New Collection</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {newItems.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </main>
  );
}
