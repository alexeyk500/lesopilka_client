import React from 'react';
import classes from './ManDetailsHeader.module.css';
import { AmountTypeEnum, OrderType } from '../../../../../../types/types';
import ManDetailsHeaderLeftColumn from './ManDetailsHeaderLeftColumn/ManDetailsHeaderLeftColumn';
import ManDetailsHeaderRightColumn from './ManDetailsHeaderRightColumn/ManDetailsHeaderRightColumn';

type PropsType = {
  order: OrderType;
  infoTab: AmountTypeEnum;
};

const ManDetailsHeader: React.FC<PropsType> = ({ order, infoTab }) => {
  return (
    <div className={classes.container}>
      <ManDetailsHeaderLeftColumn order={order} infoTab={infoTab} />
      <ManDetailsHeaderRightColumn order={order} infoTab={infoTab} />
    </div>
  );
};

export default ManDetailsHeader;
