import React from 'react';
import ToolTip from '../../../../../../../components/commonComponents/ToolTip/ToolTip';
import classes from './SendEmailBtn.module.css';
import emailIco from '../../../../../../../img/emailIco.svg';

const SendEmailBtn: React.FC = () => {
  const onClick = () => {};

  return (
    <ToolTip text={'Написать письмо'} customClass={classes.customTooltipIco}>
      <img src={emailIco} className={classes.ico} onClick={onClick} alt="view order" />
    </ToolTip>
  );
};

export default SendEmailBtn;
