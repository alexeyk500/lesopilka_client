import React from 'react';
import classes from './UnitedPageMainPart.module.css';
import FiltersRow from '../FiltersRow/FiltersRow';
import ProductList from '../ProductList/ProductList';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  checkIsOnlyManufacturerFiltersInSearchParams,
  checkIsSalesPage,
  isFiltersSearchParams,
} from '../../../utils/functions';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumps';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { CrumbType } from '../../../types/types';
import { getUserName } from '../../UserPage/UserPage';

const UnitedPageMainPart = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const user = useAppSelector(selectorUser);
  const isSearchParams = isFiltersSearchParams(searchParams);

  const isSalesPage = checkIsSalesPage(location);
  const crumbs: CrumbType[] = [{ title: getUserName(user), route: '/' }, { title: 'Каталог Товаров' }];
  const checkIsOnlyManufacturerFilters = checkIsOnlyManufacturerFiltersInSearchParams(searchParams);

  return (
    <div className={classes.container}>
      {isSalesPage ? (
        <>
          <div className={classes.filtersRowContainer}>
            <BreadCrumbs crumbs={crumbs} />
          </div>
          <div className={classes.filtersRowContainer}>
            {!checkIsOnlyManufacturerFilters && isSearchParams && <FiltersRow isSalesPage />}
          </div>
        </>
      ) : (
        <div className={classes.filtersRowContainer}>{isSearchParams && <FiltersRow />}</div>
      )}
      <div className={classes.filtersProductListContainer}>
        <ProductList />
      </div>
    </div>
  );
};

export default UnitedPageMainPart;
