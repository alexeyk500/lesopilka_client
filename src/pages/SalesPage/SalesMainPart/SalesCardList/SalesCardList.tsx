import React from 'react';
import classes from './SalesCardList.module.css';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorProducts } from '../../../../store/productSlice';
import { makeProductCardData } from '../../../../utils/functions';

const SalesCardList = () => {
  const products = useAppSelector(selectorProducts);

  const onClick = (id: number) => {
    console.log('onClick =', id);
  };

  return (
    <div className={classes.container}>
      <ProductCard isAddProductCard />
      {products.map((product) => (
        <ProductCard
          key={product.id}
          productCardData={makeProductCardData(product)}
          onClick={onClick}
          isManufacturerProductCard
        />
      ))}
    </div>
  );
};

export default SalesCardList;
