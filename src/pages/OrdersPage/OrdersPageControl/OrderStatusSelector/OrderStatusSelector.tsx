import React from 'react';
import CheckBoxSquare from '../../../../components/commonComponents/CheckBoxSquare/CheckBoxSquare';
import { OptionsType, OrderStatusEnum } from '../../../../types/types';
import CheckBoxSection from '../../../../components/commonComponents/CheckBoxSection/CheckBoxSection';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorSelectedOrderStatusId, setSelectedOrderStatusId } from '../../../../store/ordersSlice';

export const orderStatusOptions: OptionsType[] = [
  { id: 0, title: 'Все', toolTip: 'Все ваши заказы' },
  { id: 1, title: OrderStatusEnum.onConfirming, toolTip: 'Заказы еще на рассмотрении у поставщика' },
  { id: 2, title: OrderStatusEnum.confirmedOrder, toolTip: 'Поставщик готов поставить вам эти заказы' },
  { id: 3, title: OrderStatusEnum.canceledByUser, toolTip: 'Вы отменили эти заказы' },
  { id: 4, title: OrderStatusEnum.canceledByManufacturer, toolTip: 'Поставщик не готов поставить вам эти заказы' },
  {
    id: 5,
    title: OrderStatusEnum.closedByDate,
    toolTip: 'Заказы истекшие по сроку подтверждения или по дате поставки',
  },
];

const OrderStatusSelector: React.FC = () => {
  const selectedOrderStatusId = useAppSelector(selectorSelectedOrderStatusId);

  const dispatch = useAppDispatch();

  const onSelect = (id: number) => {
    dispatch(setSelectedOrderStatusId(id));
  };

  return (
    <CheckBoxSection title={'Статусы заказов'}>
      {orderStatusOptions.map((orderStatusOption) => (
        <CheckBoxSquare
          key={orderStatusOption.id!}
          id={orderStatusOption.id!}
          title={orderStatusOption.title}
          checked={selectedOrderStatusId === orderStatusOption.id}
          toolTip={orderStatusOption.toolTip}
          toolTipVerticalShift={328}
          onSelect={onSelect}
        />
      ))}
    </CheckBoxSection>
  );
};

export default OrderStatusSelector;
