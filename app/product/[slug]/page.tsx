import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <main className="container-shell py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card overflow-hidden">
          <Image src={product.image} alt={product.name} width={1000} height={800} className="h-full w-full object-cover" priority />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-xl text-black/80">${product.price}</p>
          <label className="mt-6 block text-sm font-semibold">Size</label>
          <select className="mt-2 w-full rounded-xl border border-black/20 bg-white p-3">
            <option>40</option><option>41</option><option>42</option><option>43</option><option>44</option>
          </select>
          <a href={`/checkout?product=${product.slug}`} className="btn-primary mt-6 w-full">Add to Cart</a>
        </div>
      </div>
    </main>
  );
}
