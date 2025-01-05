import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { addToCart, removeFromCart } from "../../../store/slices/cartSlice";
import { CartItem, CartState } from "../../../type/cart-type";
import convertCurrencyTr from "../../../utils/convertCurrency";
import { CardBase } from "../base/CardBase";

import "./BasketCard.scss";
import { revertQuantityProduct } from "../../../store/slices/productSlice";

export const BasketCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: { cart: CartState }) => state.cart.items);

  const removeCart = (id: string) => {
    dispatch(removeFromCart(id));
    dispatch(revertQuantityProduct(id));
  };

  const addCart = (item: CartItem) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  return (
    <CardBase id="basket" title="Card" className="card-content-basket">
      <div className="basket-card">
        {cartItems.length > 0 ? (
          cartItems.map((item: CartItem, index: number) => (
            <div key={index + item.name} className="basket-item">
              <div className="item-info">
                <p className="item-name">{item.name}</p>
                <p className="item-price">{convertCurrencyTr(item.price)}</p>
              </div>
              <div className="item-controls">
                <button className="control-button" onClick={() => removeCart(item.id)}>
                  <span className="button-text">-</span>
                </button>
                <p className="item-quantity">{item.quantity}</p>
                <button className="control-button" onClick={() => addCart(item)}>
                  <span className="button-text">+</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}
      </div>
    </CardBase>
  );
};

export default BasketCard;
