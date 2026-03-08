'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/data/products';
import { useI18n } from './i18n';

export default function ShopClient({ items }: { items: Product[] }) {
  const { t } = useI18n();
  const [maxPrice, setMaxPrice] = useState(120);
  const [size, setSize] = useState('all');
  const [onlyNew, setOnlyNew] = useState(false);

  const filtered = useMemo(() => items.filter((p) => {
    if (p.price > maxPrice) return false;
    if (onlyNew && !p.isNew) return false;
    if (size !== 'all' && !(p.sizes || []).includes(Number(size))) return false;
    return true;
  }), [items, maxPrice, onlyNew, size]);

  return (
    <>
      <div className="card mb-8 p-5">
        <div className="mb-4 text-sm font-bold uppercase tracking-wide">{t('filter')}</div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm">{t('maxPrice')}: ${maxPrice}<input type="range" min={40} max={140} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-2 w-full" /></label>
          <label className="text-sm">{t('size')}<select value={size} onChange={(e) => setSize(e.target.value)} className="mt-2 w-full rounded-lg border border-black/20 p-2"><option value="all">All</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option></select></label>
          <label className="mt-7 inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} /> {t('onlyNew')}</label>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </>
  );
}
