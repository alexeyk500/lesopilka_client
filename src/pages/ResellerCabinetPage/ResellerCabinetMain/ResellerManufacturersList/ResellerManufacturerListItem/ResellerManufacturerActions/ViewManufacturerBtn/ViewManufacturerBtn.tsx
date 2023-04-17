import React from 'react';
import ToolTip from '../../../../../../../components/commonComponents/ToolTip/ToolTip';
import classes from './ViewManufacturerBtn.module.css';
import userDataIco from '../../../../../../../img/userDataIco.svg';
import { showPortalPopUp } from '../../../../../../../components/PortalPopUp/PortalPopUp';
import ManufacturerDataPupUp from './ManufacturerDataPupUp/ManufacturerDataPupUp';
import { ManufacturerType } from '../../../../../../../types/types';

type PropsType = {
  manufacturer: ManufacturerType;
};

const ViewManufacturerBtn: React.FC<PropsType> = ({ manufacturer }) => {
  const onClick = () => {
    showPortalPopUp({
      popUpContent: <ManufacturerDataPupUp manufacturer={manufacturer} />,
      titleConfirmBtn: 'Понятно',
      oneCenterConfirmBtn: true,
    });
  };

  return (
    <ToolTip text={'Данные поставщика'} customClass={classes.customTooltipIco}>
      <img src={userDataIco} className={classes.ico} onClick={onClick} alt="view manufacturer data" />
    </ToolTip>
  );
};

export default ViewManufacturerBtn;
