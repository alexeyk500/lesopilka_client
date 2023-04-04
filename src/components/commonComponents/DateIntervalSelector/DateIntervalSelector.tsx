import React from 'react';
import classes from './DateIntervalSelector.module.css';
import DatePickerComponent from '../DatePickerComponent/DatePickerComponent';

type PropsType = {
  title?: string;
  dateFrom: Date | null;
  onSelectDateFrom: (date: Date) => void;
  dateTo: Date | null;
  onSelectDateTo: (date: Date) => void;
};

const DateIntervalSelector: React.FC<PropsType> = ({ title, dateFrom, onSelectDateFrom, dateTo, onSelectDateTo }) => {
  return (
    <div className={classes.container}>
      {title && <div className={classes.title}>{title}</div>}
      <div className={classes.dateSelectorRow}>
        <div className={classes.rowTitle}>{'c'}</div>
        <DatePickerComponent
          selectedDate={dateFrom}
          onSelectDate={onSelectDateFrom}
          customClasses={classes.customDatePicker}
        />
      </div>
      <div className={classes.dateSelectorRow}>
        <div className={classes.rowTitle}>{'по'}</div>
        <DatePickerComponent
          selectedDate={dateTo}
          onSelectDate={onSelectDateTo}
          customClasses={classes.customDatePicker}
        />
      </div>
    </div>
  );
};

export default DateIntervalSelector;
