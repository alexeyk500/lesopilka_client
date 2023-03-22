import React, { useCallback, useEffect } from 'react';
import classes from '../../UserOrdersPage/UserOrdersPageMain/UserOrdersPageMain.module.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getOrderByOrderIdThunk, selectorOrders } from '../../../store/ordersSlice';
import OrderItem from '../../../components/commonComponents/OrderItem/OrderItem';
import OrderItemTableTile from '../../../components/commonComponents/OrderItemTableTile/OrderItemTableTile';

type PropsType = {
  isManufacturerOrder?: boolean;
};

const OrderItemPageMain: React.FC<PropsType> = ({ isManufacturerOrder }) => {
  const { orderIdStr } = useParams();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectorOrders);

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
      <div className={classes.pageTitle}>{isManufacturerOrder ? 'Заказ от покупателя' : 'Заказ поставщику'}</div>
      <div className={classes.orderContainer}>
        <OrderItemTableTile />
        <div className={classes.scrollContainer}>
          {orders.map((order) => (
            <OrderItem
              key={order.order.id}
              order={order}
              updateOrders={updateOrderItem}
              isOrderForManufacturer={isManufacturerOrder}
              openDetails
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderItemPageMain;
