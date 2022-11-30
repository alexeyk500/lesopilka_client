import React, { useEffect, useState } from 'react';
import { QueryEnum } from '../../../../types/types';
import { useSearchParams } from 'react-router-dom';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { updateQueryFilters } from '../../../../store/productSlice';
import { useAppDispatch } from '../../../../hooks/hooks';

type PropsType = {
  queryEnum: QueryEnum;
};

const FilterPrice: React.FC<PropsType> = ({ queryEnum }) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterPriceTile, setFilterPriceTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    const priceValue = searchParams.get(queryEnum);
    if (priceValue) {
      if (queryEnum === QueryEnum.PriceFrom) {
        setFilterPriceTitle(`Цена от: ${priceValue} руб.`);
      }
      if (queryEnum === QueryEnum.PriceTo) {
        setFilterPriceTitle(`Цена до: ${priceValue} руб.`);
      }
    } else {
      setFilterPriceTitle(undefined);
    }
  }, [searchParams, queryEnum]);

  const resetPriceFilter = () => {
    searchParams.delete(queryEnum);
    dispatch(updateQueryFilters(searchParams.toString()));
    setSearchParams(searchParams);
  };

  return (
    <>
      {filterPriceTile && (
        <ButtonComponent title={filterPriceTile || ''} buttonType={ButtonType.FILTER} onClick={resetPriceFilter} />
      )}
    </>
  );
};

export default FilterPrice;
