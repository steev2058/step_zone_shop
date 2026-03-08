'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Lang = 'en' | 'ar';

type Dict = Record<string, { en: string; ar: string }>;

const dict: Dict = {
  home: { en: 'Home', ar: 'الرئيسية' },
  shop: { en: 'Shop', ar: 'المتجر' },
  newCollection: { en: 'New Collection', ar: 'جديدنا' },
  contact: { en: 'Contact', ar: 'تواصل' },
  premiumSneakers: { en: 'Premium Sneakers', ar: 'أحذية رياضية فاخرة' },
  shopNow: { en: 'Shop Now', ar: 'تسوق الآن' },
  addToCart: { en: 'Add to Cart', ar: 'أضف للسلة' },
  checkout: { en: 'Checkout', ar: 'إتمام الطلب' },
  placeOrder: { en: 'Place Order on WhatsApp', ar: 'إرسال الطلب عبر واتساب' },
  name: { en: 'Name', ar: 'الاسم' },
  phone: { en: 'Phone', ar: 'الهاتف' },
  address: { en: 'Address', ar: 'العنوان' },
  size: { en: 'Size', ar: 'المقاس' },
  paymentMethod: { en: 'Payment: Cash on delivery', ar: 'الدفع: عند الاستلام' },
  featured: { en: 'Featured Sneakers', ar: 'منتجات مميزة' },
  filter: { en: 'Filters', ar: 'الفلاتر' },
  maxPrice: { en: 'Max Price', ar: 'أقصى سعر' },
  onlyNew: { en: 'Only New', ar: 'الجديد فقط' },
  cart: { en: 'Cart', ar: 'السلة' }
};

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict) => string } | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('stepzone_lang') as Lang | null;
    if (saved === 'ar' || saved === 'en') setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('stepzone_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t: (k: keyof typeof dict) => dict[k][lang]
  }), [lang]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
