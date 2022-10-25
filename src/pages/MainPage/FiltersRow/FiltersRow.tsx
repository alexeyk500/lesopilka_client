import React from 'react';
import classes from './FiltersRow.module.css';
import ButtonComponent, { ButtonType } from '../../../components/commonComponents/ButtonComponent/ButtonComponent';

const FiltersRow: React.FC = () => {
  return (
    <div className={classes.container}>
      <ButtonComponent title={'Брус'} buttonType={ButtonType.FILTER} />
      <ButtonComponent
        title={'Калиброванный'}
        buttonType={ButtonType.FILTER}
        onClick={() => {
          console.log('hello');
        }}
      />
    </div>
  );
};

export default FiltersRow;
