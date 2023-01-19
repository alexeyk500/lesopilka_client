import React, { useEffect, useRef } from 'react';
import classes from './BasketPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import BasketPageSelectors from './BasketPageSelectors/BasketPageSelectors';
import BasketPageMainPart from './BasketPageMainPart/BasketPageMainPart';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import { getBasketProductsThunk, selectorBasketProducts } from '../../store/basketSlice';
import { splitProductsByManufacturer } from '../../utils/productFunctions';

const BasketPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const basketProducts = useAppSelector(selectorBasketProducts);
  const manufacturersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (user && token) {
      dispatch(getBasketProductsThunk(token));
    }
  }, [dispatch, user]);

  const productsByManufacturer = splitProductsByManufacturer(basketProducts);

  return (
    <div className={classes.container}>
      <LeftColumn>
        <BasketPageSelectors productsByManufacturer={productsByManufacturer} manufacturersRef={manufacturersRef} />
      </LeftColumn>
      <BasketPageMainPart productsByManufacturer={productsByManufacturer} manufacturersRef={manufacturersRef} />
    </div>
  );
};

export default BasketPage;
