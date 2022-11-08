import React from 'react';
import classes from './SalesCardList.module.css';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorProducts } from '../../../../store/productSlice';
import { makeProductCardData } from '../../../../utils/functions';
import {useNavigate} from "react-router-dom";

const SalesCardList = () => {
  const navigate = useNavigate();
  const products = useAppSelector(selectorProducts);

  const onClick = (id: number) => {
    console.log('onClick =', id);
    navigate(`/edit_card/${id}`)
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
