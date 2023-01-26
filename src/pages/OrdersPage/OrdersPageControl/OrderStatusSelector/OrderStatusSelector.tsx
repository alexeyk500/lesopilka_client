import React from 'react';
import CheckBoxSquare from '../../../../components/commonComponents/CheckBoxSquare/CheckBoxSquare';
import { OptionsType, OrderStatusEnum } from '../../../../types/types';
import CheckBoxSection from '../../../../components/commonComponents/CheckBoxSection/CheckBoxSection';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorSelectedOrderStatusId, setSelectedOrderStatusId } from '../../../../store/ordersSlice';

export const orderStatusOptions: OptionsType[] = [
  { id: 0, title: 'Все', toolTip: 'Все ваши заказы' },
  { id: 1, title: OrderStatusEnum.onConfirming, toolTip: 'Ожидайте, поставщик готовит вам счет на эти заказы' },
  { id: 2, title: OrderStatusEnum.onPaymentWaiting, toolTip: 'Заказы которые ожидают Вашей оплаты' },
  { id: 3, title: OrderStatusEnum.onAssembling, toolTip: 'Заказы которые поставщик комплектует и готовит к отправке' },
  { id: 4, title: OrderStatusEnum.onDelivering, toolTip: 'Заказы котрые уже к вам в пути' },
  { id: 5, title: OrderStatusEnum.completed, toolTip: 'Ваши завершенные заказы' },
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
