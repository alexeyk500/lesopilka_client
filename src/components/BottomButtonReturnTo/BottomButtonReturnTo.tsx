import React from 'react';
import classes from './BottomButtonReturnTo.module.css';
import ButtonComponent, { ButtonType } from '../commonComponents/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { selectorCatalogSearchParams } from '../../store/productSlice';
import { PageEnum } from '../AppRouter/AppRouter';
import { selectorUser } from '../../store/userSlice';

export enum ReturnToEnum {
  mainPage = 'На главную',
  catalog = 'В каталог',
  basket = 'В корзину',
  userOrders = 'В заказы',
  manufacturerOrders = 'В заказы ',
  manufacturerProducts = 'В мои товары',
  price = 'В прайс',
}

type PropsType = {
  returnTo: ReturnToEnum;
};

const BottomButtonReturnTo: React.FC<PropsType> = ({ returnTo }) => {
  const navigate = useNavigate();
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);
  const user = useAppSelector(selectorUser);

  const returnToCatalog = () => {
    if (catalogSearchParams) {
      navigate(`${PageEnum.MainPage}?${catalogSearchParams}`);
    } else {
      navigate(PageEnum.MainPage);
    }
  };

  const onClickHandler = () => {
    if (returnTo === ReturnToEnum.mainPage) {
      navigate(PageEnum.MainPage);
    } else if (returnTo === ReturnToEnum.basket) {
      navigate(PageEnum.BasketPage);
    } else if (returnTo === ReturnToEnum.userOrders) {
      navigate(PageEnum.UserOrdersPage);
    } else if (returnTo === ReturnToEnum.manufacturerOrders) {
      navigate(PageEnum.ManufacturerOrdersPage);
    } else if (returnTo === ReturnToEnum.price) {
      navigate(PageEnum.ManufacturerPricePage);
    } else if (returnTo === ReturnToEnum.manufacturerProducts) {
      if (user?.manufacturer?.id) {
        navigate(`${PageEnum.ManufacturerPage}/?mid=${user.manufacturer.id}`);
      } else {
        returnToCatalog();
      }
    } else if (returnTo === ReturnToEnum.catalog) {
      returnToCatalog();
    }
  };

  return (
    <div className={classes.container}>
      <ButtonComponent title={returnTo} onClick={onClickHandler} buttonType={ButtonType.SECONDARY} />
    </div>
  );
};

export default BottomButtonReturnTo;
