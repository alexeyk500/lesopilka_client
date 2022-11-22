import React, { useEffect } from 'react';
import classes from './UnitedPage.module.css';
import { useAppDispatch } from '../../hooks/hooks';
import { getProductsThunk } from '../../store/productSlice';
import { useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../types/types';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import FilterSelectors from './FilterSelectors/FilterSelectors';
import Catalog from '../../components/Catalog/Catalog';
import UnitedPageMainPart from './UnitedPageMainPart/UnitedPageMainPart';
import { checkIsOnlyPlaceFiltersInSearchParams } from '../../utils/functions';

const UnitedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const isOnlyPlaceFilters = checkIsOnlyPlaceFiltersInSearchParams(searchParams);

  useEffect(() => {
    if (!!searchParams.toString().length) {
      console.log('searchParams =', searchParams.toString());
      dispatch(getProductsThunk(searchParams));
    }
  }, [dispatch, searchParams]);

  const onClickCatalogCategory = (id: number) => {
    if (id) {
      searchParams.set(QueryEnum.CatalogCategory, id.toString());
      setSearchParams(searchParams);
    }
  };

  return (
    <div className={classes.container}>
      {isOnlyPlaceFilters ? (
        <LeftColumn title={'Каталог'}>
          <Catalog onClickCatalogCategory={onClickCatalogCategory} />
        </LeftColumn>
      ) : (
        <LeftColumn title={'Фильтры поиска'}>
          <FilterSelectors />
        </LeftColumn>
      )}
      <UnitedPageMainPart />
    </div>
  );
};

export default UnitedPage;
