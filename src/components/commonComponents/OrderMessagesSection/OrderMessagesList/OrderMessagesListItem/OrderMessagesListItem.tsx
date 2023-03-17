import React from 'react';
import { OrderMessageType } from '../../../../../types/types';
import classes from './OrderMessagesListItem.module.css';
import classNames from 'classnames';

type PropsType = {
  orderMessage: OrderMessageType;
};

const OrderMessagesListItem: React.FC<PropsType> = ({ orderMessage }) => {
  return (
    <div className={classNames(classes.container, { [classes.contentToRight]: orderMessage.userId !== null })}>
      <div className={classes.content}>
        <div className={classes.infoRow}>{orderMessage.messageDate}</div>
        {orderMessage.messageText}
      </div>
    </div>
  );
};

export default OrderMessagesListItem;
