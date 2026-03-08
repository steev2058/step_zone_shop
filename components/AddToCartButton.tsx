'use client';

import { useCart } from './cart';
import { useI18n } from './i18n';

export default function AddToCartButton({ slug, name, price, image, size }: { slug: string; name: string; price: number; image: string; size?: string }) {
  const { add } = useCart();
  const { t } = useI18n();
  return (
    <button className="btn-primary mt-4 w-full" onClick={() => add({ slug, name, price, image, size })}>
      {t('addToCart')}
    </button>
  );
}
