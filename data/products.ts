export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
};

export const products: Product[] = [
  { slug: 'air-run-pro-black', name: 'Air Run Pro Black', price: 79, image: '/products/p1.svg', isNew: true },
  { slug: 'street-racer-white', name: 'Street Racer White', price: 74, image: '/products/p2.svg', isNew: true },
  { slug: 'desert-flex-gold', name: 'Desert Flex Gold', price: 89, image: '/products/p3.svg' },
  { slug: 'urban-core-grey', name: 'Urban Core Grey', price: 69, image: '/products/p4.svg' },
  { slug: 'stepzone-neo', name: 'STEPZONE Neo', price: 95, image: '/products/p5.svg', isNew: true },
  { slug: 'swift-lite', name: 'Swift Lite', price: 62, image: '/products/p6.svg' },
  { slug: 'night-jump', name: 'Night Jump', price: 84, image: '/products/p7.svg' },
  { slug: 'motion-edge', name: 'Motion Edge', price: 72, image: '/products/p8.svg' }
];
