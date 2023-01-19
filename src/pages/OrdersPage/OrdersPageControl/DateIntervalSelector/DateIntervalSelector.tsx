import React from 'react';
import classes from './DateIntervalSelector.module.css';
import { useAppSelector } from '../../../../hooks/hooks';
import DatePickerComponent from '../../../../components/commonComponents/DatePickerComponent/DatePickerComponent';
import { selectorSelectedOrderDateFrom, selectorSelectedOrderDateTo } from '../../../../store/ordersSlice';

const DateIntervalSelector = () => {
  const dateFrom = new Date(useAppSelector(selectorSelectedOrderDateFrom));
  const dateTo = new Date(useAppSelector(selectorSelectedOrderDateTo));

  const handleSetDateFrom = (newDate: Date) => {
    // if (newDate >= controlDate) {
    //   dispatch(setDate(newDate.toISOString()));
    // }
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'Период заказов'}</div>
      <div className={classes.dateSelectorRow}>
        <div className={classes.rowTitle}>{'c'}</div>
        <DatePickerComponent
          selectedDate={dateFrom}
          onSelectDate={handleSetDateFrom}
          customClasses={classes.customDatePicker}
        />
      </div>
      <div className={classes.dateSelectorRow}>
        <div className={classes.rowTitle}>{'по'}</div>
        <DatePickerComponent
          selectedDate={dateTo}
          onSelectDate={handleSetDateFrom}
          customClasses={classes.customDatePicker}
        />
      </div>
    </div>
  );
};

export default DateIntervalSelector;
