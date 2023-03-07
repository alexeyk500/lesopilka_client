import React, { useState } from 'react';
import classes from './ManOrderDetails.module.css';
import { AmountTypeEnum, OrderType, ProductType } from '../../../../../types/types';
import OrderProductsList from '../../../../../pages/BasketPage/BasketPageMainPart/BasketList/OrderToManufacturer/OrderProductsList/OrderProductsList';
import InfoTabSelector from '../../../../../components/commonComponents/InfoTabSelector/InfoTabSelector';
import ManDetailsHeader from './ManDetailsHeader/ManDetailsHeader';
import ManDetailsConclusion from './ManDetailsConclusion/ManDetailsConclusion';
import { getProductsAllAmountsType } from '../../../../../utils/ordersFunctions';

type PropsType = {
  order: OrderType;
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

const ManOrderDetails: React.FC<PropsType> = ({ order }) => {
  const [amountType, setAmountType] = useState(AmountTypeEnum.inConfirmation);
  const products = getProductsAllAmountsType(order);

  const isShowNoDivergenceInOrder = getIsShowNoDivergenceInOrder(products, amountType);

  return (
    <div className={classes.container}>
      <InfoTabSelector infoTab={amountType} setInfoTab={setAmountType} isOrderForManufacturer />
      {isShowNoDivergenceInOrder ? (
        <div className={classes.noDivergenceTitle}>Расхождений в Заказе и Подтверждении нет</div>
      ) : (
        <>
          <ManDetailsHeader order={order} infoTab={amountType} />
          <div className={classes.delimiter} />
          <OrderProductsList products={products} amountType={amountType} />
          <div className={classes.delimiter} />
          <ManDetailsConclusion products={products} amountType={amountType} />
        </>
      )}
    </div>
  );
};

export default ManOrderDetails;
