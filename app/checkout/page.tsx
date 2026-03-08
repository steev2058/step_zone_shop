'use client';
import { useCart } from '@/components/cart';
import { useI18n } from '@/components/i18n';
import { useState } from 'react';

const WA_NUMBER = '963957261491';

export default function CheckoutPage() {
  const { items, remove, clear } = useCart();
  const { t, lang } = useI18n();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [busy, setBusy] = useState(false);

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
    <main className="container-shell py-10">
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
          {items.length>0 && <button type="button" onClick={clear} className="w-full rounded-xl border border-black/20 p-3 text-sm">Clear Cart</button>}
        </form>
      </div>
    </main>
  );
}
