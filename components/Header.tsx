'use client';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from './i18n';
import { useCart } from './cart';

export default function Header() {
  const { t } = useI18n();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-2">
        <a href="#home" className="flex items-center gap-2">
          <Image src="/stepzone-logo.png" alt="STEPZONE" width={132} height={40} priority />
        </a>

        <nav className="hidden items-center gap-4 text-sm font-semibold sm:flex">
          <a href="#home" className="hover:text-brandGold transition-colors">{t('home')}</a>
          <a href="/checkout" className="rounded-lg border border-black/15 px-2 py-1 text-xs">{t('cart')} ({count})</a>
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <button className="rounded-full p-2 hover:bg-black/5" aria-label="Search">⌕</button>
          <button className="rounded-full p-2 hover:bg-black/5" aria-label="Theme">◐</button>
          <button className="rounded-full p-2 hover:bg-black/5" aria-label="Wishlist">♡</button>
          <a href="/checkout" className="relative rounded-full p-2 hover:bg-black/5" aria-label="Cart">🛍
            {count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-orange-500 px-1.5 text-[10px] font-bold text-white">{count}</span>}
          </a>
        </div>
      </div>
    </header>
  );
}
