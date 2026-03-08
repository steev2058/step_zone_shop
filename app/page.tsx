'use client';
import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useCart } from '@/components/cart';
import { useI18n } from '@/components/i18n';

const WA_NUMBER = '963957261491';

export default function HomePage() {
  const { t, lang } = useI18n();
  const { items, remove, clear } = useCart();

  const [maxPrice, setMaxPrice] = useState(220);
  const [size, setSize] = useState('all');
  const [onlyNew, setOnlyNew] = useState(false);
  const [category, setCategory] = useState('All Products');
  const [under100, setUnder100] = useState(false);
  const [r100_150, setR100_150] = useState(false);
  const [r150_200, setR150_200] = useState(false);
  const [over200, setOver200] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => products.filter((p) => {
    if (p.price > maxPrice) return false;
    if (onlyNew && !p.isNew) return false;
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
  }), [maxPrice, onlyNew, size, category, under100, r100_150, r150_200, over200]);

  const newItems = products.filter((p) => p.isNew);
  const total = items.reduce((a, b) => a + b.price * b.qty, 0);

  const placeOrder = async () => {
    if (!items.length || !name || !phone || !address) return;
    setBusy(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, phone, address, items })
      });
      const data = await res.json();
      const lines = items.map((i) => `- ${i.name} x${i.qty}${i.size ? ` (size ${i.size})` : ''} = $${i.price * i.qty}`).join('\n');
      const text = `${lang === 'ar' ? 'طلب جديد من STEPZONE' : 'New STEPZONE order'}\n\nOrder ID: ${data.orderId || '-'}\n${lines}\n\nTotal: $${total}\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPayment: Cash on Delivery`;
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
      clear();
      alert('Order submitted successfully');
    } catch {
      alert('Failed to submit order');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main>
      <section id="home" className="relative overflow-hidden bg-brandBlack text-white">
        <div className="container-shell grid min-h-[76vh] items-center gap-10 py-16 md:grid-cols-2">
          <div className="fade-up">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/60">STEPZONE / S23</p>
            <h1 className="text-5xl font-extrabold leading-[0.95] sm:text-6xl md:text-7xl">JUST<br />STEP IN.</h1>
            <p className="mt-6 max-w-md text-sm text-white/75">{t('premiumSneakers')} — UAE imports curated for Syria.</p>
            <a href="#shop" className="btn-primary mt-8">{t('shopNow')}</a>
          </div>
          <div className="fade-up">
            <div className="card overflow-hidden bg-white/95">
              <img src="/products/p5.svg" alt="Hero sneaker" className="h-[420px] w-full object-cover" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      <section id="new" className="container-shell py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight">{t('newCollection')}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {newItems.map((p) => (
            <a key={p.slug} href={`#shop`} className="group card overflow-hidden">
              <img src={p.image} alt={p.name} className="h-36 w-full object-cover transition duration-500 group-hover:scale-105 md:h-48" loading="lazy" />
              <div className="p-3"><div className="text-sm font-semibold">{p.name}</div><div className="text-xs text-black/60">${p.price}</div></div>
            </a>
          ))}
        </div>
      </section>

      <section id="shop" className="bg-white py-12">
        <div className="container-shell grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h3 className="mb-2 text-sm font-bold">Categories</h3>
              <div className="space-y-1 text-sm">
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
              <label className="mb-2 block text-sm"><input type="checkbox" checked={onlyNew} onChange={(e)=>setOnlyNew(e.target.checked)} className="mr-2"/>New Arrivals</label>
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
            <div className="mb-4 flex items-center justify-between text-sm">
              <span>Showing {filtered.length} products</span>
              <div className="text-xs text-black/50">Sort by: Featured</div>
            </div>
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="checkout" className="container-shell py-12">
        <div className="mx-auto max-w-3xl card p-6">
          <h1 className="text-3xl font-bold">{t('checkout')}</h1>
          <p className="mt-2 text-sm text-black/70">{t('paymentMethod')}</p>

          <div className="mt-6 space-y-3 border-b border-black/10 pb-6">
            {items.length === 0 && <p className="text-sm text-black/60">Cart is empty.</p>}
            {items.map((i) => (
              <div key={`${i.slug}-${i.size||''}`} className="flex items-center justify-between text-sm">
                <div>{i.name} x{i.qty} {i.size ? `( ${t('size')}: ${i.size} )` : ''}</div>
                <div className="flex items-center gap-3"><span>${i.price * i.qty}</span><button onClick={() => remove(i.slug, i.size)} className="text-red-600">×</button></div>
              </div>
            ))}
            {items.length > 0 && <div className="text-right font-bold">Total: ${total}</div>}
          </div>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder={t('name')} className="w-full rounded-xl border border-black/20 p-3" />
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={t('phone')} className="w-full rounded-xl border border-black/20 p-3" />
            <textarea value={address} onChange={(e)=>setAddress(e.target.value)} placeholder={t('address')} className="h-28 w-full rounded-xl border border-black/20 p-3" />
            <button type="button" disabled={busy} onClick={placeOrder} className="btn-primary w-full">{busy ? '...' : t('placeOrder')}</button>
          </form>
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
