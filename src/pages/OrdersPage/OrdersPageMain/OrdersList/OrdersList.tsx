import React, { useEffect } from 'react';
import classes from './OrdersList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  getOrdersThunk,
  selectorOrders,
  selectorSelectedOrderDateFrom,
  selectorSelectedOrderDateTo,
  selectorSelectedOrderStatusId,
} from '../../../../store/ordersSlice';
import { orderStatusOptions } from '../../OrdersPageControl/OrderStatusSelector/OrderStatusSelector';
import { convertOrdersStatusToServerOrdersStatus } from '../../../../utils/functions';
import OrderItem from './OrderItem/OrderItem';

const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFrom = useAppSelector(selectorSelectedOrderDateFrom);
  const dateTo = useAppSelector(selectorSelectedOrderDateTo);

  const selectedOrderStatusId = useAppSelector(selectorSelectedOrderStatusId);
  const ordersStatus = orderStatusOptions.find((option) => option.id === selectedOrderStatusId)?.title;

  const orders = useAppSelector(selectorOrders);

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const serverOrdersStatus = convertOrdersStatusToServerOrdersStatus(ordersStatus!);
    if (dateFrom && dateTo && serverOrdersStatus && token) {
      console.log('will ask orders from server -', dateFrom, dateTo, serverOrdersStatus, token);
      dispatch(getOrdersThunk({ dateFrom, dateTo, ordersStatus: serverOrdersStatus, token }));
    }
  }, [dispatch, dateFrom, dateTo, ordersStatus]);

  return (
    <div className={classes.container}>
      <div className={classes.tableTitle}>
        <div className={classes.tableColumnDate}>{'Дата'}</div>
        <div className={classes.tableColumnNumber}>{'Номер'}</div>
        <div className={classes.tableColumnManufacturer}>{'Поставщик'}</div>
        <div className={classes.tableColumnWeight}>{'Вес'}</div>
        <div className={classes.tableColumnVolume}>{'Обьем'}</div>
        <div className={classes.tableColumnDelivery}>{'Доставка'}</div>
        <div className={classes.tableColumnCost}>{'Стоимость'}</div>
        <div className={classes.tableColumnActions}>{'Действия'}</div>
        <div className={classes.tableColumnStatus}>{'Статус'}</div>
      </div>
      <div className={classes.scrollContainer}>
        {orders.map((order) => (
          <OrderItem key={order.order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersList;