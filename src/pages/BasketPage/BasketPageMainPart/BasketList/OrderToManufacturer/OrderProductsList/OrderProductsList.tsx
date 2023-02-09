import React from 'react';
import classes from './OrderProductsList.module.css';
import OrderToManufacturerItem from './OrderToManufacturerItem/OrderToManufacturerItem';
import { sortProducts } from '../../../../../../utils/productFunctions';
import { OrderType, ProductType } from '../../../../../../types/types';
import { useAppSelector } from '../../../../../../hooks/hooks';
import { selectorSubCategories } from '../../../../../../store/catalogSlice';
import { InfoTabSelectorEnum } from '../../../../../OrdersPage/OrdersPageMain/OrdersList/OrderItem/OrderDetails/InfoTabSelector/InfoTabSelector';

type PropsType = {
  products: ProductType[];
  order?: OrderType;
  infoTab?: InfoTabSelectorEnum;
};

const OrderProductsList: React.FC<PropsType> = ({ products, order, infoTab }) => {
  const subCategories = useAppSelector(selectorSubCategories);
  const sortedProducts = sortProducts(products, subCategories);

  return (
    <div className={classes.priceContentContainer}>
      {sortedProducts.map((product, ind) => {
        return (
          <OrderToManufacturerItem
            key={ind}
            num={ind + 1}
            product={product}
            onlyView={infoTab === InfoTabSelectorEnum.order}
            isConfirmation={infoTab === InfoTabSelectorEnum.confirmation}
            isDivergence={infoTab === InfoTabSelectorEnum.divergence}
            order={order}
          />
        );
      })}
    </div>
  );
};

export default OrderProductsList;
