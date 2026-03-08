import { products } from '@/data/products';
import ShopClient from '@/components/ShopClient';

export default function ShopPage() {
  return (
    <main className="container-shell py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Shop</h1>
      <ShopClient items={products} />
    </main>
  );
}
