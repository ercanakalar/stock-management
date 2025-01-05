import { useNavigate } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../../assets/icons/profile.svg';

import './Profile.scss';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const Profile = () => {
  const userName = 'Kerem';
  const navigate = useNavigate();

  const handleCreateButtonClick = () => {
    navigate('/create-product');
  };

  return (
    <div className="profile-container">
      <span className="profile-icon">
        <ProfileIcon />
      </span>
      <p className="profile-name">{userName}</p>
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={handleCreateButtonClick}
        className="create-button"
      />
    </div>
  );
};
