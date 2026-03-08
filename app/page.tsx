'use client';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useI18n } from '@/components/i18n';

export default function HomePage() {
  const { t } = useI18n();
  const featured = products.slice(0, 4);

  return (
    <main>
      <section className="relative overflow-hidden bg-brandBlack text-white">
        <div className="container-shell grid min-h-[76vh] items-center gap-10 py-16 md:grid-cols-2">
          <div className="fade-up">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/60">STEPZONE / S23</p>
            <h1 className="text-5xl font-extrabold leading-[0.95] sm:text-6xl md:text-7xl">JUST<br />STEP IN.</h1>
            <p className="mt-6 max-w-md text-sm text-white/75">{t('premiumSneakers')} — UAE imports curated for everyday street style in Syria.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/shop" className="btn-primary">{t('shopNow')}</a>
              <a href="/new-collection" className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black">{t('newCollection')}</a>
            </div>
          </div>
          <div className="fade-up">
            <div className="card overflow-hidden bg-white/95">
              <img src="/products/p5.svg" alt="Hero sneaker" className="h-[420px] w-full object-cover" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight">Featured Drops</h2>
          <a href="/shop" className="text-sm font-bold text-brandGold">View all</a>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {featured.map((p) => (
            <a key={p.slug} href={`/product/${p.slug}`} className="group card overflow-hidden">
              <img src={p.image} alt={p.name} className="h-36 w-full object-cover transition duration-500 group-hover:scale-105 md:h-48" loading="lazy" />
              <div className="p-3">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-xs text-black/60">${p.price}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-shell">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-tight">{t('featured')}</h2>
            <a href="/new-collection" className="text-sm font-semibold text-brandGold">{t('newCollection')}</a>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.slice(0, 8).map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
