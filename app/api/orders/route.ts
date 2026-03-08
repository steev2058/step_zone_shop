import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

type Item = { slug: string; name: string; price: number; qty: number; size?: string };

async function notifyTelegram(text: string) {
  const token = process.env.ADMIN_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.ADMIN_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

async function notifyWhatsapp(order: unknown) {
  const webhook = process.env.ADMIN_WHATSAPP_WEBHOOK_URL;
  if (!webhook) return;
  await fetch(webhook, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ type: 'new_order', payload: order })
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, address, items } = body as { name: string; phone: string; address: string; items: Item[] };
    if (!name || !phone || !address || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const total = items.reduce((a, b) => a + Number(b.price || 0) * Number(b.qty || 1), 0);
    const order = {
      id: `SZ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name,
      phone,
      address,
      payment: 'cash_on_delivery',
      items,
      total
    };

    const dir = path.join(process.cwd(), 'data');
    const file = path.join(dir, 'orders.json');
    await fs.mkdir(dir, { recursive: true });
    let all: unknown[] = [];
    try { all = JSON.parse(await fs.readFile(file, 'utf8')); } catch {}
    all.unshift(order);
    await fs.writeFile(file, JSON.stringify(all, null, 2));

    const lines = items.map((i) => `- ${i.name} x${i.qty}${i.size ? ` (size ${i.size})` : ''}`).join('\n');
    const msg = `🛒 New STEPZONE Order\n#${order.id}\n${name} | ${phone}\n${address}\n\n${lines}\n\nTotal: $${total}`;
    await Promise.allSettled([notifyTelegram(msg), notifyWhatsapp(order)]);

    return NextResponse.json({ ok: true, orderId: order.id });
  } catch {
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 });
  }
}
