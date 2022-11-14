import React from 'react';
import classes from './SalesCardList.module.css';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorProducts, setCatalogSearchParams } from '../../../../store/productSlice';
import { makeProductCardData } from '../../../../utils/functions';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SalesCardList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const products = useAppSelector(selectorProducts);

  const onClick = (id: number) => {
    navigate(`/edit_card/${id}`);
    console.log('searchParams =', searchParams.toString());
    dispatch(setCatalogSearchParams(searchParams.toString()));
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
