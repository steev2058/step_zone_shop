'use client';

import { useI18n } from './i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="rounded-lg border border-black/15 px-3 py-1 text-xs font-bold">
      {lang === 'en' ? 'AR' : 'EN'}
    </button>
  );
}
