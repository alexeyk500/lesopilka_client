import React from 'react';
import classes from './ManLicensesDateIntervalSelector.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

import {
  selectorManufacturerLicensesDateFrom,
  selectorManufacturerLicensesDateTo,
  setLicensesDateFrom,
  setLicensesDateTo,
} from '../../../../store/manLicensesSlice';
import DateIntervalSelector from '../../../../components/commonComponents/DateIntervalSelector/DateIntervalSelector';

const ManLicensesDateIntervalSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFrom = new Date(useAppSelector(selectorManufacturerLicensesDateFrom));
  const dateTo = new Date(useAppSelector(selectorManufacturerLicensesDateTo));

  const handleSetDateFrom = (date: Date) => {
    dispatch(setLicensesDateFrom(date.toISOString()));
  };

  const handleSetDateTo = (date: Date) => {
    dispatch(setLicensesDateTo(date.toISOString()));
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

export default ManLicensesDateIntervalSelector;
