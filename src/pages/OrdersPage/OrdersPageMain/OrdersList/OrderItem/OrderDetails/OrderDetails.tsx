import React, { useState } from 'react';
import classes from './OrderDetails.module.css';
import { AmountTypeEnum, OrderType } from '../../../../../../types/types';
import OrderProductsList from '../../../../../BasketPage/BasketPageMainPart/BasketList/OrderToManufacturer/OrderProductsList/OrderProductsList';
import InfoTabSelector from './InfoTabSelector/InfoTabSelector';
import DetailsHeader from './InfoTabSelector/DetailsHeader/DetailsHeader';
import DetailsConclusion from './InfoTabSelector/DetailsConclusion/DetailsConclusion';
import { getProductsAllAmountsType } from '../../../../../../utils/ordersFunctions';

type PropsType = {
  order: OrderType;
};

const OrderDetails: React.FC<PropsType> = ({ order }) => {
  const [amountType, setAmountType] = useState(AmountTypeEnum.inOrder);

  const products = getProductsAllAmountsType(order);

  return (
    <div className={classes.container}>
      <div className={classes.delimiterDotted} />
      <InfoTabSelector infoTab={amountType} setInfoTab={setAmountType} />
      <DetailsHeader order={order} infoTab={amountType} />
      <div className={classes.delimiter} />
      <OrderProductsList products={products} amountType={amountType} />
      <div className={classes.delimiter} />
      <DetailsConclusion products={products} amountType={amountType} />
    </div>
  );
};

export default OrderDetails;
