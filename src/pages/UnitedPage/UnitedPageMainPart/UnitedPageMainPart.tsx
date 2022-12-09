import React from 'react';
import classes from './UnitedPageMainPart.module.css';
import FiltersRow from '../FiltersRow/FiltersRow';
import ProductList from '../ProductList/ProductList';
import { useLocation, useSearchParams } from 'react-router-dom';
import { checkIsShowFiltersRow, checkIsManufacturerPage } from '../../../utils/functions';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumps';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { CrumbType } from '../../../types/types';
import { getManufacturerOrUserName } from '../../UserPage/UserPage';
import { PageEnum } from '../../../components/AppRouter/AppRouter';

const UnitedPageMainPart = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const user = useAppSelector(selectorUser);
  const isManufacturerPage = checkIsManufacturerPage(location);
  const isShowFiltersRow = checkIsShowFiltersRow(searchParams);
  const crumbs: CrumbType[] = [
    { title: getManufacturerOrUserName(user), route: PageEnum.RootPage },
    { title: 'Каталог Товаров' },
  ];

  return (
    <div className={classes.container}>
      {isManufacturerPage ? (
        <>
          <div className={classes.filtersRowContainer}>
            <BreadCrumbs crumbs={crumbs} />
          </div>
          <div className={classes.filtersRowContainer}>{isShowFiltersRow && <FiltersRow isSalesPage />}</div>
        </>
      ) : (
        isShowFiltersRow && (
          <div className={classes.filtersRowContainer}>
            <FiltersRow />
          </div>
        )
      )}
      <ProductList />
    </div>
  );
};

export default UnitedPageMainPart;
