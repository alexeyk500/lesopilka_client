import React, { useEffect } from 'react';
import classes from './MainPage.module.css';
import Catalog from '../../components/Catalog/Catalog';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import FilterSelectors from './FilterSelectors/FilterSelectors';
import MainPageMainPart from './MainPageMainPart/MainPageMainPart';
import { useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../types/types';
import { isSearchParamsExceptSridAndSlid } from '../../utils/functions';
import { getProductsThunk } from '../../store/productSlice';
import { useAppDispatch } from '../../hooks/hooks';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isSearchParams = isSearchParamsExceptSridAndSlid(searchParams);

  const onClickCatalogCategory = (id: number) => {
    if (id) {
      searchParams.set(QueryEnum.CatalogCategory, id.toString());
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    dispatch(getProductsThunk(searchParams));
  }, [dispatch, searchParams]);

  return (
    <div className={classes.container}>
      <LeftColumn>
        {isSearchParams ? <FilterSelectors /> : <Catalog onClickCatalogCategory={onClickCatalogCategory} />}
      </LeftColumn>
      <MainPageMainPart />
    </div>
  );
};

export default MainPage;
