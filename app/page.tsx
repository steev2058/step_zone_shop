'use client';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useI18n } from '@/components/i18n';

export default function HomePage() {
  const { t } = useI18n();
  return (
    <main>
      <section className="bg-brandBlack py-28 text-white">
        <div className="container-shell text-center fade-up">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">STEPZONE</h1>
          <p className="mt-5 text-lg text-white/80">{t('premiumSneakers')}</p>
          <a href="/shop" className="btn-primary mt-9">{t('shopNow')}</a>
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{t('featured')}</h2>
          <a href="/new-collection" className="text-sm font-semibold text-brandGold">{t('newCollection')}</a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 8).map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </main>
  );
}
