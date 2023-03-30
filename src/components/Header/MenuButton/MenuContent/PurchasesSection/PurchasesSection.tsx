import React from 'react';
import classes from '../MenuContent.module.css';
import catalogIco from '../../../../../img/catalogIco.svg';
import cartIcoOutlined from '../../../../../img/cartIcoOutlined.svg';
import ordersIco from '../../../../../img/ordersIco.svg';
import starIcoGrayStroke from '../../../../../img/starIcoGrayStroke.svg';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../../AppRouter/AppRouter';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorUser } from '../../../../../store/userSlice';
import useLoginUser from '../../../../../hooks/useLoginUser';

type PropsType = {
  closeMenuContent: () => void;
};

const PurchasesSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();
  const loginUser = useLoginUser();
  const user = useAppSelector(selectorUser);

  const onClickCatalog = () => {
    navigate(PageEnum.RootPage);
    closeMenuContent();
  };

  const onClickBasket = () => {
    if (user) {
      navigate(PageEnum.BasketPage);
    } else {
      loginUser();
    }
    closeMenuContent();
  };

  const onClickFavoriteProducts = () => {
    if (user) {
      navigate(PageEnum.FavoriteProductPage);
    } else {
      loginUser();
    }
    closeMenuContent();
  };

  const onClickOrders = () => {
    if (user) {
      navigate(PageEnum.UserOrdersPage);
    } else {
      loginUser();
    }
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Покупки
      <button className={classes.menuButton} onClick={onClickCatalog}>
        <img src={catalogIco} className={classes.ico} alt="catalog button" />
        Каталог
      </button>
      <button className={classes.menuButton} onClick={onClickBasket}>
        <img src={cartIcoOutlined} className={classes.ico} alt="basket button" />
        Корзина
      </button>
      <button className={classes.menuButton} onClick={onClickOrders}>
        <img src={ordersIco} className={classes.ico} alt="orders button" />
        Заказы
      </button>
      <button className={classes.menuButton} onClick={onClickFavoriteProducts}>
        <img src={starIcoGrayStroke} className={classes.ico} alt="favorites goods button" />
        Избранное
      </button>
    </div>
  );
};

export default PurchasesSection;
