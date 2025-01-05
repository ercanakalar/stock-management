import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setSort } from '../../../store/slices/productSlice';
import { SortBy } from '../../../components/sort/SortBy';
import { ProductState } from '../../../type/product-type';
import { Drawer, Button, Space } from 'antd';

const HeaderSort = (props: { setIsSortOpen: (isOpen: boolean) => void; toggleSort: () => void }) => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector((state: { product: ProductState }) => state.product.sort);
  const [localSort, setLocalSort] = useState(currentSort);

  const handleSortChange = (value: string) => {
    setLocalSort(value);
  };

  const applySort = () => {
    dispatch(setSort(localSort));
    props.setIsSortOpen(false);
  };

  return (
    <Drawer
      title="Sort"
      placement="bottom"
      onClose={props.toggleSort}
      open={true}
      bodyStyle={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
      height="100%"
      style={{
        height: '100vh',
        maxHeight: '100vh',
      }}
    >
      <Space direction="vertical" style={{ width: '100%', flex: 1, overflow: 'auto' }}>
        <SortBy
          className="sort-by"
          title="Sort By"
          selectedSort={localSort}
          handleSortChange={handleSortChange}
        />
        <Button type="primary" onClick={applySort} block>
          Apply
        </Button>
      </Space>
    </Drawer>
  );
};

export default HeaderSort;
