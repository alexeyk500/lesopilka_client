import React from 'react';
import classes from './UserOrderStatusSelector.module.css';
import OrderStatusSelector from '../../../../components/commonComponents/OrderStatusSelector/OrderStatusSelector';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorSelectedOrderStatusId, setSelectedOrderStatusId } from '../../../../store/ordersSlice';
import { OptionsType, OrderStatusEnum } from '../../../../types/types';

export const orderStatusOptions: OptionsType[] = [
  { id: 0, title: 'Все', toolTip: 'Все ваши заказы' },
  { id: 1, title: OrderStatusEnum.onConfirming, toolTip: 'Заказы еще на рассмотрении у поставщика' },
  { id: 2, title: OrderStatusEnum.confirmedOrder, toolTip: 'Поставщик готов поставить вам эти заказы' },
  { id: 3, title: OrderStatusEnum.canceledByUser, toolTip: 'Вы отменили эти заказы' },
  { id: 4, title: OrderStatusEnum.canceledByManufacturer, toolTip: 'Поставщик не готов поставить вам эти заказы' },
  { id: 5, title: OrderStatusEnum.inArchive, toolTip: 'Заказы c датой поставки старше 30 дней' },
];

const UserOrderStatusSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedOrderStatusId = useAppSelector(selectorSelectedOrderStatusId);
  const onSelectOrderStatusId = (id: number) => {
    dispatch(setSelectedOrderStatusId(id));
  };

  return (
    <div className={classes.container}>
      <OrderStatusSelector
        orderStatusOptions={orderStatusOptions}
        selectedOrderStatusId={selectedOrderStatusId}
        onSelectOrderStatusId={onSelectOrderStatusId}
      />
    </div>
  );
};

export default UserOrderStatusSelector;
