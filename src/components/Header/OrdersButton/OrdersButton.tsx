import React from 'react';
import classes from './OrdersButton.module.css';
import ordersList from '../../../img/ordersList.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { setCatalogSearchParams } from '../../../store/productSlice';
import { PageEnum } from '../../AppRouter/AppRouter';
import useLoginUser from '../../../hooks/useLoginUser';

const OrdersButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const user = useAppSelector(selectorUser);
  const loginUser = useLoginUser(PageEnum.UserOrdersPage);

  const onClickOrders = () => {
    if (user) {
      dispatch(setCatalogSearchParams(searchParams.toString()));
      navigate(PageEnum.UserOrdersPage);
    } else {
      loginUser();
    }
  };

  return (
    <button className={classes.container} onClick={onClickOrders}>
      <img className={classes.ico} src={ordersList} alt="orders" />
    </button>
  );
};

export default OrdersButton;
