import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, ProductState } from '../../type/product-type';

const initialState: ProductState = {
  brands: new Set(),
  models: new Set(),
  selectedBrands: new Set(),
  selectedModels: new Set(),
  products: [],
  productsNan: [],
  sort: '',
  searchTerm: '',
  pagination: 1,
  totalProducts: 0,
  productId: '',
  quantity: 0,
  available: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    initializeFilters: (state) => {
      state.brands.clear();
      state.models.clear();
    },
    setSelectedBrand: (state, action: PayloadAction<string>) => {
      if (state.selectedBrands.has(action.payload)) {
        state.selectedBrands.delete(action.payload);
      } else {
        state.selectedBrands.add(action.payload);
      }
    },
    setSelectedModel: (state, action: PayloadAction<string>) => {
      if (state.selectedModels.has(action.payload)) {
        state.selectedModels.delete(action.payload);
      } else {
        state.selectedModels.add(action.payload);
      }
    },
    setBrands: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((brand) => {
        state.brands.add(brand);
      });
    },
    setModels: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((model) => {
        state.models.add(model);
      });
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPaginationPage: (state, action: PayloadAction<number>) => {
      state.pagination = action.payload;
    },
    setProductId: (state, action: PayloadAction<string>) => {
      state.productId = action.payload;
    },
    setAvailableProducts: (state, action: PayloadAction<string>) => {
      if (state.available === action.payload) {
        state.available = '';
      } else {
        state.available = action.payload;
      }
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    decreaseQuantityProduct(state, action: PayloadAction<string>) {
      state.products = state.products.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
    },
    revertQuantityProduct(state, action: PayloadAction<string>) {
      state.products = state.products.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
    },
  },
});

export const {
  setBrands,
  setModels,
  setSort,
  setSelectedBrand,
  setSelectedModel,
  setSearchTerm,
  setPaginationPage,
  setProductId,
  setAvailableProducts,
  setProducts,
  deleteProduct,
  decreaseQuantityProduct,
  revertQuantityProduct,
} = productSlice.actions;

export default productSlice.reducer;
