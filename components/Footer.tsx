import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 bg-brandBlack text-white">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-3">
        <div>
          <Image src="/stepzone-logo.png" alt="STEPZONE" width={170} height={52} />
          <p className="mt-3 text-sm text-white/70">Premium sneakers imported from UAE to Syria.</p>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Quick Links</h3>
          <div className="space-y-2 text-sm text-white/80">
            <Link href="/">Home</Link><br />
            <Link href="/shop">Shop</Link><br />
            <Link href="/new-collection">New Collection</Link><br />
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Contact</h3>
          <p className="text-sm text-white/80">Damascus, Syria</p>
          <p className="text-sm text-white/80">+963 957 261 491</p>
          <a href="https://instagram.com" className="text-sm text-brandGold">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
