import React from 'react';
import OrderStatusSelector from './OrderStatusSelector/OrderStatusSelector';
import classes from './OrdersPageControl.module.css';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import OrdersPageDateIntervalSelector from './OrdersPageDateIntervalSelector/OrdersPageDateIntervalSelector';

const OrdersPageControl: React.FC = () => {
  return (
    <>
      <div className={classes.containerStatusSelector}>
        <OrdersPageDateIntervalSelector />
      </div>
      <div className={classes.containerStatusSelector}>
        <OrderStatusSelector />
      </div>
      <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
    </>
  );
};

export default OrdersPageControl;
