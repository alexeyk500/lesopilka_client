import React, { useEffect } from 'react';
import classes from './MainPage.module.css';
import Catalog from '../../components/Catalog/Catalog';
import { useAppDispatch } from '../../hooks/hooks';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import { getProductsThunk } from '../../store/productSlice';
import FilterSelectors from './FilterSelectors/FilterSelectors';
import MainPageMainPart from './MainPageMainPart/MainPageMainPart';
import { useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../types/types';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const isSearchParams = !!searchParams.toString().length;

  const onClickCatalogCategory = (id: number) => {
    if (id) {
      setSearchParams({ [QueryEnum.CatalogCategory]: id.toString() }, { replace: true });
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
