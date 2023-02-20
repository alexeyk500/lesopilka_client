import React from 'react';
import classes from './ManOrdersDateIntervalSelector.module.css';
import OrdersDateIntervalSelector from '../../../../components/commonComponents/OrdersDateIntervalSelector/OrdersDateIntervalSelector';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  selectorSelectedManOrderDateFrom,
  selectorSelectedManOrderDateTo,
  setManDateFrom,
  setManDateTo,
} from '../../../../store/manOrdersSlice';
import { dateMonthShift } from '../../../../utils/dateTimeFunctions';
import {
  MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS,
  MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS,
} from '../../../../utils/constants';

const ManOrdersDateIntervalSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFrom = new Date(useAppSelector(selectorSelectedManOrderDateFrom));
  const dateTo = new Date(useAppSelector(selectorSelectedManOrderDateTo));

  const minDate = dateMonthShift(new Date(), MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS);
  const maxDate = dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS);

  const handleSetDateFrom = (dateStr: string) => {
    dispatch(setManDateFrom(dateStr));
  };

  const handleSetDateTo = (dateStr: string) => {
    dispatch(setManDateTo(dateStr));
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

export default ManOrdersDateIntervalSelector;
