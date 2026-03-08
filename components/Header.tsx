import Link from 'next/link';
import Image from 'next/image';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/new-collection', label: 'New Collection' },
  { href: '/contact', label: 'Contact' }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/stepzone-logo.jpg" alt="STEPZONE" width={140} height={44} priority />
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brandGold transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
