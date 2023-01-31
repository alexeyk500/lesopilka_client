import React, { useRef, useState } from 'react';
import classes from './AttentionSign.module.css';
import attentionIco from '../../../../../../../../img/attentionIco.svg';
import { OrderType } from '../../../../../../../../types/types';

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

  const [showToolTip, setShowToolTip] = useState(false);

  const timeOutId = useRef<NodeJS.Timeout>();

  const onMouseEnterHandler = () => {
    timeOutId.current = setTimeout(() => {
      setShowToolTip(true);
    }, 500);
  };

  const onMouseLeaveHandler = () => {
    setShowToolTip(false);
    clearTimeout(timeOutId.current);
  };

  return (
    <div className={classes.container} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      {isPresentAttention && isDivergence && <img src={attentionIco} className={classes.ico} alt="attention" />}
      {showToolTip && (
        <div className={classes.toolTip}>
          {divergenceNumber ? `${divergenceNumber} шт - ` : ''}
          {isConfirmation ? 'расхождение с заказом' : 'расхождение с подтверждением'}
        </div>
      )}
    </div>
  );
};

export default AttentionSign;
