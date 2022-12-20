import React, { useEffect } from 'react';
import classes from './BasketList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import { getBasketProductsThunk, selectorBasketProducts } from '../../../../store/basketSlice';
import OrderToManufacturer from './OrderToManufacturer/OrderToManufacturer';

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

  return (
    <div className={classes.container}>
      <div className={classes.title}>{'Заказы по производителям'}</div>
      <div className={classes.scrollContainer}>
        <OrderToManufacturer products={basketProducts} />
      </div>
    </div>
  );
};

export default BasketList;
