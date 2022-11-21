import React, { useEffect } from 'react';
import classes from './UnitedPage.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getProductsThunk, selectorProductsLoading } from '../../store/productSlice';
import { useLocation, useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../types/types';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import FilterSelectors from '../MainPageOld/FilterSelectors/FilterSelectors';
import Catalog from '../../components/Catalog/Catalog';
import MainPageMainPart from '../MainPageOld/MainPageMainPart/MainPageMainPart';
import { checkIsOnlyPlaceFiltersInSearchParams } from '../../utils/functions';
import Preloader from '../../components/Preloader/Preloader';

const UnitedPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectorProductsLoading);
  const [searchParams, setSearchParams] = useSearchParams();

  const isManufacturerPage = location.pathname.includes('sales');
  const isOnlyPlaceFilters = checkIsOnlyPlaceFiltersInSearchParams(searchParams);

  console.log('isManufacturerPage =', isManufacturerPage);

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
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {isOnlyPlaceFilters ? (
            <LeftColumn title={'Каталог'}>
              <Catalog onClickCatalogCategory={onClickCatalogCategory} />
            </LeftColumn>
          ) : (
            <LeftColumn title={'Фильтры поиска'}>
              <FilterSelectors />
            </LeftColumn>
          )}
          <MainPageMainPart />
        </>
      )}
    </div>
  );
};

export default UnitedPage;
