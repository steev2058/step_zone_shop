'use client';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from './i18n';
import { useCart } from './cart';

export default function Header() {
  const { t } = useI18n();
  const { count } = useCart();

  const links = [
    { href: '#home', label: t('home') }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-2">
        <a href="#home" className="flex items-center gap-2">
          <Image src="/stepzone-logo.png" alt="STEPZONE" width={140} height={44} priority />
        </a>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-brandGold transition-colors hidden sm:inline">
              {link.label}
            </a>
          ))}
          <a href="#checkout" className="rounded-lg border border-black/15 px-2 py-1 text-xs">{t('cart')} ({count})</a>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
