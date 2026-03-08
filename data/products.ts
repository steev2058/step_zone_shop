export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  sizes: number[];
  isNew?: boolean;
};

const imgs = (n: number) => [`/products/p${n}.svg`, `/products/p${((n)%8)+1}.svg`, `/products/p${((n+1)%8)+1}.svg`];

export const products: Product[] = [
  { slug: 'air-run-pro-black', name: 'Air Run Pro Black', price: 79, image: '/products/p1.svg', images: imgs(1), sizes: [40,41,42,43], isNew: true },
  { slug: 'street-racer-white', name: 'Street Racer White', price: 74, image: '/products/p2.svg', images: imgs(2), sizes: [40,41,42,44], isNew: true },
  { slug: 'desert-flex-gold', name: 'Desert Flex Gold', price: 89, image: '/products/p3.svg', images: imgs(3), sizes: [41,42,43,44] },
  { slug: 'urban-core-grey', name: 'Urban Core Grey', price: 69, image: '/products/p4.svg', images: imgs(4), sizes: [40,41,42,43] },
  { slug: 'stepzone-neo', name: 'STEPZONE Neo', price: 95, image: '/products/p5.svg', images: imgs(5), sizes: [41,42,43,44], isNew: true },
  { slug: 'swift-lite', name: 'Swift Lite', price: 62, image: '/products/p6.svg', images: imgs(6), sizes: [40,41,42] },
  { slug: 'night-jump', name: 'Night Jump', price: 84, image: '/products/p7.svg', images: imgs(7), sizes: [41,42,43] },
  { slug: 'motion-edge', name: 'Motion Edge', price: 72, image: '/products/p8.svg', images: imgs(8), sizes: [40,42,44] }
];
