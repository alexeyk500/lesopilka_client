import React from 'react';
import classes from '../CartButton/CartButton.module.css';
import starIco from '../../../img/starIco.svg';

const SelectedButton: React.FC = () => {
  return (
    <button className={classes.container}>
      <img className={classes.ico} src={starIco} alt="button selected" />
    </button>
  );
};

export default SelectedButton;
