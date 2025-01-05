import React, { useState } from 'react';
import { ReactComponent as BasketIcon } from '../../../assets/icons/portfeil.svg';
import { useAppSelector } from '../../../store/hook';
import { CartState } from '../../../type/cart-type';
import convertCurrencyTr from '../../../utils/convertCurrency';
import { BasketCard } from '../../../components/card/basketCard/BasketCard';

import './Basket.scss';

export const Basket = () => {
  const price = useAppSelector((state: { cart: CartState }) => state.cart.totalPrice);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const openBasket = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  return (
    <div className="basket-container">
      <div className="basket-button" onClick={openBasket}>
        <span>
          <BasketIcon className="basket-icon" />
        </span>
        <p className="basket-price">{convertCurrencyTr(price)}</p>
      </div>
      {isBasketOpen && (
        <div className="basket-dropdown">
          <BasketCard />
        </div>
      )}
    </div>
  );
};
