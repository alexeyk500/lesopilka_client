import React from 'react';
import ToolTip from '../../../../../../../components/commonComponents/ToolTip/ToolTip';
import classes from './SendEmailBtn.module.css';
import emailIco from '../../../../../../../img/emailIco.svg';
import { ManufacturerType } from '../../../../../../../types/types';

type PropsType = {
  manufacturer: ManufacturerType;
};

const SendEmailBtn: React.FC<PropsType> = ({ manufacturer }) => {
  const onClick = () => {
    if (manufacturer.email) {
      window.open(`mailto:${manufacturer.email}?subject=Сообщение от реселлера`);
    }
  };

  return (
    <ToolTip text={'Написать письмо'} customClass={classes.customTooltipIco}>
      <img src={emailIco} className={classes.ico} onClick={onClick} alt="send email" />
    </ToolTip>
  );
};

export default SendEmailBtn;
