import React, { useEffect, useState } from 'react';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useSearchParams } from 'react-router-dom';
import { OptionsType, QueryEnum } from '../../../../types/types';
import { updateQueryFilters } from '../../../../store/productSlice';
import { useAppDispatch } from '../../../../hooks/hooks';

type PropsType = {
  options: OptionsType[];
  queryEnum: QueryEnum;
  preTitle?: string;
  resetAdditionQueryEnum?: QueryEnum;
};

const FilterOption: React.FC<PropsType> = ({ options, queryEnum, preTitle, resetAdditionQueryEnum }) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<OptionsType | undefined>(undefined);

  useEffect(() => {
    const sortId = Number(searchParams.get(queryEnum));
    if (options && sortId) {
      const option = options.find((curOption) => curOption.id === sortId);
      if (option) {
        setSelectedOption(option);
      }
    } else {
      setSelectedOption(undefined);
    }
  }, [searchParams, options, queryEnum]);

  const resetCategoryFilter = () => {
    searchParams.delete(queryEnum);
    resetAdditionQueryEnum && searchParams.delete(resetAdditionQueryEnum);
    dispatch(updateQueryFilters(searchParams.toString()));
    setSearchParams(searchParams);
  };

  return selectedOption ? (
    <ButtonComponent
      title={preTitle ? preTitle + selectedOption.title : selectedOption.title}
      buttonType={ButtonType.FILTER}
      onClick={resetCategoryFilter}
    />
  ) : null;
};

export default FilterOption;
