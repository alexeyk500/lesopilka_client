import React from 'react';
import classes from '../MenuContent.module.css';
import catalogIco from '../../../../../img/catalogIco.svg';
import cartIcoOutlined from '../../../../../img/cartIcoOutlined.svg';
import ordersIco from '../../../../../img/ordersIco.svg';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../../AppRouter/AppRouter';

type PropsType = {
  closeMenuContent: () => void;
};

const PurchasesSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();

  const onClickCatalog = () => {
    navigate(PageEnum.RootPage);
    closeMenuContent();
  };

  return (
    <div className={classes.section} onClick={onClickCatalog}>
      Покупки
      <button className={classes.menuButton}>
        <img src={catalogIco} className={classes.ico} alt="catalog button" />
        Каталог
      </button>
      <button className={classes.menuButton}>
        <img src={cartIcoOutlined} className={classes.ico} alt="cart button" />
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
