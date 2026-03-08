export type Product = {
  slug: string;
  brand: 'Nike' | 'Adidas';
  name: string;
  price: number;
  image: string;
  images: string[];
  sizes: number[];
  isNew?: boolean;
};

const imgs = (n: number) => [`/products/p${n}.svg`, `/products/p${((n)%8)+1}.svg`, `/products/p${((n+1)%8)+1}.svg`];

export const products: Product[] = [
  { slug: 'nike-air-max-90', brand: 'Nike', name: 'Nike Air Max 90', price: 129, image: '/products/p1.svg', images: imgs(1), sizes: [40,41,42,43], isNew: true },
  { slug: 'nike-dunk-low-retro', brand: 'Nike', name: 'Nike Dunk Low Retro', price: 119, image: '/products/p2.svg', images: imgs(2), sizes: [40,41,42,44], isNew: true },
  { slug: 'nike-air-force-1-07', brand: 'Nike', name: "Nike Air Force 1 '07", price: 125, image: '/products/p3.svg', images: imgs(3), sizes: [41,42,43,44] },
  { slug: 'nike-pegasus-41', brand: 'Nike', name: 'Nike Pegasus 41', price: 139, image: '/products/p4.svg', images: imgs(4), sizes: [40,41,42,43] },
  { slug: 'adidas-samba-og', brand: 'Adidas', name: 'Adidas Samba OG', price: 115, image: '/products/p5.svg', images: imgs(5), sizes: [41,42,43,44], isNew: true },
  { slug: 'adidas-gazelle-indoor', brand: 'Adidas', name: 'Adidas Gazelle Indoor', price: 110, image: '/products/p6.svg', images: imgs(6), sizes: [40,41,42] },
  { slug: 'adidas-campus-00s', brand: 'Adidas', name: 'Adidas Campus 00s', price: 109, image: '/products/p7.svg', images: imgs(7), sizes: [41,42,43] },
  { slug: 'adidas-ultraboost-light', brand: 'Adidas', name: 'Adidas Ultraboost Light', price: 149, image: '/products/p8.svg', images: imgs(8), sizes: [40,42,44], isNew: true }
];
