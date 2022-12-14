import React from 'react';
import classes from './PricePageMainPart.module.css';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumps';
import { useLocation } from 'react-router-dom';
import { checkIsManufacturerPage, getBackwardRouteToManufacturerCatalog } from '../../../utils/functions';
import { CrumbType } from '../../../types/types';
import { getManufacturerOrUserName } from '../../UserPage/UserPage';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { selectorCatalogSearchParams } from '../../../store/productSlice';
import PriceList from './PriceList/PriceList';

const PricePageMainPart: React.FC = () => {
  const location = useLocation();
  const user = useAppSelector(selectorUser);
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);

  const isManufacturerPage = checkIsManufacturerPage(location);

  const getBackwardRoute = getBackwardRouteToManufacturerCatalog(user?.manufacturer?.id, catalogSearchParams);
  const crumbs: CrumbType[] = [
    { title: getManufacturerOrUserName(user) },
    { title: 'Каталог', route: getBackwardRoute },
    { title: 'Прайс лист' },
  ];

  return (
    <div className={classes.container}>
      {isManufacturerPage && (
        <div className={classes.rowContainer}>
          <BreadCrumbs crumbs={crumbs} />
        </div>
      )}
      <PriceList />
    </div>
  );
};

export default PricePageMainPart;
