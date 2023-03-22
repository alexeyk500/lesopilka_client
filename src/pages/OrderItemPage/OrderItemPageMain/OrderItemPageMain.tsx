import React, { useCallback, useEffect } from 'react';
import classes from '../../UserOrdersPage/UserOrdersPageMain/UserOrdersPageMain.module.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getOrderByOrderIdThunk, selectorOrders } from '../../../store/ordersSlice';
import OrderItem from '../../../components/commonComponents/OrderItem/OrderItem';

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
        <div className={classes.tableTitle}>
          <div className={classes.tableColumnDate}>{'Поставка'}</div>
          <div className={classes.tableColumnNumber}>{'Номер'}</div>
          <div className={classes.tableColumnManufacturer}>{'Поставщик'}</div>
          <div className={classes.tableColumnWeight}>{'Вес'}</div>
          <div className={classes.tableColumnVolume}>{'Обьем'}</div>
          <div className={classes.tableColumnCost}>{'Стоимость'}</div>
          <div className={classes.tableColumnDelivery}>{'Доставка'}</div>
          <div className={classes.tableColumnActions}>{'Действия'}</div>
          <div className={classes.tableColumnStatus}>{'Статус'}</div>
        </div>
        <div className={classes.scrollContainer}>
          {orders.length === 0 && <div className={classes.emptyList}>{`Заказ не найден`}</div>}
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
