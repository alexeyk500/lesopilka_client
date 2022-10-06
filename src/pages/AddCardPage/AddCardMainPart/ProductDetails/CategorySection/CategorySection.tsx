import React from 'react';
import classes from './CategorySection.module.css';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorCategories } from '../../../../../store/catalogSlice';
import { selectorNewCard, setNewCardCategoryId } from '../../../../../store/newCardSlice';
import Selector from '../../../../../components/commonComponents/Selector/Selector';

const CategorySection: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectorCategories);
  const newCard = useAppSelector(selectorNewCard);

  const onChangeSelector = (id: number) => {
    dispatch(setNewCardCategoryId(id));
  };

  return (
    <div className={classes.container}>
      <CheckIndicator title={'Пиломатериал'} checked={!!newCard.categoryId} />
      <div className={classes.rowContainer}>
        <div className={classes.selectorContainer}>
          <Selector hasNullChoice options={categories} customClassName={classes.selector} onChange={onChangeSelector} />
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
