import React, { Suspense } from 'react';
import { Button, Card, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../store/hook';
import { addToCart } from '../../../store/slices/cartSlice';

import './ProductCard.scss';
import Loader from '../../loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useDeleteProductByIdMutation } from '../../../store/services/productService';
import { decreaseQuantityProduct, deleteProduct } from '../../../store/slices/productSlice';

const { Meta } = Card;

const ProductCard: React.FC<{
  className?: string;
  product?: { id: string; name: string; price: string; image: string; quantity: number } | undefined;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteProductById] = useDeleteProductByIdMutation();

  if (!props.product) {
    return null;
  }

  const handleAddToCart = () => {
    if (props.product && props.product.quantity > 0) {
      dispatch(
        addToCart({
          id: props.product.id,
          name: props.product.name,
          price: Number(props.product.price),
          image: props.product.image,
          quantity: 1,
        })
      );
      dispatch(decreaseQuantityProduct(props.product.id));
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'edit') {
      navigate(`/edit/${props.product!.id}`);
    } else if (key === 'remove') {
      deleteProductById(props.product!.id);
      dispatch(deleteProduct(props.product!.id));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="remove">Remove</Menu.Item>
    </Menu>
  );

  return (
    <Suspense fallback={<Loader />}>
      <Card
        hoverable
        className="product-card"
        cover={<img alt={props.product.name} src={props.product.image} />}
        actions={[
          <Dropdown overlay={menu} trigger={['click']}>
            <MoreOutlined />
          </Dropdown>,
        ]}
      >
        <Meta title={props.product.name} description={`$${props.product.price}`} />
        <div className="quantity-info">
          <span>Quantity Available: </span>
          <strong>{props.product.quantity}</strong>
        </div>
        <div className="button-container">
          <Button disabled={props.product.quantity === 0} type="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </Card>
    </Suspense>
  );
};

export default ProductCard;
