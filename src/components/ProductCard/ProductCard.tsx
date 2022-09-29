import React from 'react';
import classes from './ProductCard.module.css';
import addCardButton from '../../img/addCardButton.svg';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  isAddProductCard?: boolean;
};

const ProductCard: React.FC<PropsType> = ({ isAddProductCard }) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (isAddProductCard) {
      navigate('/add_card');
    }
  };

  return (
    <div className={classes.container} onClick={onClick}>
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
