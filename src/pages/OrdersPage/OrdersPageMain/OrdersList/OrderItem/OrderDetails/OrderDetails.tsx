import React, { useState } from 'react';
import classes from './OrderDetails.module.css';
import { OrderType, ProductType } from '../../../../../../types/types';
import OrderProductsList from '../../../../../BasketPage/BasketPageMainPart/BasketList/OrderToManufacturer/OrderProductsList/OrderProductsList';
import InfoTabSelector, { InfoTabSelectorEnum } from './InfoTabSelector/InfoTabSelector';
import DetailsHeader from './InfoTabSelector/DetailsHeader/DetailsHeader';
import DetailsConclusion from './InfoTabSelector/DetailsConclusion/DetailsConclusion';

type PropsType = {
  order: OrderType;
};

const getProductsForInfoTab = (order: OrderType, infoTab: InfoTabSelectorEnum): ProductType[] => {
  if (infoTab === InfoTabSelectorEnum.order) {
    return order.products;
  }
  if (infoTab === InfoTabSelectorEnum.confirmation && order.confirmedProducts) {
    return order.confirmedProducts;
  }
  if (infoTab === InfoTabSelectorEnum.divergence && order.confirmedProducts) {
    return order.confirmedProducts;
  }
  return [];
};

const OrderDetails: React.FC<PropsType> = ({ order }) => {
  const [infoTab, setInfoTab] = useState(InfoTabSelectorEnum.order);

  const products = getProductsForInfoTab(order, infoTab);

  return (
    <div className={classes.container}>
      <div className={classes.delimiterDotted} />
      <InfoTabSelector infoTab={infoTab} setInfoTab={setInfoTab} />
      <DetailsHeader order={order} infoTab={infoTab} />
      <div className={classes.delimiter} />
      <OrderProductsList products={products} order={order} infoTab={infoTab} />
      <div className={classes.delimiter} />
      <DetailsConclusion order={order} infoTab={infoTab} />
    </div>
  );
};

export default OrderDetails;
