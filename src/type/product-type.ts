export type Product = {
  createdAt: string;
  name: string;
  image: string;
  price: string;
  description: string;
  model: string;
  brand: string;
  id: string;
  quantity: number;
};

export interface ProductState {
  brands: Set<string>;
  models: Set<string>;
  selectedBrands: Set<string>;
  selectedModels: Set<string>;
  products: Product[];
  productsNan: Product[];
  sort: string;
  searchTerm: string;
  pagination: number;
  totalProducts: number;
  productId: string;
  quantity: number;
  available: string;
}

export interface FormValues {
  name: string;
  image: string;
  price: string;
  description: string;
  model: string;
  brand: string;
  quantity: number;
  createdAt: string;
}
