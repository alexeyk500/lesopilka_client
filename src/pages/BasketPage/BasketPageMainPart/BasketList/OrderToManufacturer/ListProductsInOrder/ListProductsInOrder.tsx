import React from 'react';
import classes from './ListProductsInOrder.module.css';
import OrderToManufacturerItem from './OrderToManufacturerItem/OrderToManufacturerItem';
import { sortProducts } from '../../../../../../utils/productFunctions';
import { ProductType } from '../../../../../../types/types';
import { useAppSelector } from '../../../../../../hooks/hooks';
import { selectorSubCategories } from '../../../../../../store/catalogSlice';

type PropsType = {
  products: ProductType[];
  onlyView?: boolean;
};

const ListProductsInOrder: React.FC<PropsType> = ({ products, onlyView }) => {
  const subCategories = useAppSelector(selectorSubCategories);
  const sortedProducts = sortProducts(products, subCategories);

  return (
    <div className={classes.priceContentContainer}>
      {sortedProducts.map((product, ind) => {
        return <OrderToManufacturerItem key={ind} num={ind + 1} product={product} onlyView={onlyView} />;
      })}
    </div>
  );
};

export default ListProductsInOrder;
