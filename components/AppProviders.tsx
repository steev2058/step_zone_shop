'use client';

import { CartProvider } from './cart';
import { I18nProvider } from './i18n';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <CartProvider>{children}</CartProvider>
    </I18nProvider>
  );
}
