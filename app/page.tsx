'use client';
import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useI18n } from '@/components/i18n';


export default function HomePage() {
  const { t } = useI18n();

  const [maxPrice, setMaxPrice] = useState(220);
  const [size, setSize] = useState('all');
  const [onlyNew, setOnlyNew] = useState(false);
  const [category, setCategory] = useState('All Products');
  const [under100, setUnder100] = useState(false);
  const [r100_150, setR100_150] = useState(false);
  const [r150_200, setR150_200] = useState(false);
  const [over200, setOver200] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    let out = products.filter((p) => {
      if (p.price > maxPrice) return false;
      if (onlyNew && !p.isNew) return false;
      if (onSale && !p.oldPrice) return false;
      if (size !== 'all' && !(p.sizes || []).includes(Number(size))) return false;
      if (category !== 'All Products' && p.category !== category) return false;

      const ranges = [under100, r100_150, r150_200, over200];
      if (ranges.some(Boolean)) {
        const inRange =
          (under100 && p.price < 100) ||
          (r100_150 && p.price >= 100 && p.price <= 150) ||
          (r150_200 && p.price > 150 && p.price <= 200) ||
          (over200 && p.price > 200);
        if (!inRange) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') out = [...out].sort((a,b)=>a.price-b.price);
    if (sortBy === 'price-desc') out = [...out].sort((a,b)=>b.price-a.price);
    if (sortBy === 'rating') out = [...out].sort((a,b)=>b.rating-a.rating);
    return out;
  }, [maxPrice, onlyNew, onSale, size, category, under100, r100_150, r150_200, over200, sortBy]);

  return (
    <main>
      <section id="shop" className="bg-white py-8">
        <div className="container-shell grid gap-4 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h3 className="mb-2 text-sm font-bold">Categories</h3>
              <div className="space-y-2 text-sm">
                {['All Products','Running','Sneakers','Basketball','Casual','Boots'].map((c)=> {
                  const count = c==='All Products' ? products.length : products.filter(x=>x.category===c).length;
                  return (
                    <button key={c} onClick={()=>setCategory(c)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${category===c?'bg-amber-100 font-semibold':'hover:bg-black/5'}`}>
                      <span>{c}</span><span className="text-xs text-black/45">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-bold">Quick Filters</h3>
              <div className="mb-3 flex gap-2">
                <button onClick={()=>setOnlyNew(v=>!v)} className={`rounded-full px-3 py-1 text-xs ${onlyNew?'bg-black text-white':'bg-black/5'}`}>New Arrivals</button>
                <button onClick={()=>setOnSale(v=>!v)} className={`rounded-full px-3 py-1 text-xs ${onSale?'bg-black text-white':'bg-black/5'}`}>On Sale</button>
              </div>
              <label className="mb-2 block text-sm">{t('size')}
                <select value={size} onChange={(e)=>setSize(e.target.value)} className="mt-1 w-full rounded-lg border border-black/20 p-2"><option value="all">All</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option></select>
              </label>
              <label className="block text-sm">{t('maxPrice')}: ${maxPrice}<input type="range" min={40} max={250} value={maxPrice} onChange={(e)=>setMaxPrice(Number(e.target.value))} className="mt-2 w-full"/></label>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-bold">Price Range</h3>
              <label className="mb-1 block text-sm"><input type="checkbox" checked={under100} onChange={(e)=>setUnder100(e.target.checked)} className="mr-2"/>Under $100</label>
              <label className="mb-1 block text-sm"><input type="checkbox" checked={r100_150} onChange={(e)=>setR100_150(e.target.checked)} className="mr-2"/>$100 - $150</label>
              <label className="mb-1 block text-sm"><input type="checkbox" checked={r150_200} onChange={(e)=>setR150_200(e.target.checked)} className="mr-2"/>$150 - $200</label>
              <label className="mb-1 block text-sm"><input type="checkbox" checked={over200} onChange={(e)=>setOver200(e.target.checked)} className="mr-2"/>$200+</label>
            </div>
          </aside>

          <div>
            <div className="mb-3 flex items-center justify-between text-sm">
              <span>Showing {filtered.length} products</span>
              <label className="text-xs text-black/60">Sort by:
                <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="ml-2 rounded-md border border-black/15 px-2 py-1 text-xs">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price Low</option>
                  <option value="price-desc">Price High</option>
                  <option value="rating">Top Rated</option>
                </select>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="container-shell pb-12">
        <div className="card p-6 text-sm text-black/70">
          <h2 className="text-xl font-bold text-black">{t('contact')}</h2>
          <p className="mt-2">Damascus, Syria — WhatsApp: +963 957 261 491 — Instagram: @stepzone</p>
        </div>
      </section>
    </main>
  );
}
