import React from 'react';
import DateIntervalSelector from './DateIntervalSelector/DateIntervalSelector';
import OrderStatusSelector from './OrderStatusSelector/OrderStatusSelector';
import classes from './OrdersPageControl.module.css';

const OrdersPageControl: React.FC = () => {
  return (
    <>
      <div className={classes.containerStatusSelector}>
        <DateIntervalSelector />
      </div>
      <div className={classes.containerStatusSelector}>
        <OrderStatusSelector />
      </div>
    </>
  );
};

export default OrdersPageControl;
