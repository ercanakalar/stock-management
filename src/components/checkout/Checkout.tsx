import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { calculateCheckout } from "../../store/slices/cartSlice";
import { CardBase } from "../card/base/CardBase";
import convertCurrencyTr from "../../utils/convertCurrency";
import { CartState } from "../../type/cart-type";

import "./Checkout.scss";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const price = useAppSelector((state: { cart: CartState }) => state.cart.totalPrice);

  useEffect(() => {
    dispatch(calculateCheckout());
  }, [dispatch]);

  return (
    <CardBase title="Checkout">
      <div className="checkout-container">
        <div className="checkout-row">
          <p className="total-price-label">Total Price:</p>
          <p className="total-price-value">{convertCurrencyTr(price)}</p>
        </div>
        <div className="checkout-button-container">
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </CardBase>
  );
};

export default Checkout;
