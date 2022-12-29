import React from 'react';
import classes from './NewOrderPageControl.module.css';
import ButtonComponent, { ButtonType } from '../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../components/AppRouter/AppRouter';
import OrderInfo from './OrderInfo/OrderInfo';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorNewOrderDate, selectorNewOrderDeliveryMethod } from '../../../store/newOrderSlice';
import { checkDateSection } from '../NewOrderPageMainPart/DateSection/DateSection';
import { checkDeliverySection } from '../NewOrderPageMainPart/DeliverySection/DeliverySection';
import { DeliveryMethodEnum } from '../../../types/types';

const checkOrderDataComplete = (orderDate: Date, deliveryMethod: DeliveryMethodEnum) => {
  return checkDateSection(orderDate) && checkDeliverySection(deliveryMethod);
};

const NewOrderPageControl: React.FC = () => {
  const navigate = useNavigate();

  const onClickGoToBasket = () => {
    navigate(PageEnum.BasketPage);
  };

  const orderDate = new Date(useAppSelector(selectorNewOrderDate));
  const deliveryMethod = useAppSelector(selectorNewOrderDeliveryMethod);

  const isOrderDataComplete = checkOrderDataComplete(orderDate, deliveryMethod);

  return (
    <div className={classes.container}>
      <div className={classes.infoSection}>
        <OrderInfo />
        <div className={classes.btnCreateContainer}>
          {isOrderDataComplete ? (
            <ButtonComponent title={'Отправить'} buttonType={ButtonType.GREEN} onClick={() => {}} />
          ) : (
            <ButtonComponent title={'Отправить'} buttonType={ButtonType.GRAY} />
          )}
        </div>
      </div>
      <div className={classes.btnReadyContainer}>
        <ButtonComponent title={'В корзину'} onClick={onClickGoToBasket} />
      </div>
    </div>
  );
};

export default NewOrderPageControl;
