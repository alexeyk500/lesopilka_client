import React from 'react';
import { dateMonthShift, normalizeDate } from '../../../../utils/dateTimeFunctions';
import { MAX_MONTH_SHIFT_FOR_USER_ORDERS, MIN_MONTH_SHIFT_FOR_USER_ORDERS } from '../../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  selectorSelectedOrderDateFrom,
  selectorSelectedOrderDateTo,
  setDateFrom,
  setDateTo,
} from '../../../../store/ordersSlice';
import DateIntervalSelector from '../../../../components/commonComponents/DateIntervalSelector/DateIntervalSelector';

const minDate = dateMonthShift(new Date(), MIN_MONTH_SHIFT_FOR_USER_ORDERS);
const maxDate = dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_USER_ORDERS);

const OrdersPageDateIntervalSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFrom = new Date(useAppSelector(selectorSelectedOrderDateFrom));
  const dateTo = new Date(useAppSelector(selectorSelectedOrderDateTo));

  const handleSetDateFrom = (newDate: Date) => {
    dispatch(setDateFrom(normalizeDate(newDate).toISOString()));
  };

  const handleSetDateTo = (newDate: Date) => {
    dispatch(setDateTo(normalizeDate(newDate).toISOString()));
  };

  return (
    <DateIntervalSelector
      dateFrom={dateFrom}
      onSelectDateFrom={handleSetDateFrom}
      dateTo={dateTo}
      onSelectDateTo={handleSetDateTo}
      minDateFrom={minDate}
      maxDateFrom={maxDate}
      minDateTo={minDate}
      maxDateTo={maxDate}
    />
  );
};

export default OrdersPageDateIntervalSelector;
