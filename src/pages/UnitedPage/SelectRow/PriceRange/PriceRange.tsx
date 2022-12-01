import React, { useEffect, useState } from 'react';
import classes from './PriceRange.module.css';
import { DEBOUNCE_TIME, regExpForPrice } from '../../../../utils/constants';
import { useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../../../types/types';
import useDebouncedFunction from '../../../../hooks/useDebounceFunction';

const PriceRange: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceFrom, setPriceFrom] = useState<string | undefined | null>(undefined);
  const [priceTo, setPriceTo] = useState<string | undefined | null>(undefined);

  useEffect(() => {
    const priceFromValue = searchParams.get(QueryEnum.PriceFrom);
    const priceToValue = searchParams.get(QueryEnum.PriceTo);
    setPriceFrom(priceFromValue ? priceFromValue : undefined);
    setPriceTo(priceToValue ? priceToValue : undefined);
  }, [searchParams]);

  const debounceUpdateSearchParams = useDebouncedFunction(
    (updateData: UpdateSearchParamsType) => {
      if (updateData.value) {
        searchParams.delete(updateData.name);
        searchParams.append(updateData.name, updateData.value);
      } else {
        searchParams.delete(updateData.name);
      }
      setSearchParams(searchParams);
    },
    DEBOUNCE_TIME,
    true
  );

  type UpdateSearchParamsType = {
    name: string;
    value: string | undefined;
  };

  const onChangePriceFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || regExpForPrice.test(event.target.value)) {
      if (event.target.value === '') {
        setPriceFrom(undefined);
        debounceUpdateSearchParams({ name: QueryEnum.PriceFrom, value: undefined });
      } else {
        setPriceFrom(event.currentTarget.value);
        debounceUpdateSearchParams({ name: QueryEnum.PriceFrom, value: event.currentTarget.value });
      }
    }
  };

  const onChangePriceTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || regExpForPrice.test(event.target.value)) {
      if (event.target.value === '') {
        setPriceTo(undefined);
        debounceUpdateSearchParams({ name: QueryEnum.PriceTo, value: undefined });
      } else {
        setPriceTo(event.currentTarget.value);
        debounceUpdateSearchParams({ name: QueryEnum.PriceTo, value: event.currentTarget.value });
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
