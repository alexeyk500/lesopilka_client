import React from 'react';
import classes from './EditCardMainPart.module.css';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumps';
import ProductDetails from './ProductDetails/ProductDetails';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { CrumbType } from '../../../types/types';
import { getManufacturerOrResellerOrUserName } from '../../UserPage/UserPage';
import { selectorCatalogSearchParams } from '../../../store/productSlice';
import { getBackwardRouteToManufacturerCatalog } from '../../../utils/functions';
import { PageEnum } from '../../../components/AppRouter/AppRouter';
import { selectorPriceEditProductId } from '../../../store/priceSlice';

const EditCardMainPart: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);

  const priceEditProductId = useAppSelector(selectorPriceEditProductId);
  const getBackwardRoute = getBackwardRouteToManufacturerCatalog(user?.manufacturer?.id, catalogSearchParams);

  const crumbs: CrumbType[] = priceEditProductId
    ? [
        { title: getManufacturerOrResellerOrUserName(user) },
        { title: 'Продажи', route: getBackwardRoute },
        { title: 'Прайс лист', route: PageEnum.ManufacturerPricePage },
        { title: 'Редактирование товара' },
      ]
    : [
        { title: getManufacturerOrResellerOrUserName(user) },
        { title: 'Продажи', route: getBackwardRoute },
        { title: 'Редактирование товара' },
      ];

  return (
    <div className={classes.container}>
      <div className={classes.breadCrumbsContainer}>
        <BreadCrumbs crumbs={crumbs} />
      </div>
      <ProductDetails />
    </div>
  );
};

export default EditCardMainPart;
