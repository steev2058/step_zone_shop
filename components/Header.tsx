'use client';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from './i18n';
import { useCart } from './cart';

export default function Header() {
  const { t } = useI18n();
  const { count } = useCart();
  const links = [
    { href: '/', label: t('home') },
    { href: '/shop', label: t('shop') },
    { href: '/new-collection', label: t('newCollection') },
    { href: '/contact', label: t('contact') }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/stepzone-logo.png" alt="STEPZONE" width={140} height={44} priority />
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brandGold transition-colors hidden sm:inline">
              {link.label}
            </Link>
          ))}
          <Link href="/checkout" className="rounded-lg border border-black/15 px-2 py-1 text-xs">{t('cart')} ({count})</Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
