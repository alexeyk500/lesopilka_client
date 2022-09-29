import React from 'react';
import classes from './ProductCard.module.css';
import addCardButton from '../../../img/addCardButton.svg';

type PropsType = {
  isAddProductCard?: boolean;
};

const ProductCard: React.FC<PropsType> = ({ isAddProductCard }) => {
  return (
    <div className={classes.container}>
      {isAddProductCard ? (
        <div className={classes.addProductCardContainer}>
          <img src={addCardButton} className={classes.addCardButton} alt="add card button" />
          <div className={classes.addCardTitle}>Добавить карточку</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductCard;
