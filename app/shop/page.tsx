import { products } from '@/data/products';
import ShopClient from '@/components/ShopClient';

export default function ShopPage() {
  return (
    <main className="container-shell py-10">
      <h1 className="mb-6 text-3xl font-bold">Shop</h1>
      <ShopClient items={products} />
    </main>
  );
}
