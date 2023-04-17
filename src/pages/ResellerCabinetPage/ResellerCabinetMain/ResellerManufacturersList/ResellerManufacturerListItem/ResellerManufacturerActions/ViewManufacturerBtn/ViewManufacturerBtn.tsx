import React from 'react';
import ToolTip from '../../../../../../../components/commonComponents/ToolTip/ToolTip';
import classes from './ViewManufacturerBtn.module.css';
import userDataIco from '../../../../../../../img/userDataIco.svg';

const ViewManufacturerBtn: React.FC = () => {
  const onClick = () => {};

  return (
    <ToolTip text={'Данные поставщика'} customClass={classes.customTooltipIco}>
      <img src={userDataIco} className={classes.ico} onClick={onClick} alt="view order" />
    </ToolTip>
  );
};

export default ViewManufacturerBtn;
