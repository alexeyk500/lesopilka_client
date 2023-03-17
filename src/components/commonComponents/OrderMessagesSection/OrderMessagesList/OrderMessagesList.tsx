import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { getOrderMessagesThunk, selectorOrderMessages } from '../../../../store/orderMessagesSlice';
import { OrderType } from '../../../../types/types';
import classes from './OrderMessagesList.module.css';
import OrderMessagesListItem from './OrderMessagesListItem/OrderMessagesListItem';

type PropsType = {
  order: OrderType;
};

const OrderMessagesList: React.FC<PropsType> = ({ order }) => {
  const dispatch = useAppDispatch();
  const orderMessages = useAppSelector(selectorOrderMessages);

  const updateOrderMessages = useCallback(() => {
    const orderId = order.order.id;
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token && orderId) {
      dispatch(getOrderMessagesThunk({ orderId, token }));
    }
  }, [order, dispatch]);

  useEffect(() => {
    updateOrderMessages();
  }, [updateOrderMessages]);

  return (
    <div className={classes.container}>
      {orderMessages?.map((orderMessage, ind) => (
        <OrderMessagesListItem key={ind} orderMessage={orderMessage} />
      ))}
    </div>
  );
};

export default OrderMessagesList;
