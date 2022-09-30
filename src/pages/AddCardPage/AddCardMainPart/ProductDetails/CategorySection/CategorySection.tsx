import React from 'react';
import classes from './CategorySection.module.css';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import CheckBoxBlue from '../../../../../components/commonComponents/CheckBoxBlue/CheckBoxBlue';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorCategories } from '../../../../../store/catalogSlice';
import { selectorNewCard, setCategoryId } from '../../../../../store/newCardSlice';

const CategorySection: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectorCategories);
  const newCard = useAppSelector(selectorNewCard);

  const onSelect = (id: string) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className={classes.container}>
      <CheckIndicator title={'Пиломатериал'} checked={!!newCard.categoryId} />
      <div className={classes.optionsContainer}>
        {categories.map((category) => {
          return (
            <CheckBoxBlue
              key={category.id}
              id={category.id}
              title={category.title}
              checked={category.id === newCard.categoryId}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
