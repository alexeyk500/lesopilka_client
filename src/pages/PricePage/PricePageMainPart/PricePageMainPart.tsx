import React, {useEffect} from 'react';
import classes from './PricePageMainPart.module.css';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumps';
import { useLocation } from 'react-router-dom';
import { checkIsManufacturerPage, getBackwardRouteToManufacturerCatalog } from '../../../utils/functions';
import { CrumbType } from '../../../types/types';
import { getManufacturerOrUserName } from '../../UserPage/UserPage';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { selectorCatalogSearchParams } from '../../../store/productSlice';
import PriceList from './PriceList/PriceList';
import {getBasketProductsThunk} from "../../../store/basketSlice";

const PricePageMainPart: React.FC = () => {
  const dispatch = useAppDispatch();
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

  useEffect(()=>{
    if (user && !isManufacturerPage) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (user && token) {
        dispatch(getBasketProductsThunk(token));
      }
    }
  },[user, isManufacturerPage])

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
