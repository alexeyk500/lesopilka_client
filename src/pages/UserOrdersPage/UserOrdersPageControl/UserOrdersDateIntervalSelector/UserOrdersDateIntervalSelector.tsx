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
import { dateMonthShift } from '../../../../utils/dateTimeFunctions';
import { MAX_MONTH_SHIFT_FOR_USER_ORDERS, MIN_MONTH_SHIFT_FOR_USER_ORDERS } from '../../../../utils/constants';

const UserOrdersDateIntervalSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFrom = new Date(useAppSelector(selectorSelectedOrderDateFrom));
  const dateTo = new Date(useAppSelector(selectorSelectedOrderDateTo));

  const minDate = dateMonthShift(new Date(), MIN_MONTH_SHIFT_FOR_USER_ORDERS);
  const maxDate = dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_USER_ORDERS);

  const handleSetDateFrom = (dateStr: string) => {
    dispatch(setDateFrom(dateStr));
  };

  const handleSetDateTo = (dateStr: string) => {
    dispatch(setDateTo(dateStr));
  };

  return (
    <div className={classes.container}>
      <OrdersDateIntervalSelector
        minDate={minDate}
        maxDate={maxDate}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSelectDateFrom={handleSetDateFrom}
        onSelectDateTo={handleSetDateTo}
      />
    </div>
  );
};

export default UserOrdersDateIntervalSelector;
