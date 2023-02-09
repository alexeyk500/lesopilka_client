import React from 'react';
import classes from './DetailsConclusion.module.css';
import { getTotalLogisticInfo } from '../../../../../../../../utils/functions';
import { getProductDivergence } from '../../../../../../../../utils/ordersFunctions';
import { OrderType } from '../../../../../../../../types/types';
import { InfoTabSelectorEnum } from '../InfoTabSelector';

type PropsType = {
  order: OrderType;
  infoTab: InfoTabSelectorEnum;
};

const DetailsConclusion: React.FC<PropsType> = ({ order, infoTab }) => {
  let totalWeight;
  let totalVolume;
  let totalCost;
  let logisticInfo;

  if (infoTab === InfoTabSelectorEnum.confirmation) {
    if (order.confirmedProducts) {
      logisticInfo = getTotalLogisticInfo(order.confirmedProducts);
    }
  } else if (infoTab === InfoTabSelectorEnum.divergence) {
    if (order.confirmedProducts) {
      logisticInfo = getTotalLogisticInfo(order.confirmedProducts);
      const divergentProducts = getProductDivergence(order);
      logisticInfo = getTotalLogisticInfo(divergentProducts);
    }
  } else {
    logisticInfo = getTotalLogisticInfo(order.products);
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

export default DetailsConclusion;
