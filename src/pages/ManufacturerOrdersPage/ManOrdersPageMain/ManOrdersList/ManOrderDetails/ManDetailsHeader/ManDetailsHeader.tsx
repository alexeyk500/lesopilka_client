import React from 'react';
import classes from './ManDetailsHeader.module.css';
import { AmountTypeEnum, OrderType } from '../../../../../../types/types';
import ManDetailsHeaderLeftColumn from './ManDetailsHeaderLeftColumn/ManDetailsHeaderLeftColumn';
import ManDetailsHeaderRightColumn from './ManDetailsHeaderRightColumn/ManDetailsHeaderRightColumn';

type PropsType = {
  order: OrderType;
  infoTab: AmountTypeEnum;
  onConfirmClick: () => void;
  onRejectClick: () => void;
};

const ManDetailsHeader: React.FC<PropsType> = ({ order, infoTab, onConfirmClick, onRejectClick }) => {
  return (
    <div className={classes.container}>
      <ManDetailsHeaderLeftColumn order={order} infoTab={infoTab} />
      <ManDetailsHeaderRightColumn
        order={order}
        infoTab={infoTab}
        onConfirmClick={onConfirmClick}
        onRejectClick={onRejectClick}
      />
    </div>
  );
};

export default ManDetailsHeader;
