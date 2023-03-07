import React from 'react';
import classes from './ManDetailsConclusion.module.css';
import { getTotalLogisticInfo } from '../../../../../../utils/functions';
import { AmountTypeEnum, ProductType } from '../../../../../../types/types';

type PropsType = {
  products: ProductType[];
  amountType: AmountTypeEnum;
};

const ManDetailsConclusion: React.FC<PropsType> = ({ products, amountType }) => {
  let totalWeight;
  let totalVolume;
  let totalCost;
  let logisticInfo;

  if (amountType === AmountTypeEnum.inOrder) {
    logisticInfo = getTotalLogisticInfo(products, AmountTypeEnum.inOrder);
  } else if (amountType === AmountTypeEnum.inConfirmation) {
    logisticInfo = getTotalLogisticInfo(products, AmountTypeEnum.inConfirmation);
  } else if (amountType === AmountTypeEnum.inDivergence) {
    logisticInfo = getTotalLogisticInfo(products, AmountTypeEnum.inDivergence);
  }

  if (logisticInfo) {
    totalWeight = logisticInfo.totalWeight;
    totalVolume = logisticInfo.totalVolume;
    totalCost = logisticInfo.totalCost;
  }

  return (
    <div className={classes.conclusionRow}>
      <div className={classes.allWeightTitle}>{`Вес: ${totalWeight} кг`}</div>
      <div className={classes.allVolumeTitle}>{`Обьем: ${totalVolume} м.куб.`}</div>
      <div className={classes.allCostTitle}>{`Сумма: ${totalCost} руб.`}</div>
    </div>
  );
};

export default ManDetailsConclusion;
