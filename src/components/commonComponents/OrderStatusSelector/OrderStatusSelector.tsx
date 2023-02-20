import React from 'react';
import CheckBoxSquare from '../CheckBoxSquare/CheckBoxSquare';
import { OptionsType } from '../../../types/types';
import CheckBoxSection from '../CheckBoxSection/CheckBoxSection';

type PropsType = {
  orderStatusOptions: OptionsType[];
  selectedOrderStatusId: number;
  onSelectOrderStatusId: (id: number) => void;
};

const OrderStatusSelector: React.FC<PropsType> = ({
  orderStatusOptions,
  selectedOrderStatusId,
  onSelectOrderStatusId,
}) => {
  const onSelect = (id: number) => {
    onSelectOrderStatusId(id);
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
