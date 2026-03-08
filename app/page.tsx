import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function HomePage() {
  return (
    <main>
      <section className="bg-brandBlack py-24 text-white">
        <div className="container-shell text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">STEPZONE</h1>
          <p className="mt-4 text-lg text-white/80">Premium Sneakers</p>
          <a href="/shop" className="btn-primary mt-8">Shop Now</a>
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured Sneakers</h2>
          <a href="/new-collection" className="text-sm font-semibold text-brandGold">View New Collection</a>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 8).map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </main>
  );
}
