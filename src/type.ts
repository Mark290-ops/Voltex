export interface Product {
  id: number;
  name: string;
  brand: 'QASA' | 'Hisense' | 'LG' | 'Samsung' | 'Qlink';
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  imgPath: string;
  inStock: boolean;
  models?: string[];
  description?: string;
}

export interface CartItem extends Product {
  name: string;
  quantity: number;
  selectedModel?: string;
  imgPath: string;
}