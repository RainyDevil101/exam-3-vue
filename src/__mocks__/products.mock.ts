export interface Product {
  name: string;
  price: number;
  stock: number;
  id: number;
  image: string;
}

export const products: Product[] = [
  {
    name: 'Audífono',
    price: 30000,
    stock: 3,
    id: 1,
    image: '/assets/images/headphone.webp',
  },
  {
    name: 'Mouse',
    price: 20000,
    stock: 5,
    id: 2,
    image: '/assets/images/mouse.webp',
  },
  {
    name: 'Teclado',
    price: 15000,
    stock: 10,
    id: 3,
    image: '/assets/images/keyboard.webp',
  },
  {
    name: 'Gabinete',
    price: 35000,
    stock: 4,
    id: 4,
    image: '/assets/images/computer-case.webp',
  },
  {
    name: 'Pantalla',
    price: 175000,
    stock: 3,
    id: 5,
    image: '/assets/images/monitor.webp',
  },
  {
    name: 'Silla',
    price: 150000,
    stock: 2,
    id: 6,
    image: '/assets/images/desk-chair.webp',
  },
]