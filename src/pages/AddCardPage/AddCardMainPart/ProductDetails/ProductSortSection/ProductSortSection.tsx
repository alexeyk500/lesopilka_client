import React from 'react';
import SectionContainer from '../SectionContainer/SectionContainer';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorNewCard, setNewCardSortId } from '../../../../../store/newCardSlice';
import classes from '../CatalogSection/CatalogSection.module.css';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { SelectOptionsType } from '../../../../../types/types';
import { selectorProductSorts } from '../../../../../store/catalogSlice';

const getSortOptions = (sorts: SelectOptionsType[]) => {
  const options: SelectOptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...sorts);
  return options;
};

const ProductSortSection = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const sorts = useAppSelector(selectorProductSorts);
  const sortsOption = getSortOptions(sorts);
  const selectedSortId = sortsOption.find((sort) => sort.id === newCard.sortId);

  const onChangeSelector = (id: number) => {
    dispatch(setNewCardSortId(id));
  };

  return (
    <SectionContainer title={'Сорт'} completeCondition={!!newCard.sortId} blurCondition={false}>
      <div className={classes.rowContainer}>
        <SectionSelector options={sortsOption} selectedOption={selectedSortId} onChangeSelector={onChangeSelector} />
      </div>
    </SectionContainer>
  );
};

export default ProductSortSection;
