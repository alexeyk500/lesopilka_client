import React from 'react';
import classes from './AttentionSign.module.css';
import attentionIco from '../../../../../../../../img/attentionIco.svg';
import { OrderType } from '../../../../../../../../types/types';
import ToolTip from '../../../../../../../../components/commonComponents/ToolTip/ToolTip';
import { checkIsDivergenceByProductId } from '../../../../../../../../utils/ordersFunctions';

type PropsType = {
  productId: number | undefined;
  order?: OrderType;
  onlyView?: boolean;
  isConfirmation?: boolean;
  isDivergence?: boolean;
};

const AttentionSign: React.FC<PropsType> = ({ productId, order, onlyView, isConfirmation, isDivergence }) => {
  const isPresentAttention = onlyView ? true : isConfirmation ? true : isDivergence ? true : false;
  const isProductDivergence = checkIsDivergenceByProductId(productId, order);
  const divergenceAmount = typeof isProductDivergence === 'boolean' ? undefined : isProductDivergence;

  const text =
    (divergenceAmount ? `${divergenceAmount} шт - ` : '') +
    (isConfirmation
      ? 'расхождение с заказом'
      : isDivergence
      ? 'расхождение с заказом'
      : 'расхождение с подтверждением');

  return (
    <ToolTip text={text} customClass={classes.customToolTip}>
      <div className={classes.container}>
        {isPresentAttention && isProductDivergence && (
          <img src={attentionIco} className={classes.ico} alt="attention" />
        )}
      </div>
    </ToolTip>
  );
};

export default AttentionSign;
