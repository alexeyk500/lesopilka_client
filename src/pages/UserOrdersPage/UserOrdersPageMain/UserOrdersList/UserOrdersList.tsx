import React, { useCallback, useEffect } from 'react';
import classes from './UserOrdersList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  getOrdersByParamsThunk,
  selectorOrders,
  selectorSelectedOrderDateFrom,
  selectorSelectedOrderDateTo,
  selectorSelectedOrderStatusId,
} from '../../../../store/ordersSlice';
import OrderItem from '../../../../components/commonComponents/OrderItem/OrderItem';
import { getEndOfTheDayDate } from '../../../../utils/dateTimeFunctions';
import { orderStatusOptions } from '../../../../utils/constants';
import { convertOrdersViewToServerOrdersStatus } from '../../../../utils/ordersFunctions';

const UserOrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectorOrders);
  const orderDateTo = useAppSelector(selectorSelectedOrderDateTo);
  const orderDateFrom = useAppSelector(selectorSelectedOrderDateFrom);
  const selectedOrderStatusId = useAppSelector(selectorSelectedOrderStatusId);

  const ordersStatus = orderStatusOptions.find((option) => option.id === selectedOrderStatusId)?.title;

  const updateOrdersByParams = useCallback(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const serverOrdersStatus = convertOrdersViewToServerOrdersStatus(ordersStatus!);
    const dateToEndOfTheDate = getEndOfTheDayDate(orderDateTo);
    if (orderDateFrom && dateToEndOfTheDate && serverOrdersStatus && token) {
      dispatch(
        getOrdersByParamsThunk({
          orderDateFrom,
          orderDateTo: dateToEndOfTheDate,
          ordersStatus: serverOrdersStatus,
          token,
        })
      );
    }
  }, [dispatch, orderDateFrom, orderDateTo, ordersStatus]);

  useEffect(updateOrdersByParams, [dispatch, orderDateFrom, orderDateTo, ordersStatus, updateOrdersByParams]);

  return (
    <div className={classes.container}>
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
        {orders.length === 0 && (
          <div className={classes.emptyList}>{`список заказов со статусом "${ordersStatus}" пуст ...`}</div>
        )}
        {orders.map((order) => (
          <OrderItem key={order.order.id} order={order} updateOrders={updateOrdersByParams} />
        ))}
      </div>
    </div>
  );
};

export default UserOrdersList;
