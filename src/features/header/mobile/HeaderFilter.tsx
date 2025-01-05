import { Drawer, Button, Space } from 'antd';
import { Filter } from '../../../components/filter/Filter';

import './MobileHeader.scss';

const HeaderFilter = (props: {
  selectedBrands: Set<string>;
  selectedModels: Set<string>;
  brands: Set<string>;
  models: Set<string>;
  handleBrandChange: (brand: string) => void;
  handleModelChange: (model: string) => void;
  toggleFilter: (isOpen: boolean) => void;
}) => {
  return (
    <Drawer
      title="Filter"
      placement="bottom"
      onClose={() => props.toggleFilter(false)} open={true}
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
      <Space direction="vertical" style={{ flex: 1, overflow: 'auto' }}>
        <Filter
          className="brand-filter"
          title="Brands"
          selectedFilter={props.selectedBrands}
          filter={props.brands}
          onChange={props.handleBrandChange}
        />
        <Filter
          className="model-filter"
          title="Models"
          selectedFilter={props.selectedModels}
          filter={props.models}
          onChange={props.handleModelChange}
        />
      </Space>
      <Button type="primary" onClick={() => props.toggleFilter(false)} block>
        Apply
      </Button>
    </Drawer>
  );
};

export default HeaderFilter;
