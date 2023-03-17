import React from 'react';
import { OrderMessageType } from '../../../../../types/types';
import classes from './OrderMessagesListItem.module.css';
import classNames from 'classnames';
import { formatUTC } from '../../../../../utils/dateTimeFunctions';

type PropsType = {
  orderMessage: OrderMessageType;
};

const OrderMessagesListItem: React.FC<PropsType> = ({ orderMessage }) => {
  return (
    <div className={classNames(classes.container, { [classes.contentToRight]: orderMessage.userId !== null })}>
      <div className={classes.content}>
        <div className={classes.infoRow}>
          <div className={classNames(classes.userTitle, { [classes.userColor]: orderMessage.userId !== null })}>
            {orderMessage.userId ? 'Покупатель' : orderMessage.manufacturerId ? 'Поставщик' : 'Робот'}
          </div>
          <div className={classNames(classes.dateTitle, { [classes.userColor]: orderMessage.userId !== null })}>
            {formatUTC(orderMessage.messageDate)}
          </div>
        </div>
        <div className={classes.messageContainer}>{orderMessage.messageText}</div>
      </div>
    </div>
  );
};

export default OrderMessagesListItem;
