import React from 'react';
import { OrderMessageType } from '../../../../types/types';
import classes from './OrderMessagesList.module.css';
import OrderMessagesListItem from './OrderMessagesListItem/OrderMessagesListItem';

type PropsType = {
  orderMessages: OrderMessageType[];
  showNoMessagesTitle?: boolean;
};

const OrderMessagesList: React.FC<PropsType> = ({ orderMessages, showNoMessagesTitle }) => {
  if (orderMessages.length === 0) {
    if (showNoMessagesTitle) {
      return <div className={classes.noMessagesTitle}>{'Сообщений нет'}</div>;
    }
    return null;
  }

  return (
    <div className={classes.container}>
      {orderMessages?.map((orderMessage, ind) => (
        <OrderMessagesListItem key={ind} orderMessage={orderMessage} />
      ))}
    </div>
  );
};

export default OrderMessagesList;
