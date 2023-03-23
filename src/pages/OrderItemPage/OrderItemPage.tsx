import React, { useCallback, useEffect } from 'react';
import classes from '../NewOrderPage/NewOrderPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import OrderItemPageControl from './OrderItemPageControl/OrderItemPageControl';
import OrderItemPageMain from './OrderItemPageMain/OrderItemPageMain';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getOrderByOrderIdThunk, selectorOrders } from '../../store/ordersSlice';

type PropsType = {
  isManufacturerOrder?: boolean;
};

const OrderItemPage: React.FC<PropsType> = ({ isManufacturerOrder }) => {
  const { orderIdStr } = useParams();
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectorOrders)?.[0];

  const getOrder = useCallback(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const orderId = Number(orderIdStr);
    if (token && orderId > 0) {
      dispatch(getOrderByOrderIdThunk({ orderId, token }));
    }
  }, [dispatch, orderIdStr]);

  useEffect(() => {
    getOrder();
  }, [dispatch, getOrder]);

  const updateOrderItem = () => {
    getOrder();
  };

  return (
    <div className={classes.container}>
      <LeftColumn title={isManufacturerOrder ? 'Заказ от покупателя' : 'Заказ поставщику'}>
        <OrderItemPageControl order={order} isManufacturerOrder={isManufacturerOrder} />
      </LeftColumn>
      <MainColumn noScroll>
        <OrderItemPageMain order={order} updateOrderItem={updateOrderItem} isManufacturerOrder={isManufacturerOrder} />
      </MainColumn>
    </div>
  );
};

export default OrderItemPage;
