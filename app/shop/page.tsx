import { products } from '@/data/products';
import ShopClient from '@/components/ShopClient';

export default function ShopPage() {
  return (
    <main>
      <section className="bg-brandBlack py-14 text-white">
        <div className="container-shell">
          <p className="text-xs uppercase tracking-[0.22em] text-white/60">STEPZONE</p>
          <h1 className="mt-2 text-5xl font-extrabold tracking-tight">Shop Sneakers</h1>
        </div>
      </section>
      <section className="container-shell py-12">
        <ShopClient items={products} />
      </section>
    </main>
  );
}
