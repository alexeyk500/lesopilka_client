import React, { useEffect } from 'react';
import classes from './BasketList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import { getBasketProductsThunk, selectorBasketProducts } from '../../../../store/basketSlice';
import OrderToManufacturer from './OrderToManufacturer/OrderToManufacturer';
import { splitProductsByManufacturer } from '../../../../utils/productFunctions';

const BasketList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const basketProducts = useAppSelector(selectorBasketProducts);

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (user && token) {
      dispatch(getBasketProductsThunk(token));
    }
  }, [dispatch, user]);

  const productsByManufacturer = splitProductsByManufacturer(basketProducts);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{'Пиломатериалы по поставщикам'}</div>
      <div className={classes.scrollContainer}>
        {productsByManufacturer.map((products, ind) => (
          <OrderToManufacturer key={ind} products={products} />
        ))}
      </div>
    </div>
  );
};

export default BasketList;
