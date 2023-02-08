import React from 'react';
import classes from './DateIntervalSelector.module.css';
import DatePickerComponent from '../DatePickerComponent/DatePickerComponent';

type PropsType = {
  dateFrom: Date | null;
  onSelectDateFrom: (date: Date) => void;
  dateTo: Date | null;
  onSelectDateTo: (date: Date) => void;
  minDateFrom?: Date;
  maxDateFrom?: Date;
  minDateTo?: Date;
  maxDateTo?: Date;
};

const DateIntervalSelector: React.FC<PropsType> = ({
  dateFrom,
  onSelectDateFrom,
  dateTo,
  onSelectDateTo,
  minDateFrom,
  maxDateFrom,
  minDateTo,
  maxDateTo,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'Период заказов'}</div>
      <div className={classes.dateSelectorRow}>
        <div className={classes.rowTitle}>{'c'}</div>
        <DatePickerComponent
          minDate={minDateFrom}
          maxDate={maxDateFrom}
          selectedDate={dateFrom}
          onSelectDate={onSelectDateFrom}
          customClasses={classes.customDatePicker}
        />
      </div>
      <div className={classes.dateSelectorRow}>
        <div className={classes.rowTitle}>{'по'}</div>
        <DatePickerComponent
          minDate={minDateTo}
          maxDate={maxDateTo}
          selectedDate={dateTo}
          onSelectDate={onSelectDateTo}
          customClasses={classes.customDatePicker}
        />
      </div>
    </div>
  );
};

export default DateIntervalSelector;
