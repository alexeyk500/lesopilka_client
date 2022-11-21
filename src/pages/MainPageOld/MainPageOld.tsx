import React, { useEffect } from 'react';
import classes from './MainPageOld.module.css';
import Catalog from '../../components/Catalog/Catalog';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import FilterSelectors from '../UnitedPage/FilterSelectors/FilterSelectors';
import UnitedPageMainPart from '../UnitedPage/UnitedPageMainPart/UnitedPageMainPart';
import { useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../types/types';
import { isFiltersSearchParams } from '../../utils/functions';
import { getProductsThunk } from '../../store/productSlice';
import { useAppDispatch } from '../../hooks/hooks';

const MainPageOld: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isSearchParams = isFiltersSearchParams(searchParams);

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
      <UnitedPageMainPart />
    </div>
  );
};

export default MainPageOld;
