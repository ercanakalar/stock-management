import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hook';
import { setProductId } from '../../store/slices/productSlice';

import './HeaderTitle.scss';

export const HeaderTitle = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const homeBack = () => {
    dispatch(setProductId(''));
    navigate(`/`);
  };

  return (
    <h1 onClick={homeBack} className="header-title">
      Pointo
    </h1>
  );
};
