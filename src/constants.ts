import { Product, ProductStatus } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic White Shirt',
    description: 'A timeless staple for every wardrobe. Made from 100% Egyptian cotton.',
    price: 89,
    images: ['https://picsum.photos/seed/artemes1/800/1000'],
    category: 'Men',
    status: ProductStatus.IN_STOCK,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Off-white'],
    createdAt: Date.now(),
  },
  {
    id: '2',
    name: 'Artemes Night Dress',
    description: 'Elegant evening wear for the modern woman. Featuring gold silk threads.',
    price: 249,
    images: ['https://picsum.photos/seed/artemes2/800/1000'],
    category: 'Women',
    status: ProductStatus.OUT_OF_STOCK,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Midnight Blue', 'Gold'],
    createdAt: Date.now() - 86400000,
  },
  {
    id: '3',
    name: 'Minimalist Leather Bag',
    description: 'High-quality Italian leather with a sleek, minimalist design.',
    price: 159,
    images: ['https://picsum.photos/seed/artemes3/800/1000'],
    category: 'Accessories',
    status: ProductStatus.IN_STOCK,
    sizes: ['One Size'],
    colors: ['Black', 'Tan', 'Cream'],
    createdAt: Date.now() - 172800000,
  },
];

export const HERO_CAROUSEL = [
  'https://picsum.photos/seed/hero1/1920/1080',
  'https://picsum.photos/seed/hero2/1920/1080',
  'https://picsum.photos/seed/hero3/1920/1080',
];
