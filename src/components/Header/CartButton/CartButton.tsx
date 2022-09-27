import React from 'react';
import cartIco from '../../../img/cartIco.svg';
import classes from './CartButton.module.css';

const CartButton: React.FC = () => {
  return (
    <button className={classes.container}>
      <img className={classes.ico} src={cartIco} alt="button cart" />
    </button>
  );
};

export default CartButton;
