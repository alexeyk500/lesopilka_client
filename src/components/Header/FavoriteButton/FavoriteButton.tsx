import React from 'react';
import classes from './FavoriteButton.module.css';
import starIco from '../../../img/starIcoGray.svg';

const FavoriteButton: React.FC = () => {
  return (
    <button className={classes.container}>
      <img className={classes.ico} src={starIco} alt="button selected" />
    </button>
  );
};

export default FavoriteButton;
