import React from 'react';
import { OptionsType } from '../../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorNewCard, setNewCardIsSeptic, setNewCardSortId } from '../../../../../store/newCardSlice';
import { selectorProductSorts } from '../../../../../store/catalogSlice';
import classes from './ProductSortAndSepticSection.module.css';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import SectionContainer from '../SectionContainer/SectionContainer';

const getSortOptions = (sorts: OptionsType[]) => {
  const options: OptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...sorts);
  return options;
};

const antisepticOptions = [
  { id: 0, title: 'Нет' },
  { id: 1, title: 'Обработан' },
];

const ProductSortAndSepticSection = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const sorts = useAppSelector(selectorProductSorts);
  const sortsOption = getSortOptions(sorts);
  const selectedSortId = sortsOption.find((sort) => sort.id === newCard.sortId);

  const onChangeSortSelector = (id: number) => {
    dispatch(setNewCardSortId(id));
  };

  const onChangeSepticSelector = (id: number) => {
    dispatch(setNewCardIsSeptic(!!id));
  };

  return (
    <SectionContainer title={'Сорт и Антисептик'} completeCondition={!!newCard.sortId} blurCondition={false}>
      <div className={classes.rowContainer}>
        <SectionSelector
          title={'Сорт пиломатериала'}
          options={sortsOption}
          selectedOption={selectedSortId}
          onChangeSelector={onChangeSortSelector}
        />
        <SectionSelector
          title={'Обработка Антисептиком'}
          options={antisepticOptions}
          selectedOption={newCard.isSeptic ? antisepticOptions[1] : antisepticOptions[0]}
          onChangeSelector={onChangeSepticSelector}
        />
      </div>
    </SectionContainer>
  );
};

export default ProductSortAndSepticSection;
