import React from 'react';
import classes from '../MenuContent.module.css';
import resellerCabinetIco from '../../../../../img/resellerCabinetIco.svg';
import resellerReportIco from '../../../../../img/resellerReportIco.svg';
import resellerDetailsReportIco from '../../../../../img/resellerDetailsReportIco.svg';
import { PageEnum } from '../../../../AppRouter/AppRouter';
import { useNavigate } from 'react-router-dom';
import { setResellerDetailReportBackwardRoute, setResellerDetailReportDate } from '../../../../../store/resellerSlice';
import { useAppDispatch } from '../../../../../hooks/hooks';

type PropsType = {
  closeMenuContent: () => void;
};

const ResellerSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickCabinet = () => {
    navigate(PageEnum.ResellerCabinetPage);
    closeMenuContent();
  };

  const onClickReport = () => {
    navigate(PageEnum.ResellerReportPage);
    closeMenuContent();
  };

  const onClickReportDetails = () => {
    const nowDate = new Date();
    dispatch(setResellerDetailReportBackwardRoute(PageEnum.MainPage));
    dispatch(setResellerDetailReportDate(nowDate.toISOString()));
    navigate(PageEnum.ResellerReportDetailsPage);
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Реселлер
      <button className={classes.menuButton} onClick={onClickCabinet}>
        <img src={resellerCabinetIco} className={classes.ico} alt="reseller cabinet button" />
        Кабинет
      </button>
      <button className={classes.menuButton} onClick={onClickReport}>
        <img src={resellerReportIco} className={classes.ico} alt="reseller report button" />
        Отчет
      </button>
      <button className={classes.menuButton} onClick={onClickReportDetails}>
        <img src={resellerDetailsReportIco} className={classes.ico} alt="reseller report details button" />
        Детализация
      </button>
    </div>
  );
};

export default ResellerSection;
