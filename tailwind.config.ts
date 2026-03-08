import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brandBlack: '#0F0F0F',
        brandWhite: '#FFFFFF',
        brandGold: '#D4AF37',
        brandGray: '#F5F5F5'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
