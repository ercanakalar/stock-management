import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setAvailableProducts, setSort } from '../../store/slices/productSlice';

import { Product } from '../../features/product/Product';
import { SortBy } from '../../components/sort/SortBy';

import { ProductState } from '../../type/product-type';
import { useGetFilterProductsQuery } from '../../store/services/productService';
import { BasketCard } from '../../components/card/basketCard/BasketCard';
import Checkout from '../../components/checkout/Checkout';

import './ProductPage.scss';
import { useResponsive } from '../../provider/ResponsiveProvider';
import { AvailableFilter } from '../../components/available-filter/AvailableFilter';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const available = useAppSelector((state: { product: ProductState }) => state.product.available);
  const currentSort = useAppSelector((state: { product: ProductState }) => state.product.sort);

  const [localSort, setLocalSort] = useState(currentSort);
  const { isMobile } = useResponsive();

  useGetFilterProductsQuery({});

  const handleAvailabilityChange = (available: string) => {
    dispatch(setAvailableProducts(available));
  }

  const handleSortChange = (value: string) => {
    setLocalSort(value);
    dispatch(setSort(value));
  };

  return (
    <div className="product-page">
      {!isMobile && (
        <div className="sidebar filters">
          <SortBy
            className="sort-by"
            title="Sort By"
            selectedSort={localSort}
            handleSortChange={handleSortChange}
          />
          <AvailableFilter
            className="filter"
            title="Available"
            selectedFilter={available}
            filter={['Yes', 'No']}
            onChange={handleAvailabilityChange}
          />
        </div>
      )}

      <div className="main-content">
        <Product />
      </div>

      {!isMobile && (<div className="sidebar cart">
        <BasketCard />
        <Checkout />
      </div>
      )}
    </div>
  );
};

export default ProductPage;
