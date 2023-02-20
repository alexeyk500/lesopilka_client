import React from 'react';
import OrderStatusSelector from './OrderStatusSelector/OrderStatusSelector';
import classes from './OrdersPageControl.module.css';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import OrdersPageDateIntervalSelector from '../../../components/commonComponents/OrdersPageDateIntervalSelector/OrdersPageDateIntervalSelector';
import { dateMonthShift } from '../../../utils/dateTimeFunctions';
import { MAX_MONTH_SHIFT_FOR_USER_ORDERS, MIN_MONTH_SHIFT_FOR_USER_ORDERS } from '../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  selectorSelectedOrderDateFrom,
  selectorSelectedOrderDateTo,
  setDateFrom,
  setDateTo,
} from '../../../store/ordersSlice';

const OrdersPageControl: React.FC = () => {
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
    <>
      <div className={classes.containerStatusSelector}>
        <OrdersPageDateIntervalSelector
          minDate={minDate}
          maxDate={maxDate}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onSelectDateFrom={handleSetDateFrom}
          onSelectDateTo={handleSetDateTo}
        />
      </div>
      <div className={classes.containerStatusSelector}>
        <OrderStatusSelector />
      </div>
      <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
    </>
  );
};

export default OrdersPageControl;
