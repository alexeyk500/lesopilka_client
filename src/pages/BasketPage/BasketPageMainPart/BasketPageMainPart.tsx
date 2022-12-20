import React from 'react';
import classes from './BasketPageMainPart.module.css';
import BasketList from './BasketList/BasketList';

const BasketPageMainPart: React.FC = () => {
  return (
    <div className={classes.container}>
      <BasketList />
    </div>
  );
};

export default BasketPageMainPart;
