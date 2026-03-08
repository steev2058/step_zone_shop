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
  const [color, setColor] = useState(product?.colors?.[0] || '#111827');
  if (!product) return notFound();

  return (
    <main className="container-shell py-10">
      <div className="grid gap-8 md:grid-cols-[1.05fr_1fr]">
        <ProductGallery images={product.images?.length ? product.images : [product.image]} alt={product.name} />
        <div>
          <div className="mb-2 flex items-center gap-3 text-sm text-black/60">
            <span>{product.category}</span><span>⭐ {product.rating} (189 reviews)</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-3xl font-bold">${product.price}</p>
          <p className="mt-4 text-sm text-black/65">High-performance sneaker with lightweight comfort for daily movement and street style.</p>

          <div className="mt-6">
            <div className="text-sm font-semibold">Color</div>
            <div className="mt-2 flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setColor(c)}
                  className={`h-8 w-8 rounded-full ring-2 ${color===c?'ring-brandGold':'ring-black/10'}`}
                  style={{ background: c }}
                  aria-label={`Color ${i+1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 text-sm font-semibold">Select {t('size')}</div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-lg border p-2 text-sm ${size===s?'border-brandGold bg-amber-50 font-semibold':'border-black/15'}`}
                >{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <div className="flex-1"><AddToCartButton slug={product.slug} name={product.name} price={product.price} image={product.image} size={String(size)} /></div>
            <button className="mt-4 h-[46px] w-[46px] rounded-full border border-black/15 text-xl">♡</button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 text-xs"><div className="font-semibold">Free Shipping</div><div className="text-black/60">On orders over $75</div></div>
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 text-xs"><div className="font-semibold">60-Day Returns</div><div className="text-black/60">Try it, love it</div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
