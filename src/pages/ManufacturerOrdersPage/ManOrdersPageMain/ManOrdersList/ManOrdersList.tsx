import React, { useCallback, useEffect } from 'react';
import classes from './ManOrdersList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  getManOrdersByParamsThunk,
  selectorManOrders,
  selectorSelectedManOrderDateFrom,
  selectorSelectedManOrderDateTo,
  selectorSelectedManOrderStatusId,
} from '../../../../store/manOrdersSlice';
import { getEndOfTheDayDate } from '../../../../utils/dateTimeFunctions';
import { orderStatusOptions } from '../../../../utils/constants';
import OrderItem from '../../../../components/commonComponents/OrderItem/OrderItem';
import { convertOrdersViewToServerOrdersStatus } from '../../../../utils/ordersFunctions';

const ManOrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const manOrders = useAppSelector(selectorManOrders);
  const manOrderDateTo = useAppSelector(selectorSelectedManOrderDateTo);
  const manOrderDateFrom = useAppSelector(selectorSelectedManOrderDateFrom);
  const selectedManOrderStatusId = useAppSelector(selectorSelectedManOrderStatusId);

  const ordersStatus = orderStatusOptions.find((option) => option.id === selectedManOrderStatusId)?.title;

  const getManOrdersByParams = useCallback(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const serverOrdersStatus = convertOrdersViewToServerOrdersStatus(ordersStatus!);
    const dateToEndOfTheDate = getEndOfTheDayDate(manOrderDateTo);
    if (manOrderDateFrom && dateToEndOfTheDate && serverOrdersStatus && token) {
      dispatch(
        getManOrdersByParamsThunk({
          orderDateFrom: manOrderDateFrom,
          orderDateTo: dateToEndOfTheDate,
          ordersStatus: serverOrdersStatus,
          token,
          isOrdersForManufacturer: true,
        })
      );
    }
  }, [dispatch, manOrderDateFrom, manOrderDateTo, ordersStatus]);

  useEffect(getManOrdersByParams, [dispatch, manOrderDateTo, manOrderDateFrom, ordersStatus, getManOrdersByParams]);

  return (
    <div className={classes.container}>
      <div className={classes.tableTitle}>
        <div className={classes.tableColumnDate}>{'Поставка'}</div>
        <div className={classes.tableColumnNumber}>{'Номер'}</div>
        <div className={classes.tableColumnManufacturer}>{'Покупатель'}</div>
        <div className={classes.tableColumnWeight}>{'Вес'}</div>
        <div className={classes.tableColumnVolume}>{'Обьем'}</div>
        <div className={classes.tableColumnCost}>{'Стоимость'}</div>
        <div className={classes.tableColumnDelivery}>{'Доставка'}</div>
        <div className={classes.tableColumnActions}>{'Действия'}</div>
        <div className={classes.tableColumnStatus}>{'Статус'}</div>
      </div>
      <div className={classes.scrollContainer}>
        {manOrders.length === 0 && (
          <div className={classes.emptyList}>{`список заказов со статусом "${ordersStatus}" пуст ...`}</div>
        )}
        {manOrders.map((order) => (
          <OrderItem key={order.order.id} order={order} updateOrders={getManOrdersByParams} isOrderForManufacturer />
        ))}
      </div>
    </div>
  );
};

export default ManOrdersList;
