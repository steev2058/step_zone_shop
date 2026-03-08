'use client';
import { notFound, useParams } from 'next/navigation';
import { products } from '@/data/products';
import AddToCartButton from '@/components/AddToCartButton';
import { useI18n } from '@/components/i18n';
import { useState } from 'react';
import ProductGallery from '@/components/ProductGallery';

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === params.slug);
  const { t } = useI18n();
  const [size, setSize] = useState(product?.sizes?.[0] || 42);
  if (!product) return notFound();

  return (
    <main className="container-shell py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery images={product.images?.length ? product.images : [product.image]} alt={product.name} />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-xl text-black/80">${product.price}</p>
          <label className="mt-6 block text-sm font-semibold">{t('size')}</label>
          <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-black/20 bg-white p-3">
            {product.sizes.map((s) => <option key={s}>{s}</option>)}
          </select>
          <AddToCartButton slug={product.slug} name={product.name} price={product.price} image={product.image} size={String(size)} />
        </div>
      </div>
    </main>
  );
}
