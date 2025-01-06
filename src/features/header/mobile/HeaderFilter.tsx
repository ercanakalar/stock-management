import { Drawer, Button, Space } from 'antd';

import './MobileHeader.scss';
import { AvailableFilter } from '../../../components/available-filter/AvailableFilter';

const HeaderFilter = (props: {
  selectedAvailable: string;
  available: string[];
  handleAvailabilityChange: (model: string) => void;
  toggleFilter: (isOpen: boolean) => void;
}) => {
  return (
    <Drawer
      title='Filter'
      placement='bottom'
      onClose={() => props.toggleFilter(false)}
      open={true}
      bodyStyle={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
      height='100%'
      style={{
        height: '100vh',
        maxHeight: '100vh',
      }}
    >
      <Space direction='vertical' style={{ flex: 1, overflow: 'auto' }}>
        <AvailableFilter
          className='filter'
          title='Available'
          selectedFilter={props.selectedAvailable}
          filter={['Yes', 'No']}
          onChange={props.handleAvailabilityChange}
        />
      </Space>
      <Button type='primary' onClick={() => props.toggleFilter(false)} block>
        Apply
      </Button>
    </Drawer>
  );
};

export default HeaderFilter;
