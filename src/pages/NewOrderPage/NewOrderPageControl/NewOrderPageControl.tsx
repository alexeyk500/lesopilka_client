import React from 'react';
import classes from './NewOrderPageControl.module.css';
import ButtonComponent, { ButtonType } from '../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { PageEnum } from '../../../components/AppRouter/AppRouter';
import OrderInfo from './OrderInfo/OrderInfo';
import { useAppSelector } from '../../../hooks/hooks';
import {
  selectorNewOrderContactPersonName,
  selectorNewOrderContactPersonPhone,
  selectorNewOrderDate,
  selectorNewOrderDeliveryAddress,
  selectorNewOrderDeliveryLocation,
  selectorNewOrderDeliveryMethod,
  selectorNewOrderPaymentMethod,
} from '../../../store/newOrderSlice';
import { checkDateSection } from '../NewOrderPageMainPart/DateSection/DateSection';
import { checkDeliverySection } from '../NewOrderPageMainPart/DeliverySection/DeliverySection';
import { DeliveryMethodEnum, OptionsType, PaymentMethodEnum, ProductType } from '../../../types/types';
import { checkContactPersonSection } from '../NewOrderPageMainPart/ContactPersonSection/ContactPersonSection';
import { checkPaymentMethodSection } from '../NewOrderPageMainPart/PaymentMethodSection/PaymentMethodSection';
import { selectorBasketProducts } from '../../../store/basketSlice';
import { filterProductsByManufacturerId } from '../../../utils/productFunctions';
import { checkOrderContentSection } from '../NewOrderPageMainPart/OrderContentSection/OrderContentSection';

const getErrorMessage = (
  orderDate: Date,
  deliveryMethod: DeliveryMethodEnum,
  deliveryLocation: OptionsType | undefined,
  deliveryAddress: string | undefined,
  contactPersonName: string | undefined,
  contactPersonPhone: string | undefined,
  paymentMethod: PaymentMethodEnum,
  productsByManufacturerId: ProductType[]
) => {
  if (!checkDateSection(orderDate)) {
    return 'Выберите дату заказа';
  } else if (!checkDeliverySection(deliveryMethod, deliveryLocation, deliveryAddress)) {
    return 'Выберите населенный пункт\nи заполните адрес доставки';
  } else if (!checkContactPersonSection({ contactPersonName, contactPersonPhone })) {
    return 'Заполните телефон\nи контактное лицо';
  } else if (!checkPaymentMethodSection(paymentMethod)) {
    return 'Выберите способ оплаты';
  } else if (!checkOrderContentSection(productsByManufacturerId)) {
    return 'Заказ поставщику пуст';
  }
  return undefined;
};

const NewOrderPageControl: React.FC = () => {
  const { mid } = useParams();
  const navigate = useNavigate();
  const orderDate = new Date(useAppSelector(selectorNewOrderDate));
  const deliveryMethod = useAppSelector(selectorNewOrderDeliveryMethod);
  const deliveryLocation = useAppSelector(selectorNewOrderDeliveryLocation);
  const deliveryAddress = useAppSelector(selectorNewOrderDeliveryAddress);
  const contactPersonName = useAppSelector(selectorNewOrderContactPersonName);
  const contactPersonPhone = useAppSelector(selectorNewOrderContactPersonPhone);
  const paymentMethod = useAppSelector(selectorNewOrderPaymentMethod);
  const basketProducts = useAppSelector(selectorBasketProducts);
  const productsByManufacturerId = filterProductsByManufacturerId(basketProducts, Number(mid) ?? 0);

  const errorMessage = getErrorMessage(
    orderDate,
    deliveryMethod,
    deliveryLocation,
    deliveryAddress,
    contactPersonName,
    contactPersonPhone,
    paymentMethod,
    productsByManufacturerId
  );

  const onClickGoToBasket = () => {
    navigate(PageEnum.BasketPage);
  };

  return (
    <div className={classes.container}>
      <div className={classes.infoSection}>
        <OrderInfo />
        <div className={classes.btnCreateContainer}>
          <ButtonComponent
            title={'Отправить'}
            buttonType={ButtonType.GREEN}
            disabled={!!errorMessage}
            disabledPopUpMessage={errorMessage}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className={classes.btnReadyContainer}>
        <ButtonComponent title={'В корзину'} onClick={onClickGoToBasket} />
      </div>
    </div>
  );
};

export default NewOrderPageControl;
