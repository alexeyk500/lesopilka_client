import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import classes from './ResellerReportDateIntervalSelector.module.css';
import DateIntervalSelector from '../../../../components/commonComponents/DateIntervalSelector/DateIntervalSelector';
import {
  selectorResellerReportDateFrom,
  selectorResellerReportDateTo,
  setResellerReportDateFrom,
  setResellerReportDateTo,
} from '../../../../store/resellerSlice';

const ResellerReportDateIntervalSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFrom = new Date(useAppSelector(selectorResellerReportDateFrom));
  const dateTo = new Date(useAppSelector(selectorResellerReportDateTo));

  const handleSetDateFrom = (date: Date) => {
    dispatch(setResellerReportDateFrom(date.toISOString()));
  };

  const handleSetDateTo = (date: Date) => {
    dispatch(setResellerReportDateTo(date.toISOString()));
  };

  return (
    <div className={classes.container}>
      <DateIntervalSelector
        title={'Период публикаций'}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSelectDateFrom={handleSetDateFrom}
        onSelectDateTo={handleSetDateTo}
      />
    </div>
  );
};

export default ResellerReportDateIntervalSelector;
