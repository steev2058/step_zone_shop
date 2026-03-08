'use client';

import { useEffect, useMemo, useState } from 'react';

type OrderItem = { slug: string; name: string; price: number; qty: number; size?: string };
type Order = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  address: string;
  payment: string;
  total: number;
  items: OrderItem[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const r = await fetch('/api/orders', { cache: 'no-store' });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Failed');
      setOrders(data.orders || []);
    } catch (e) {
      setError((e as Error).message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return orders;
    return orders.filter((o) =>
      `${o.id} ${o.name} ${o.phone} ${o.address}`.toLowerCase().includes(s)
    );
  }, [orders, q]);

  const exportCsv = () => {
    window.open('/api/orders?format=csv', '_blank');
  };

  return (
    <main className="container-shell py-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Admin Orders</h1>
        <div className="flex gap-2">
          <button onClick={load} className="rounded-lg border border-black/20 px-3 py-2 text-sm">Refresh</button>
          <button onClick={exportCsv} className="btn-primary">Export CSV</button>
        </div>
      </div>

      <div className="card p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by order id / name / phone / address"
          className="mb-4 w-full rounded-xl border border-black/20 p-3"
        />

        {loading && <p className="text-sm text-black/60">Loading...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 text-left">
                  <th className="p-2">Order</th>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Items</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-b border-black/5 align-top">
                    <td className="p-2 font-semibold">{o.id}</td>
                    <td className="p-2">{o.name}<br />{o.phone}<br /><span className="text-black/60">{o.address}</span></td>
                    <td className="p-2">{o.items.map(i => `${i.name} x${i.qty}${i.size ? ` (${i.size})` : ''}`).join(', ')}</td>
                    <td className="p-2">${o.total}</td>
                    <td className="p-2">{new Date(o.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length===0 && <p className="p-2 text-sm text-black/60">No orders found.</p>}
          </div>
        )}
      </div>
    </main>
  );
}
