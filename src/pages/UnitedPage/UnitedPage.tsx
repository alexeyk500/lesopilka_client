import React, { useEffect } from 'react';
import classes from './UnitedPage.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getProductsThunk } from '../../store/productSlice';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PageTypeEnum, QueryEnum } from '../../types/types';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import FilterSelectors from './FilterSelectors/FilterSelectors';
import Catalog from '../../components/Catalog/Catalog';
import UnitedPageMainPart from './UnitedPageMainPart/UnitedPageMainPart';
import { checkIsManufacturerPage, checkIsShowFilterSelectors } from '../../utils/functions';
import { getBasketProductsThunk } from '../../store/basketSlice';
import { selectorUser } from '../../store/userSlice';
import { getFavoriteProductsThunk } from '../../store/favoriteSlice';

const UnitedPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const isManufacturerPage = checkIsManufacturerPage(location);
  const isShowFilterSelectors = checkIsShowFilterSelectors(searchParams);

  const user = useAppSelector(selectorUser);

  useEffect(() => {
    if (!!searchParams.toString().length) {
      const searchParamsClone = new URLSearchParams(searchParams.toString());
      if (isManufacturerPage) {
        searchParamsClone.append(QueryEnum.PageType, PageTypeEnum.manufacturerPage);
      }
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (user && token) {
        dispatch(getBasketProductsThunk(token));
        dispatch(getFavoriteProductsThunk(token));
      }
      dispatch(getProductsThunk(searchParamsClone));
    }
  }, [dispatch, searchParams, isManufacturerPage, user]);

  const onClickCatalogCategory = (id: number) => {
    if (id) {
      searchParams.set(QueryEnum.CatalogCategory, id.toString());
      setSearchParams(searchParams);
    }
  };

  return (
    <div className={classes.container}>
      {isShowFilterSelectors ? (
        <LeftColumn title={'Фильтры поиска'} hasScroll>
          <FilterSelectors />
        </LeftColumn>
      ) : (
        <LeftColumn title={'Каталог'} hasScroll>
          <Catalog onClickCatalogCategory={onClickCatalogCategory} />
        </LeftColumn>
      )}
      <UnitedPageMainPart />
    </div>
  );
};

export default UnitedPage;
