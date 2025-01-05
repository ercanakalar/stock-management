import React, { useEffect } from "react";
import { Badge, Button, Space } from "antd";
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { CartState } from "../../../type/cart-type";
import { getTotalCart } from "../../../store/slices/cartSlice";

import "./MobileHeader.scss";

const HeaderOptions = (props: { toggleBasket: () => void }) => {
  const dispatch = useAppDispatch();

  const totalProducts = useAppSelector((state: { cart: CartState }) => state.cart.totalProducts);
  const cartItems = useAppSelector((state: { cart: CartState }) => state.cart.items);

  useEffect(() => {
    dispatch(getTotalCart());
  }, [dispatch, cartItems]);

  return (
    <div className="header-options">
      <Space size="large">
        <Button
          type="text"
          icon={<HomeOutlined style={{ fontSize: "20px" }} />}
          shape="circle"
        />
        <Button
          type="text"
          icon={<SearchOutlined style={{ fontSize: "20px" }} />}
          shape="circle"
        />
        <Badge count={totalProducts} offset={[0, 6]}>
          <Button
            type="text"
            icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
            shape="circle"
            onClick={props.toggleBasket}
          />
        </Badge>
        <Button
          type="text"
          icon={<UserOutlined style={{ fontSize: "20px" }} />}
          shape="circle"
        />
      </Space>
    </div>
  );
};

export default HeaderOptions;
