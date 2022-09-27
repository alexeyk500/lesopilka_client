import React from 'react';
import classes from '../MenuContent.module.css';
import searchIco from '../../../../../img/searchIco.svg';
import basketIco from '../../../../../img/basketIco.svg';

const FavoritesSection: React.FC = () => {
  return (
    <div className={classes.section}>
      Избранное
      <button className={classes.menuButton}>
        <img src={basketIco} className={classes.ico} alt="favorites goods button" />
        Товары
      </button>
      <button className={classes.menuButton}>
        <img src={searchIco} className={classes.ico} alt="favorites search buttons" />
        Поиск
      </button>
    </div>
  );
};

export default FavoritesSection;
