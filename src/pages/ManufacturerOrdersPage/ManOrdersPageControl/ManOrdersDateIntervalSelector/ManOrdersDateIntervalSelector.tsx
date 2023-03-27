import React from 'react';
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
import DateIntervalSelector from '../../../../components/commonComponents/DateIntervalSelector/DateIntervalSelector';

const ManOrdersDateIntervalSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFrom = new Date(useAppSelector(selectorSelectedManOrderDateFrom));
  const dateTo = new Date(useAppSelector(selectorSelectedManOrderDateTo));

  const minDate = dateMonthShift(new Date(), MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS);
  const maxDate = dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS);

  const handleSetDateFrom = (date: Date) => {
    dispatch(setManDateFrom(date.toISOString()));
  };

  const handleSetDateTo = (date: Date) => {
    dispatch(setManDateTo(date.toISOString()));
  };

  return (
    <DateIntervalSelector
      title={'Пероид поставки'}
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

export default ManOrdersDateIntervalSelector;
