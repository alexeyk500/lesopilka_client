import React from 'react';
import classes from './NewOrderPageControl.module.css';
import ButtonComponent, { ButtonType } from '../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../components/AppRouter/AppRouter';
import OrderInfo from './OrderInfo/OrderInfo';

const NewOrderPageControl: React.FC = () => {
  const navigate = useNavigate();

  const onClickGoToBasket = () => {
    navigate(PageEnum.BasketPage);
  };

  return (
    <div className={classes.container}>
      <div className={classes.infoSection}>
        <OrderInfo />
        <div className={classes.btnCreateContainer}>
          <ButtonComponent title={'Отправить'} buttonType={ButtonType.GREEN} onClick={() => {}} />
        </div>
      </div>
      <div className={classes.btnReadyContainer}>
        <ButtonComponent title={'В корзину'} onClick={onClickGoToBasket} />
      </div>
    </div>
  );
};

export default NewOrderPageControl;
