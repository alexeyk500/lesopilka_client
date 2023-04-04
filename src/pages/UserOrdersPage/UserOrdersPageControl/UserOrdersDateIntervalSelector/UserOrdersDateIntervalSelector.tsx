import React from 'react';
import classes from './UserOrdersDateIntervalSelector.module.css';
import OrdersDateIntervalSelector from '../../../../components/commonComponents/OrdersDateIntervalSelector/OrdersDateIntervalSelector';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  selectorSelectedOrderDateFrom,
  selectorSelectedOrderDateTo,
  setDateFrom,
  setDateTo,
} from '../../../../store/ordersSlice';

const UserOrdersDateIntervalSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFrom = new Date(useAppSelector(selectorSelectedOrderDateFrom));
  const dateTo = new Date(useAppSelector(selectorSelectedOrderDateTo));

  const handleSetDateFrom = (dateStr: string) => {
    dispatch(setDateFrom(dateStr));
  };

  const handleSetDateTo = (dateStr: string) => {
    dispatch(setDateTo(dateStr));
  };

  return (
    <div className={classes.container}>
      <OrdersDateIntervalSelector
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSelectDateFrom={handleSetDateFrom}
        onSelectDateTo={handleSetDateTo}
      />
    </div>
  );
};

export default UserOrdersDateIntervalSelector;
