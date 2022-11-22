import React from 'react';
import classes from '../MenuContent.module.css';
import catalogIco from '../../../../../img/catalogIco.svg';
import priceIco from '../../../../../img/priceIco.svg';
import ordersIco from '../../../../../img/ordersIco.svg';
import idCardIco from '../../../../../img/idCardIco.svg';
import documentsIco from '../../../../../img/documentsIco.svg';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorUser } from '../../../../../store/userSlice';

type PropsType = {
  closeMenuContent: () => void;
};

const SalesSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);

  const onClickCatalog = () => {
    navigate(`/sales/?mid=${user?.manufacturer?.id}`);
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Продажи
      <button className={classes.menuButton} onClick={onClickCatalog}>
        <img src={catalogIco} className={classes.ico} alt="catalog button" />
        Каталог
      </button>
      <button className={classes.menuButton}>
        <img src={priceIco} className={classes.ico} alt="price button" />
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
