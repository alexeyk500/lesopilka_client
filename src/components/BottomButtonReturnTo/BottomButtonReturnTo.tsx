import React from 'react';
import classes from './BottomButtonReturnTo.module.css';
import ButtonComponent, { ButtonType } from '../commonComponents/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { selectorCatalogSearchParams } from '../../store/productSlice';
import { PageEnum } from '../AppRouter/AppRouter';

export enum ReturnToEnum {
  catalog = 'В каталог',
  basket = 'В корзину',
  userOrders = 'В заказы',
  manufacturerOrders = 'В заказы ',
}

type PropsType = {
  returnTo: ReturnToEnum;
};

const BottomButtonReturnTo: React.FC<PropsType> = ({ returnTo }) => {
  const navigate = useNavigate();
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);

  const returnToCatalog = () => {
    if (catalogSearchParams) {
      navigate(`${PageEnum.RootPage}?${catalogSearchParams}`);
    } else {
      navigate(PageEnum.RootPage);
    }
  };

  const onClickHandler = () => {
    if (returnTo === ReturnToEnum.catalog) {
      returnToCatalog();
    } else if (returnTo === ReturnToEnum.basket) {
      navigate(PageEnum.BasketPage);
    } else if (returnTo === ReturnToEnum.userOrders) {
      navigate(PageEnum.UserOrdersPage);
    } else if (returnTo === ReturnToEnum.manufacturerOrders) {
      navigate(PageEnum.ManufacturerOrdersPage);
    }
  };

  return (
    <div className={classes.container}>
      <ButtonComponent title={returnTo} onClick={onClickHandler} buttonType={ButtonType.SECONDARY} />
    </div>
  );
};

export default BottomButtonReturnTo;
