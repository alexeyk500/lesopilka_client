import React from 'react';
import classes from '../MenuContent.module.css';
import resellerCabinetIco from '../../../../../img/resellerCabinetIco.svg';
import resellerReportIco from '../../../../../img/resellerReportIco.svg';
import resellerDetailsReportIco from '../../../../../img/resellerDetailsReportIco.svg';
import { PageEnum } from '../../../../AppRouter/AppRouter';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  closeMenuContent: () => void;
};

const ResellerSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();

  const onClickCabinet = () => {
    navigate(PageEnum.ContactsPage);
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Реселлер
      <button className={classes.menuButton} onClick={onClickCabinet}>
        <img src={resellerCabinetIco} className={classes.ico} alt="reseller cabinet button" />
        Кабинет
      </button>
      <button className={classes.menuButton} onClick={onClickCabinet}>
        <img src={resellerReportIco} className={classes.ico} alt="reseller report button" />
        Отчет
      </button>
      <button className={classes.menuButton} onClick={onClickCabinet}>
        <img src={resellerDetailsReportIco} className={classes.ico} alt="reseller detailing button" />
        Детализация
      </button>
    </div>
  );
};

export default ResellerSection;
