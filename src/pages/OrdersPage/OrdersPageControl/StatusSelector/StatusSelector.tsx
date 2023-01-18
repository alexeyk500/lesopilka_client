import React from "react";
import classes from './StatusSelector.module.css'
import CheckBoxSquare from "../../../../components/commonComponents/CheckBoxSquare/CheckBoxSquare";
import { OrderStatusEnum } from "../../../../types/types";
import CheckBoxSection from "../../../../components/commonComponents/CheckBoxSection/CheckBoxSection";

const StatusSelector: React.FC = () => {

  const onSelect = (id: number) => {}

  return (
      <CheckBoxSection>
        <CheckBoxSquare
          id={0}
          title={'Все'}
          checked={true}
          onSelect={onSelect}
        />
        <CheckBoxSquare
          id={1}
          title={OrderStatusEnum.onConfirming}
          checked={false}
          onSelect={onSelect}
        />
        <CheckBoxSquare
          id={2}
          title={OrderStatusEnum.onPaymentWaiting}
          checked={false}
          onSelect={onSelect}
        />
        <CheckBoxSquare
          id={3}
          title={OrderStatusEnum.onAssembling}
          checked={false}
          onSelect={onSelect}
        />
        <CheckBoxSquare
          id={4}
          title={OrderStatusEnum.onDelivering}
          checked={false}
          onSelect={onSelect}
        />
        <CheckBoxSquare
          id={5}
          title={OrderStatusEnum.completed}
          checked={false}
          onSelect={onSelect}
        />
      </CheckBoxSection>
  );
};

export default StatusSelector;
