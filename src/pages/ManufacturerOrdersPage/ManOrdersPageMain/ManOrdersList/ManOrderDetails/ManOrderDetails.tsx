import React, { useEffect, useState } from 'react';
import classes from './ManOrderDetails.module.css';
import { AmountTypeEnum, OrderType, ProductType } from '../../../../../types/types';
import InfoTabSelector from '../../../../../components/commonComponents/InfoTabSelector/InfoTabSelector';
import ManDetailsHeader from './ManDetailsHeader/ManDetailsHeader';
import ManDetailsConclusion from './ManDetailsConclusion/ManDetailsConclusion';
import { getIsArchivedOrder, getProductsAllAmountsType } from '../../../../../utils/ordersFunctions';
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
  const productsStore = getProductsAllAmountsType(order);
  const [confirmationProducts, setConfirmationProducts] = useState<ProductType[] | undefined>(undefined);
  const products = confirmationProducts ? confirmationProducts : productsStore;

  const isShowNoDivergenceInOrder = getIsShowNoDivergenceInOrder(products, amountType);

  const isConfirmedOrder = !!order.order.manufacturerConfirmedDate;
  const isConfirmationTab = amountType === AmountTypeEnum.inConfirmation;
  const isArchivedOrder = getIsArchivedOrder(order);

  const isSetConfirmationProducts = isConfirmationTab && !isConfirmedOrder && !isArchivedOrder && !confirmationProducts;

  useEffect(() => {
    if (isSetConfirmationProducts) {
      const transformedProducts = products.map((product) => {
        return { ...product, amountInConfirmation: product.amountInOrder, amountInDivergence: 0 };
      });
      setConfirmationProducts(transformedProducts);
    }
  }, [products, setConfirmationProducts, isSetConfirmationProducts]);

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
            products={products}
            amountType={amountType}
            setConfirmationProducts={setConfirmationProducts}
          />
          <div className={classes.delimiter} />
          <ManDetailsConclusion products={products} amountType={amountType} />
        </>
      )}
    </div>
  );
};

export default ManOrderDetails;
