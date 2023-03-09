import React, { useState } from 'react';
import classes from './ManOrderDetails.module.css';
import { AmountTypeEnum, OrderType, ProductType } from '../../../../../types/types';
import InfoTabSelector from '../../../../../components/commonComponents/InfoTabSelector/InfoTabSelector';
import ManDetailsHeader from './ManDetailsHeader/ManDetailsHeader';
import ManDetailsConclusion from './ManDetailsConclusion/ManDetailsConclusion';
import { getProductsAllAmountsType } from '../../../../../utils/ordersFunctions';
import ManOrderProductsList from './ManOrderProductsList/ManOrderProductsList';

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
  const [confirmationProducts, setConfirmationProducts] = useState<ProductType[] | undefined>(undefined);

  const isShowNoDivergenceInOrder = getIsShowNoDivergenceInOrder(
    confirmationProducts ? confirmationProducts : products,
    amountType
  );

  return (
    <div className={classes.container}>
      <InfoTabSelector infoTab={amountType} setInfoTab={setAmountType} isOrderForManufacturer />
      {isShowNoDivergenceInOrder ? (
        <div className={classes.noDivergenceTitle}>Расхождений в Подтверждении и Заказе нет</div>
      ) : (
        <>
          <ManDetailsHeader order={order} infoTab={amountType} />
          <div className={classes.delimiter} />
          <ManOrderProductsList
            order={order}
            products={confirmationProducts ? confirmationProducts : products}
            amountType={amountType}
            confirmationProducts={confirmationProducts}
            setConfirmationProducts={setConfirmationProducts}
          />
          <div className={classes.delimiter} />
          <ManDetailsConclusion
            products={confirmationProducts ? confirmationProducts : products}
            amountType={amountType}
          />
        </>
      )}
    </div>
  );
};

export default ManOrderDetails;
