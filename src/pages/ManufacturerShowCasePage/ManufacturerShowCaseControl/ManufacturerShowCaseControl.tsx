import React, { useEffect, useState } from 'react';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import classes from './ManufacturerShowCaseControl.module.css';
import FilterSelectors from '../../UnitedPage/FilterSelectors/FilterSelectors';
import { resetQueryFilters } from '../../../store/productSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../../types/types';

type PropsType = {
  isAddToBasketPage?: boolean;
};

const ManufacturerShowCaseControl: React.FC<PropsType> = ({ isAddToBasketPage }) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearchParamsCleaned, setIsSearchParamsCleaned] = useState(false);

  useEffect(() => {
    setIsSearchParamsCleaned(false);
  }, []);

  useEffect(() => {
    if (!isSearchParamsCleaned) {
      const mid = searchParams.get(QueryEnum.ManufacturerId);
      if (mid) {
        const newSearchParams = new URLSearchParams();
        newSearchParams.append(QueryEnum.ManufacturerId, mid);
        setSearchParams(newSearchParams);
      }
      dispatch(resetQueryFilters());
      setIsSearchParamsCleaned(true);
    }
  }, [dispatch, isSearchParamsCleaned, searchParams, setSearchParams]);

  return (
    <div className={classes.container}>
      <div className={classes.selectorContainer}>
        <FilterSelectors />
      </div>
      <div className={classes.bottomContainer}>
        <BottomButtonReturnTo returnTo={isAddToBasketPage ? ReturnToEnum.basket : ReturnToEnum.catalog} />
      </div>
    </div>
  );
};

export default ManufacturerShowCaseControl;
