import React from 'react';
import classes from './OrderMessagesSection.module.css';
import { OrderType } from '../../../types/types';
import OrderMessagesList from './OrderMessagesList/OrderMessagesList';

type PropsType = {
  order: OrderType;
};

const OrderMessagesSection: React.FC<PropsType> = ({ order }) => {
  return (
    <div className={classes.container}>
      <div className={classes.delimiter} />
      <div className={classes.sectionTitle}>Переписка по заказу</div>
      <div className={classes.content}>
        <div className={classes.sectionDescription}>
          {`дополнительные подробности по заказу (до 500 символов в каждом сообщении) `}
        </div>
        <OrderMessagesList order={order} />
      </div>
    </div>
  );
};

export default OrderMessagesSection;
