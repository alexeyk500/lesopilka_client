import React from 'react';
import DateIntervalSelector from './DateIntervalSelector/DateIntervalSelector';
import StatusSelector from './StatusSelector/StatusSelector';
import classes from './OrdersPageControl.module.css';

const OrdersPageControl: React.FC = () => {
  return (
    <>
      <div className={classes.containerStatusSelector}>
        <StatusSelector />
      </div>
      <DateIntervalSelector />
    </>
  );
};

export default OrdersPageControl;
