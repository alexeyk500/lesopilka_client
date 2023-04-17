import React from 'react';
import ToolTip from '../../../../../../../components/commonComponents/ToolTip/ToolTip';
import classes from './UnsubscribeManufacturerBtn.module.css';
import cancelIco from '../../../../../../../img/cancelIco.svg';
import { ManufacturerType } from '../../../../../../../types/types';
import { showPortalPopUp } from '../../../../../../../components/PortalPopUp/PortalPopUp';
import { unregisterResellerManufacturerThunk } from '../../../../../../../store/resellerSlice';
import { useAppDispatch } from '../../../../../../../hooks/hooks';

type PropsType = {
  manufacturer: ManufacturerType;
};

const UnsubscribeManufacturerBtn: React.FC<PropsType> = ({ manufacturer }) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    showPortalPopUp({
      popUpContent: (
        <div className={classes.infoPopUpText}>
          {'\n\nПодтвердите\n\n'}
          <span className={classes.thinText}>
            {'открпеление производителя\nот списка закрепленных поставщиков.\n\n\n'}
          </span>
        </div>
      ),
      titleConfirmBtn: 'Открепить',
      customClassBottomBtnGroup: classes.customPopUpBottomBtnGroup,
      onClosePopUp: (result?: boolean | FormData | undefined) => {
        if (result) {
          const manufacturerId = manufacturer.id;
          const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
          if (manufacturerId && token) {
            dispatch(unregisterResellerManufacturerThunk({ manufacturerId, token }));
          }
        }
      },
    });
  };

  return (
    <ToolTip text={'Открепить поставщика'} customClass={classes.customTooltipIco}>
      <img src={cancelIco} className={classes.ico} onClick={onClick} alt="unsubscribe manufacturer" />
    </ToolTip>
  );
};

export default UnsubscribeManufacturerBtn;
