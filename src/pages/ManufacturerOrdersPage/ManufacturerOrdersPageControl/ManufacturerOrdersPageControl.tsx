import React from 'react';
import classes from './ManufacturerOrdersPageControl.module.css';
import OrderStatusSelector from '../../../components/commonComponents/OrderStatusSelector/OrderStatusSelector';
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
  selectorSelectedManOrderStatusId,
  setManDateFrom,
  setManDateTo,
  setSelectedManOrderStatusId,
} from '../../../store/manOrdersSlice';
import OrdersDateIntervalSelector from '../../../components/commonComponents/OrdersDateIntervalSelector/OrdersDateIntervalSelector';
import { OptionsType, OrderStatusEnum } from '../../../types/types';

export const manOrderStatusOptions: OptionsType[] = [
  { id: 0, title: 'Все', toolTip: 'Все ваши заказы' },
  { id: 1, title: OrderStatusEnum.onConfirming, toolTip: 'Заказы еще у вас на рассмотрении' },
  { id: 2, title: OrderStatusEnum.confirmedOrder, toolTip: 'Вы подтвердили готовность поставить эти заказы' },
  { id: 3, title: OrderStatusEnum.canceledByUser, toolTip: 'Покупатель отменил эти заказы' },
  { id: 4, title: OrderStatusEnum.canceledByManufacturer, toolTip: 'Вы не готовы поставить вам эти заказы' },
  { id: 5, title: OrderStatusEnum.inArchive, toolTip: 'Заказы c датой поставки старше 30 дней' },
];

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

  const selectedManOrderStatusId = useAppSelector(selectorSelectedManOrderStatusId);

  const onSelectManOrderStatusId = (id: number) => {
    dispatch(setSelectedManOrderStatusId(id));
  };

  return (
    <>
      <div className={classes.containerIntervalSelector}>
        <OrdersDateIntervalSelector
          minDate={minDate}
          maxDate={maxDate}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onSelectDateFrom={handleSetDateFrom}
          onSelectDateTo={handleSetDateTo}
        />
      </div>
      <div className={classes.containerSection}>
        <OrderStatusSelector
          orderStatusOptions={manOrderStatusOptions}
          selectedOrderStatusId={selectedManOrderStatusId}
          onSelectOrderStatusId={onSelectManOrderStatusId}
        />
      </div>
      <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
    </>
  );
};

export default ManufacturerOrdersPageControl;
