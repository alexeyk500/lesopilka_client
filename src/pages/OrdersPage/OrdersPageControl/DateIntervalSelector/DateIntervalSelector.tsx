import React from 'react';
import classes from './DateIntervalSelector.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import DatePickerComponent from '../../../../components/commonComponents/DatePickerComponent/DatePickerComponent';
import {
  selectorSelectedOrderDateFrom,
  selectorSelectedOrderDateTo,
  setDateFrom,
  setDateTo,
} from '../../../../store/ordersSlice';
import { dateMonthShift } from '../../../../utils/dateTimeFunctions';
import { MAX_MONTH_SHIFT_FOR_ORDERS } from '../../../../utils/constants';

const minDateFrom = dateMonthShift(new Date(), -4);
const maxDateFrom = new Date();
const minDateTo = new Date();
const maxDateTo = dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_ORDERS);

const DateIntervalSelector = () => {
  const dispatch = useAppDispatch();
  const dateFrom = new Date(useAppSelector(selectorSelectedOrderDateFrom));
  const dateTo = new Date(useAppSelector(selectorSelectedOrderDateTo));

  const handleSetDateFrom = (newDate: Date) => {
    dispatch(setDateFrom(newDate.toISOString()));
  };

  const handleSetDateTo = (newDate: Date) => {
    dispatch(setDateTo(newDate.toISOString()));
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'Период заказов'}</div>
      <div className={classes.dateSelectorRow}>
        <div className={classes.rowTitle}>{'c'}</div>
        <DatePickerComponent
          minDate={minDateFrom}
          maxDate={maxDateFrom}
          selectedDate={dateFrom}
          onSelectDate={handleSetDateFrom}
          customClasses={classes.customDatePicker}
        />
      </div>
      <div className={classes.dateSelectorRow}>
        <div className={classes.rowTitle}>{'по'}</div>
        <DatePickerComponent
          minDate={minDateTo}
          maxDate={maxDateTo}
          selectedDate={dateTo}
          onSelectDate={handleSetDateTo}
          customClasses={classes.customDatePicker}
        />
      </div>
    </div>
  );
};

export default DateIntervalSelector;
