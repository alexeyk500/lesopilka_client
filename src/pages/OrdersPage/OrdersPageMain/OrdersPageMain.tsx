import React, { useEffect } from 'react';
import classes from './OrdersPageMain.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getOrdersThunk,
  selectorSelectedOrderDateFrom,
  selectorSelectedOrderDateTo,
  selectorSelectedOrderStatusId,
} from '../../../store/ordersSlice';
import { orderStatusOptions } from '../OrdersPageControl/OrderStatusSelector/OrderStatusSelector';

const OrdersPageMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFrom = useAppSelector(selectorSelectedOrderDateFrom);
  const dateTo = useAppSelector(selectorSelectedOrderDateTo);

  const selectedOrderStatusId = useAppSelector(selectorSelectedOrderStatusId);
  const ordersStatus = orderStatusOptions.find((option) => option.id === selectedOrderStatusId)?.title;

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (dateFrom && dateTo && ordersStatus && token) {
      console.log('will ask orders from server -', dateFrom, dateTo, ordersStatus, token);
      dispatch(getOrdersThunk({ dateFrom, dateTo, ordersStatus, token }));
    }
  }, [dispatch, dateFrom, dateTo, ordersStatus]);

  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>{'Оформленные заказы'}</div>
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
    </div>
  );
};

export default OrdersPageMain;
