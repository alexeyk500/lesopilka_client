import React from 'react';
import classes from '../MenuContent.module.css';
import catalogIco from '../../../../../img/catalogIco.svg';
import cartIcoOutlined from '../../../../../img/cartIcoOutlined.svg';
import ordersIco from '../../../../../img/ordersIco.svg';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../../AppRouter/AppRouter';
import {useAppSelector} from "../../../../../hooks/hooks";
import {selectorUser} from "../../../../../store/userSlice";

type PropsType = {
  closeMenuContent: () => void;
};

const PurchasesSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);

  const onClickCatalog = () => {
    navigate(PageEnum.RootPage);
    closeMenuContent();
  };

  const onClickBasket = () => {
    if (user) {
      navigate(PageEnum.BasketPage);
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
      <button className={classes.menuButton}>
        <img src={ordersIco} className={classes.ico} alt="orders button" />
        Заказы
      </button>
    </div>
  );
};

export default PurchasesSection;
