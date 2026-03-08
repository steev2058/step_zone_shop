'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CartItem = { slug: string; name: string; price: number; image: string; size?: string; qty: number };

const CartCtx = createContext<{
  items: CartItem[];
  count: number;
  add: (item: Omit<CartItem, 'qty'>) => void;
  remove: (slug: string, size?: string) => void;
  clear: () => void;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('stepzone_cart');
    if (raw) setItems(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('stepzone_cart', JSON.stringify(items));
  }, [items]);

  const add = (item: Omit<CartItem, 'qty'>) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.slug === item.slug && p.size === item.size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const remove = (slug: string, size?: string) => setItems((prev) => prev.filter((p) => !(p.slug === slug && p.size === size)));
  const clear = () => setItems([]);
  const count = items.reduce((a, b) => a + b.qty, 0);

  const value = useMemo(() => ({ items, count, add, remove, clear }), [items, count]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
