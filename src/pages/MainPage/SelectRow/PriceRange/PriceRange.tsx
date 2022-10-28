import React from 'react';
import classes from './PriceRange.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorPriceFrom, selectorPriceTo, setPriceFrom, setPriceTo } from '../../../../store/productSlice';
import { regExpForPrice } from '../../../../utils/constants';

const PriceRange: React.FC = () => {
  const dispatch = useAppDispatch();
  const priceFrom = useAppSelector(selectorPriceFrom);
  const priceTo = useAppSelector(selectorPriceTo);

  const onChangePriceFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || regExpForPrice.test(event.target.value)) {
      if (event.target.value === '') {
        dispatch(setPriceFrom(undefined));
      } else {
        dispatch(setPriceFrom(event.currentTarget.value));
      }
    }
  };

  const onChangePriceTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || regExpForPrice.test(event.target.value)) {
      if (event.target.value === '') {
        dispatch(setPriceTo(undefined));
      } else {
        dispatch(setPriceTo(event.currentTarget.value));
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>Цена</div>
      <div className={classes.priceRange}>
        <div className={classes.priceFrom}>
          <div className={classes.description}>{'от:'}</div>
          <input value={priceFrom || ''} className={classes.inputPrice} onChange={onChangePriceFrom} />
        </div>
        <div className={classes.priceTo}>
          <div className={classes.description}>{'до:'}</div>
          <input value={priceTo || ''} className={classes.inputPrice} onChange={onChangePriceTo} />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
