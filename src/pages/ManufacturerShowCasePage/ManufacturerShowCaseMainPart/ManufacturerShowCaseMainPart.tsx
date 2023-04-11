import React, { useEffect } from 'react';
import classes from './ManufacturerShowCaseMainPart.module.css';
import FiltersRow from '../../UnitedPage/FiltersRow/FiltersRow';
import { checkIsShowFiltersRow } from '../../../utils/functions';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../../UnitedPage/ProductList/ProductList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { getBasketProductsThunk } from '../../../store/basketSlice';
import { getFavoriteProductsThunk } from '../../../store/favoriteSlice';
import { getProductsThunk } from '../../../store/productSlice';
import { selectorProducts } from '../../../store/productsCombineSelector';

const ManufacturerShowCaseMainPart: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const user = useAppSelector(selectorUser);
  const isShowFiltersRow = checkIsShowFiltersRow(searchParams);

  const products = useAppSelector(selectorProducts);

  const isEmptyShowCase = !(products?.length > 0);
  const manufacturerTitle = `${products?.[0]?.manufacturer?.title}, ${products?.[0]?.manufacturer?.address.location.title}`;

  useEffect(() => {
    if (!!searchParams.toString().length) {
      const searchParamsClone = new URLSearchParams(searchParams.toString());
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (user && token) {
        dispatch(getBasketProductsThunk(token));
        dispatch(getFavoriteProductsThunk(token));
      }
      dispatch(getProductsThunk(searchParamsClone));
    }
  }, [dispatch, searchParams, user]);

  return (
    <div className={classes.container}>
      {!isEmptyShowCase && <div className={classes.titleRow}>{manufacturerTitle}</div>}
      {isShowFiltersRow && (
        <div className={classes.filtersRowContainer}>
          <FiltersRow />
        </div>
      )}
      {isEmptyShowCase ? (
        <div className={classes.emptyShowCase}>{'Витрина производителя пуста ...'}</div>
      ) : (
        <ProductList />
      )}
    </div>
  );
};

export default ManufacturerShowCaseMainPart;
