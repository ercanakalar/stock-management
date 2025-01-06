import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  setAvailableProducts,
  setSearchTerm,
} from '../../store/slices/productSlice';
import { Search } from '../../components/search/Search';
import { Profile } from '../../features/header/profile/Profile';
import { Basket } from '../../features/header/basket/Basket';
import { HeaderTitle } from '../../features/header/HeaderTitle';
import { LayoutProps } from '../../type/children-type';
import { ProductState } from '../../type/product-type';
import HeaderOptions from '../../features/header/mobile/HeaderOptions';
import HeaderFilter from '../../features/header/mobile/HeaderFilter';
import HeaderSort from '../../features/header/mobile/HeaderSort';
import HeaderBasket from '../../features/header/mobile/HeaderBasket';

import './Header.scss';
import { Button } from 'antd';

export const Header = (props: LayoutProps) => {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const productId = useAppSelector(
    (state: { product: ProductState }) => state.product.productId
  );
  const available = useAppSelector(
    (state: { product: ProductState }) => state.product.available
  );

  const handleSearchChange = (term: string) => dispatch(setSearchTerm(term));
  const handleAvailabilityChange = (available: string) => {
    dispatch(setAvailableProducts(available));
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const toggleSort = () => setIsSortOpen(!isSortOpen);
  const toggleBasket = () => setIsBasketOpen(!isBasketOpen);

  return (
    <div className='layout-container'>
      <header className='header'>
        <div className='header-title-and-search'>
          <HeaderTitle />
          <div className='search-container'>
            <Search onChange={handleSearchChange} className='search' />
          </div>
        </div>
        <div className='header-basket-profile'>
          <Basket />
          <Profile />
        </div>
      </header>

      {!productId && (
        <div className='mobile-header-options'>
          <Button
            type='default'
            block
            style={{
              backgroundColor: '#f5f5f5',
              padding: '16px 0',
              width: '100%',
              border: 'none',
            }}
            onClick={toggleFilter}
          >
            Filter
          </Button>
          <Button
            type='default'
            block
            style={{
              backgroundColor: '#f5f5f5',
              padding: '16px 0',
              border: 'none',
            }}
            onClick={toggleSort}
          >
            Sort
          </Button>
        </div>
      )}

      {isFilterOpen && (
        <HeaderFilter
          available={['Yes', 'No']}
          selectedAvailable={available}
          handleAvailabilityChange={handleAvailabilityChange}
          toggleFilter={toggleFilter}
        />
      )}
      {isSortOpen && (
        <HeaderSort setIsSortOpen={setIsSortOpen} toggleSort={toggleSort} />
      )}
      {isBasketOpen && <HeaderBasket toggleBasket={toggleBasket} />}

      <main className='header-main-content'>{props.children}</main>
      <HeaderOptions toggleBasket={toggleBasket} />
    </div>
  );
};
