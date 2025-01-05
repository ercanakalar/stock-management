import React from "react";
import { Drawer, Typography, Space, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import BasketCard from "../../../components/card/basketCard/BasketCard";
import Checkout from "../../../components/checkout/Checkout";

const HeaderBasket = (props: { toggleBasket: () => void }) => {
  return (
    <Drawer
      title={
        <Typography.Title level={4} style={{ margin: 0 }}>
          Basket
        </Typography.Title>
      }
      placement="right"
      closable={false}
      onClose={props.toggleBasket}
      open={true}
      width="100%"
      bodyStyle={{ padding: "16px" }}
      extra={
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={props.toggleBasket}
        />
      }
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <BasketCard />
        <Checkout />
      </Space>
    </Drawer>
  );
};

export default HeaderBasket;
