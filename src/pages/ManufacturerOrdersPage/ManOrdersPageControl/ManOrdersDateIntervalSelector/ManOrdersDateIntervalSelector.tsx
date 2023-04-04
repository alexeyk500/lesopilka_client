import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  selectorSelectedManOrderDateFrom,
  selectorSelectedManOrderDateTo,
  setManDateFrom,
  setManDateTo,
} from '../../../../store/manOrdersSlice';
import DateIntervalSelector from '../../../../components/commonComponents/DateIntervalSelector/DateIntervalSelector';

const ManOrdersDateIntervalSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFrom = new Date(useAppSelector(selectorSelectedManOrderDateFrom));
  const dateTo = new Date(useAppSelector(selectorSelectedManOrderDateTo));

  const handleSetDateFrom = (date: Date) => {
    dispatch(setManDateFrom(date.toISOString()));
  };

  const handleSetDateTo = (date: Date) => {
    dispatch(setManDateTo(date.toISOString()));
  };

  return (
    <DateIntervalSelector
      title={'Период поставки'}
      dateFrom={dateFrom}
      onSelectDateFrom={handleSetDateFrom}
      dateTo={dateTo}
      onSelectDateTo={handleSetDateTo}
    />
  );
};

export default ManOrdersDateIntervalSelector;
