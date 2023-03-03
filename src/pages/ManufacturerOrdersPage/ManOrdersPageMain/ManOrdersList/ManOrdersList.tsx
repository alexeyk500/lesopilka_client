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
import { convertOrdersStatusToServerOrdersStatus } from '../../../../utils/functions';
import { dateDayShift } from '../../../../utils/dateTimeFunctions';
import { orderStatusOptions } from '../../../../utils/constants';

const ManOrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const manOrders = useAppSelector(selectorManOrders);
  const manOrderDateTo = useAppSelector(selectorSelectedManOrderDateTo);
  const manOrderDateFrom = useAppSelector(selectorSelectedManOrderDateFrom);
  const selectedManOrderStatusId = useAppSelector(selectorSelectedManOrderStatusId);

  const ordersStatus = orderStatusOptions.find((option) => option.id === selectedManOrderStatusId)?.title;

  const getManOrdersByParams = useCallback(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const serverOrdersStatus = convertOrdersStatusToServerOrdersStatus(ordersStatus!);
    const dateToWithShift = dateDayShift(new Date(manOrderDateTo), 1).toISOString();
    if (manOrderDateFrom && dateToWithShift && serverOrdersStatus && token) {
      dispatch(
        getManOrdersByParamsThunk({
          orderDateFrom: manOrderDateFrom,
          orderDateTo: dateToWithShift,
          ordersStatus: serverOrdersStatus,
          token,
          isOrdersForManufacturer: true,
        })
      );
    }
  }, [dispatch, manOrderDateFrom, manOrderDateTo, ordersStatus]);

  useEffect(getManOrdersByParams, [dispatch, manOrderDateTo, manOrderDateFrom, ordersStatus, getManOrdersByParams]);

  console.log({ manOrders });

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
        {manOrders.map((manOrder) => {
          return manOrder.order.orderDate;
        })}
      </div>
    </div>
  );
};

export default ManOrdersList;
