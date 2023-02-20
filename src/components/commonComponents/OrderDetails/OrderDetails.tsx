import React, { useState } from 'react';
import classes from './OrderDetails.module.css';
import { AmountTypeEnum, OrderType, ProductType } from '../../../types/types';
import OrderProductsList from '../../../pages/BasketPage/BasketPageMainPart/BasketList/OrderToManufacturer/OrderProductsList/OrderProductsList';
import InfoTabSelector from './InfoTabSelector/InfoTabSelector';
import DetailsHeader from './InfoTabSelector/DetailsHeader/DetailsHeader';
import DetailsConclusion from './InfoTabSelector/DetailsConclusion/DetailsConclusion';
import { getProductsAllAmountsType } from '../../../utils/ordersFunctions';

type PropsType = {
  order: OrderType;
};

const getIsShowNoConfirmation = (order: OrderType, amountType: AmountTypeEnum) => {
  if (amountType === AmountTypeEnum.inOrder || amountType === AmountTypeEnum.inBasket) {
    return false;
  } else {
    return !order.confirmedProducts?.length;
  }
};

const getIsShowNoDivergenceInOrder = (products: ProductType[], amountType: AmountTypeEnum) => {
  if (amountType === AmountTypeEnum.inDivergence) {
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product.amountInDivergence && product.amountInDivergence > 0) {
        return false;
      }
    }
    return true;
  }
  return false;
};

const OrderDetails: React.FC<PropsType> = ({ order }) => {
  const [amountType, setAmountType] = useState(AmountTypeEnum.inOrder);
  const products = getProductsAllAmountsType(order);

  const isShowNoConfirmation = getIsShowNoConfirmation(order, amountType);

  const isShowNoDivergenceInOrder = getIsShowNoDivergenceInOrder(products, amountType);

  return (
    <div className={classes.container}>
      <InfoTabSelector infoTab={amountType} setInfoTab={setAmountType} />
      {isShowNoConfirmation ? (
        <div className={classes.noConfirmationTitle}>Подтверждение заказа от поставщика еще не получено</div>
      ) : (
        <>
          {isShowNoDivergenceInOrder ? (
            <div className={classes.noDivergenceTitle}>Расхождений в Заказе и Подтверждении нет</div>
          ) : (
            <>
              <DetailsHeader order={order} infoTab={amountType} />
              <div className={classes.delimiter} />
              <OrderProductsList products={products} amountType={amountType} />
              <div className={classes.delimiter} />
              <DetailsConclusion products={products} amountType={amountType} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
