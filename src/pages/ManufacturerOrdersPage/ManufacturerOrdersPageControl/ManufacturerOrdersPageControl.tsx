import React from 'react';
import classes from './ManufacturerOrdersPageControl.module.css';
import OrderStatusSelector from '../../OrdersPage/OrdersPageControl/OrderStatusSelector/OrderStatusSelector';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { dateMonthShift } from '../../../utils/dateTimeFunctions';
import {
  MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS,
  MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS,
} from '../../../utils/constants';
import {
  selectorSelectedManOrderDateFrom,
  selectorSelectedManOrderDateTo,
  setManDateFrom,
  setManDateTo,
} from '../../../store/manOrdersSlice';
import OrdersPageDateIntervalSelector from '../../../components/commonComponents/OrdersPageDateIntervalSelector/OrdersPageDateIntervalSelector';

const ManufacturerOrdersPageControl = () => {
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
    <>
      <div className={classes.containerIntervalSelector}>
        <OrdersPageDateIntervalSelector
          minDate={minDate}
          maxDate={maxDate}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onSelectDateFrom={handleSetDateFrom}
          onSelectDateTo={handleSetDateTo}
        />
      </div>
      <div className={classes.containerSection}>
        <OrderStatusSelector />
      </div>
      <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
    </>
  );
};

export default ManufacturerOrdersPageControl;
