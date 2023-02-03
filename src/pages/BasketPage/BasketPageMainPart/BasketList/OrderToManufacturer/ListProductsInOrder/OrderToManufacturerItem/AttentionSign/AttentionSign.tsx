import React from 'react';
import classes from './AttentionSign.module.css';
import attentionIco from '../../../../../../../../img/attentionIco.svg';
import { OrderType } from '../../../../../../../../types/types';
import ToolTip from '../../../../../../../../components/commonComponents/ToolTip/ToolTip';

type PropsType = {
  productId: number | undefined;
  order?: OrderType;
  onlyView?: boolean;
  isConfirmation?: boolean;
};

const checkIsDivergence = (productId?: number, order?: OrderType) => {
  if (order && productId) {
    const orderProduct = order.products.find((product) => product.id === productId);
    const confirmedProduct = order.confirmedProducts?.find((product) => product.confirmedProductId === productId);
    if (orderProduct && confirmedProduct) {
      if (orderProduct.amountInOrder !== confirmedProduct.amountInConfirmation) {
        if (
          typeof orderProduct.amountInOrder !== 'undefined' &&
          typeof confirmedProduct.amountInConfirmation !== 'undefined'
        ) {
          const divergence = orderProduct.amountInOrder - confirmedProduct.amountInConfirmation;
          if (divergence > 0) {
            return divergence;
          }
          return true;
        }
      }
    }
  }
  return false;
};

const AttentionSign: React.FC<PropsType> = ({ productId, order, onlyView, isConfirmation }) => {
  const isPresentAttention = onlyView ? true : isConfirmation ? true : false;
  const isDivergence = checkIsDivergence(productId, order);
  const divergenceNumber = typeof isDivergence === 'boolean' ? undefined : isDivergence;

  const text =
    (divergenceNumber ? `${divergenceNumber} шт - ` : '') +
    (isConfirmation ? 'расхождение с заказом' : 'расхождение с подтверждением');

  return (
    <ToolTip text={text} customClass={classes.customToolTip}>
      <div className={classes.container}>
        {isPresentAttention && isDivergence && <img src={attentionIco} className={classes.ico} alt="attention" />}
      </div>
    </ToolTip>
  );
};

export default AttentionSign;
