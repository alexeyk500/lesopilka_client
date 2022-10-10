import React from 'react';
import SectionContainer from '../SectionContainer/SectionContainer';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorNewCard } from '../../../../../store/newCardSlice';
import classes from '../CatalogSection/CatalogSection.module.css';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { SelectOptionsType } from '../../../../../types/types';

const getSortOptions = (sorts: SelectOptionsType[]) => {
  const options: SelectOptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...sorts);
  return options;
};

const ProductSortSection = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const sortsOption = getSortOptions([
    { id: 1, title: 'экстра' },
    { id: 2, title: '1-й' },
    { id: 3, title: '2-й' },
  ]);

  const onChangeSelector = (id: number) => {
    console.log('onChangeSelector id =', id);
    // dispatch(setNewCardProductCaliberId(id));
  };

  return (
    <SectionContainer title={'Сорт'} completeCondition={!!newCard.sortId} blurCondition={false}>
      <div className={classes.rowContainer}>
        <SectionSelector options={sortsOption} selectedOption={undefined} onChangeSelector={onChangeSelector} />
      </div>
    </SectionContainer>
  );
};

export default ProductSortSection;
