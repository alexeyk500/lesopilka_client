import React from 'react';
import classes from './CategorySection.module.css';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import CheckBoxBlue from '../../../../../components/commonComponents/CheckBoxBlue/CheckBoxBlue';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorCategories } from '../../../../../store/catalogSlice';

const CategorySection: React.FC = () => {
  const categories = useAppSelector(selectorCategories);

  return (
    <div className={classes.container}>
      <CheckIndicator title={'Пиломатериал'} checked={false} />
      <div className={classes.optionsContainer}>
        {categories.map((category) => {
          return <CheckBoxBlue key={category.id} title={category.title} checked={false} />;
        })}
      </div>
    </div>
  );
};

export default CategorySection;
