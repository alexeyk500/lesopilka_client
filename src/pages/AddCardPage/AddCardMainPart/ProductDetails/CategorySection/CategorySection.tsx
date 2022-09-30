import React from 'react';
import classes from './CategorySection.module.css';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import CheckBoxBlue from "../../../../../components/commonComponents/CheckBoxBlue/CheckBoxBlue";

const CategorySection: React.FC = () => {
  return (
    <div className={classes.container}>
      <CheckIndicator title={'Пиломатериал'} checked={false} />
      <CheckBoxBlue title={'Брус'} checked={false}/>
      <CheckBoxBlue title={'Доска'} checked={true}/>
    </div>
  );
};

export default CategorySection;
