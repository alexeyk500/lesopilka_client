import React from 'react';
import classes from '../MenuContent.module.css';
import catalogIco from '../../../../../img/catalogIco.svg';
import priceIco from '../../../../../img/priceIco.svg';
import ordersIco from '../../../../../img/ordersIco.svg';
import idCardIco from '../../../../../img/idCardIco.svg';
import documentsIco from '../../../../../img/documentsIco.svg';

const SalesSection: React.FC = () => {
  return (
    <div className={classes.section}>
      Продажи
      <button className={classes.menuButton}>
        <img src={catalogIco} className={classes.ico} alt="catalog button" />
        Каталог
      </button>
      <button className={classes.menuButton}>
        <img src={priceIco} className={classes.ico} alt="cart button" />
        Прайс
      </button>
      <button className={classes.menuButton}>
        <img src={ordersIco} className={classes.ico} alt="orders button" />
        Заказы
      </button>
      <button className={classes.menuButton}>
        <img src={idCardIco} className={classes.ico} alt="about page button" />
        Визитка
      </button>
      <button className={classes.menuButton}>
        <img src={documentsIco} className={classes.ico} alt="documents button" />
        Документы
      </button>
    </div>
  );
};

export default SalesSection;
