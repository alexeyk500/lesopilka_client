import React from 'react';
import classes from './AttentionSign.module.css';
import attentionIco from '../../../../../../../../img/attentionIco.svg';
import { AmountTypeEnum, ProductType } from '../../../../../../../../types/types';
import ToolTip from '../../../../../../../../components/commonComponents/ToolTip/ToolTip';

type PropsType = {
  product: ProductType;
  amountType: AmountTypeEnum;
};

const AttentionSign: React.FC<PropsType> = ({ product, amountType }) => {
  const showAttention = amountType !== AmountTypeEnum.inBasket;
  const amountInDivergence = product.amountInDivergence ? product.amountInDivergence : 0;

  const text =
    (amountInDivergence ? `${amountInDivergence} шт - ` : '') +
    (amountType === AmountTypeEnum.inOrder ? 'расхождение с подтверждением' : 'расхождение с заказом');

  return (
    <ToolTip text={text} customClass={classes.customToolTip}>
      <div className={classes.container}>
        {showAttention && amountInDivergence !== 0 && (
          <img src={attentionIco} className={classes.ico} alt="attention" />
        )}
      </div>
    </ToolTip>
  );
};

export default AttentionSign;
