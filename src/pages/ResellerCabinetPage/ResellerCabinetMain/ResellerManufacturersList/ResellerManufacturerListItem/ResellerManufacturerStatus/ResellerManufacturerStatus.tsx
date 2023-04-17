import React from 'react';
import classes from './ResellerManufacturerStatus.module.css';
import classNames from 'classnames';
import { ResellerManufacturerStatusEnum } from '../../../../../../types/types';
import { RESELLER_MANUFACTURER_STATUS_ATTENTION_DAYS } from '../../../../../../utils/constants';

type PropsType = {
  forecastDayAmount?: number;
  isApproved?: boolean;
};

const getStatusEnum = ({ forecastDayAmount, isApproved }: { forecastDayAmount?: number; isApproved?: boolean }) => {
  if (!isApproved) {
    return ResellerManufacturerStatusEnum.blocked;
  }
  if (forecastDayAmount) {
    if (forecastDayAmount <= 0) {
      return ResellerManufacturerStatusEnum.noPublication;
    } else if (forecastDayAmount <= RESELLER_MANUFACTURER_STATUS_ATTENTION_DAYS) {
      return ResellerManufacturerStatusEnum.attention;
    }
    return ResellerManufacturerStatusEnum.normal;
  } else {
    return ResellerManufacturerStatusEnum.noPublication;
  }
};

const ResellerManufacturerStatus: React.FC<PropsType> = ({ forecastDayAmount, isApproved }) => {
  const statusEnum = getStatusEnum({ forecastDayAmount, isApproved });
  return (
    <div
      className={classNames(classes.container, {
        [classes.statusBlocked]: statusEnum === ResellerManufacturerStatusEnum.blocked,
        [classes.statusNormal]: statusEnum === ResellerManufacturerStatusEnum.normal,
        [classes.statusAttention]: statusEnum === ResellerManufacturerStatusEnum.attention,
        [classes.statusNoPublication]: statusEnum === ResellerManufacturerStatusEnum.noPublication,
      })}
    >
      <div className={classes.statusTitle}>{statusEnum}</div>
    </div>
  );
};

export default ResellerManufacturerStatus;
