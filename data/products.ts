export type Product = {
  slug: string;
  brand: 'Nike' | 'Adidas';
  name: string;
  category: 'Running' | 'Sneakers' | 'Basketball' | 'Casual' | 'Boots';
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  images: string[];
  sizes: number[];
  colors: string[];
  tag?: 'NEW' | 'BESTSELLER';
  isNew?: boolean;
};

const imgs = (n: number) => [`/products/p${n}.svg`, `/products/p${((n)%8)+1}.svg`, `/products/p${((n+1)%8)+1}.svg`];

export const products: Product[] = [
  { slug: 'nike-air-max-90', brand: 'Nike', name: 'Nike Air Max 90', category: 'Running', price: 179, oldPrice: 219, rating: 4.9, image: '/products/p1.svg', images: imgs(1), sizes: [40,41,42,43], colors: ['#EF4444','#111827','#2563EB'], tag: 'BESTSELLER', isNew: true },
  { slug: 'nike-dunk-low-retro', brand: 'Nike', name: 'Nike Dunk Low Retro', category: 'Sneakers', price: 129, rating: 4.8, image: '/products/p2.svg', images: imgs(2), sizes: [40,41,42,44], colors: ['#111827','#D1D5DB','#1E3A8A','#92400E'], tag: 'BESTSELLER', isNew: true },
  { slug: 'nike-air-force-1-07', brand: 'Nike', name: "Nike Air Force 1 '07", category: 'Basketball', price: 199, rating: 4.7, image: '/products/p3.svg', images: imgs(3), sizes: [41,42,43,44], colors: ['#111827','#F3F4F6','#3B82F6'], tag: 'NEW', isNew: true },
  { slug: 'nike-free-rn', brand: 'Nike', name: 'Nike Free RN', category: 'Running', price: 169, rating: 4.8, image: '/products/nike-free-black-1.jpg', images: ['/products/nike-free-black-1.jpg','/products/nike-free-white-1.jpg','/products/nike-free-blackwhite-1.jpg','/products/nike-free-whitegreen-1.jpg'], sizes: [40,41,42,43], colors: ['#111827','#F3F4F6','#22C55E'] },
  { slug: 'adidas-samba-og', brand: 'Adidas', name: 'Adidas Samba OG', category: 'Casual', price: 115, rating: 4.7, image: '/products/p5.svg', images: imgs(5), sizes: [41,42,43,44], colors: ['#111827','#F3F4F6'], tag: 'NEW', isNew: true },
  { slug: 'adidas-gazelle-indoor', brand: 'Adidas', name: 'Adidas Gazelle Indoor', category: 'Sneakers', price: 110, rating: 4.6, image: '/products/p6.svg', images: imgs(6), sizes: [40,41,42], colors: ['#1D4ED8','#111827','#F59E0B'] },
  { slug: 'adidas-campus-00s', brand: 'Adidas', name: 'Adidas Campus 00s', category: 'Sneakers', price: 109, rating: 4.7, image: '/products/p7.svg', images: imgs(7), sizes: [41,42,43], colors: ['#111827','#F3F4F6'], tag: 'BESTSELLER' },
  { slug: 'adidas-ultraboost-light', brand: 'Adidas', name: 'Adidas Ultraboost Light', category: 'Running', price: 149, rating: 4.8, image: '/products/p8.svg', images: imgs(8), sizes: [40,42,44], colors: ['#22C55E','#F3F4F6'], isNew: true }
];
