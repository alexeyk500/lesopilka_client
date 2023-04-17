import React from 'react';
import ToolTip from '../../../../../../../components/commonComponents/ToolTip/ToolTip';
import classes from './UnsubscribeManufacturerBtn.module.css';
import cancelIco from '../../../../../../../img/cancelIco.svg';

const UnsubscribeManufacturerBtn: React.FC = () => {
  const onClick = () => {};

  return (
    <ToolTip text={'Открепить поставщика'} customClass={classes.customTooltipIco}>
      <img src={cancelIco} className={classes.ico} onClick={onClick} alt="view order" />
    </ToolTip>
  );
};

export default UnsubscribeManufacturerBtn;
