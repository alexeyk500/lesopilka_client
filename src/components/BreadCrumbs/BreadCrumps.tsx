import React from 'react';
import classes from './BreadCrumbs.module.css';
import rightArrow from '../../img/rightArrow.svg'

const BreadCrumbs = () => {
  return <div className={classes.container}>
    <div className={classes.content}>
      <div>
        ООО "Лесопилка"
      </div>
      <img src={rightArrow} className={classes.rightArrow} alt="rightArrow"/>
      <div>
        Каталог
      </div>
    </div>

  </div>;
};

export default BreadCrumbs;
