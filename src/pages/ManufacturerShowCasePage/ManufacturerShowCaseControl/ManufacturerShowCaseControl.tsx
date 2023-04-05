import React, { useEffect, useState } from 'react';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import classes from './ManufacturerShowCaseControl.module.css';
import FilterSelectors from '../../UnitedPage/FilterSelectors/FilterSelectors';
import { resetQueryFilters } from '../../../store/productSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../../types/types';
import IconButton from '../../../components/commonComponents/IconButton/IconButton';
import priceWhiteIco from '../../../img/priceWhiteIco.svg';
import { PageEnum } from '../../../components/AppRouter/AppRouter';

type PropsType = {
  isAddToBasketPage?: boolean;
};

const ManufacturerShowCaseControl: React.FC<PropsType> = ({ isAddToBasketPage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearchParamsCleaned, setIsSearchParamsCleaned] = useState(false);
  const mid = searchParams.get(QueryEnum.ManufacturerId);

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

  const onClickPrice = () => {
    if (mid) {
      navigate(`${PageEnum.UserPricePage}/${mid}`);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.selectorContainer}>
        <FilterSelectors />
      </div>
      {isAddToBasketPage && (
        <div className={classes.priceButtonContainer}>
          <IconButton
            ico={priceWhiteIco}
            title={'Прайс поставщика'}
            customIconClasses={classes.priceIco}
            onClick={onClickPrice}
          />
        </div>
      )}
      <div className={classes.bottomContainer}>
        <BottomButtonReturnTo returnTo={isAddToBasketPage ? ReturnToEnum.basket : ReturnToEnum.catalog} />
      </div>
    </div>
  );
};

export default ManufacturerShowCaseControl;
