import React, { useCallback, useEffect } from 'react';
import classes from './OrderMessagesSection.module.css';
import { OrderType } from '../../../types/types';
import OrderMessagesList from './OrderMessagesList/OrderMessagesList';
import NewOrderMessage from './NewOrderMessage/NewOrderMessage';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getOrderMessagesThunk, selectorOrderMessages } from '../../../store/orderMessagesSlice';
import { getIsArchivedOrder } from '../../../utils/ordersFunctions';
import OrderSubSectionSelector from '../../OrderSubSectionSelector/OrderSubSectionSelector';

type PropsType = {
  order: OrderType;
  isOrderForManufacturer?: boolean;
  sendNewOrderMessage?: (message: string) => void;
};

const OrderMessagesSection: React.FC<PropsType> = ({ order, isOrderForManufacturer, sendNewOrderMessage }) => {
  const dispatch = useAppDispatch();
  const orderMessages = useAppSelector(selectorOrderMessages);
  const isArchivedOrder = getIsArchivedOrder(order);

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
      <div className={classes.delimiter} />
      <OrderSubSectionSelector title={'Переписка'}>
        <>
          <div className={classes.content}>
            <OrderMessagesList orderMessages={orderMessages} showNoMessagesTitle={isArchivedOrder} />
          </div>
          {sendNewOrderMessage && (
            <NewOrderMessage
              isOrderForManufacturer={isOrderForManufacturer}
              sendNewOrderMessage={sendNewOrderMessage}
              showDelimiter={orderMessages.length > 0}
            />
          )}
        </>
      </OrderSubSectionSelector>
    </div>
  );
};

export default OrderMessagesSection;
