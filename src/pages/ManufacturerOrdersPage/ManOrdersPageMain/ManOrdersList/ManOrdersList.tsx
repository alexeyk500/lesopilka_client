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
import OrderItem from '../../../../components/OrderItem/OrderItem';
import { convertOrdersViewToServerOrdersStatus } from '../../../../utils/ordersFunctions';
import OrderItemTableTile from '../../../../components/commonComponents/OrderItemTableTile/OrderItemTableTile';

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
      <OrderItemTableTile />
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
