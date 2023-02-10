import React from 'react';
import classes from './OrderProductsList.module.css';
import OrderToManufacturerItem from './OrderToManufacturerItem/OrderToManufacturerItem';
import { sortProducts } from '../../../../../../utils/productFunctions';
import { AmountTypeEnum, ProductType, SubCategoryType } from '../../../../../../types/types';
import { useAppSelector } from '../../../../../../hooks/hooks';
import { selectorSubCategories } from '../../../../../../store/catalogSlice';

type PropsType = {
  products: ProductType[];
  amountType: AmountTypeEnum;
};

const getProductsToShow = (products: ProductType[], amountType: AmountTypeEnum, subCategories: SubCategoryType[]) => {
  if (amountType === AmountTypeEnum.inDivergence) {
    const productsWithDivergence = products.filter(
      (product) => product.amountInDivergence && product.amountInDivergence > 0
    );
    return sortProducts(productsWithDivergence, subCategories);
  }
  return sortProducts(products, subCategories);
};

const OrderProductsList: React.FC<PropsType> = ({ products, amountType }) => {
  const subCategories = useAppSelector(selectorSubCategories);
  const productsToShow = getProductsToShow(products, amountType, subCategories);

  return (
    <div className={classes.priceContentContainer}>
      {productsToShow.map((product, ind) => {
        return <OrderToManufacturerItem key={ind} num={ind + 1} product={product} amountType={amountType} />;
      })}
    </div>
  );
};

export default OrderProductsList;
