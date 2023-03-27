import React from 'react';
import { normalizeDate } from '../../../utils/dateTimeFunctions';
import DateIntervalSelector from '../DateIntervalSelector/DateIntervalSelector';

type PropsType = {
  minDate?: Date;
  maxDate?: Date;
  dateFrom: Date;
  dateTo: Date;
  onSelectDateFrom: (newDate: string) => void;
  onSelectDateTo: (newDate: string) => void;
};

const OrdersDateIntervalSelector: React.FC<PropsType> = ({
  minDate,
  maxDate,
  dateFrom,
  dateTo,
  onSelectDateFrom,
  onSelectDateTo,
}) => {
  const handleSetDateFrom = (newDate: Date) => {
    onSelectDateFrom(normalizeDate(newDate).toISOString());
  };

  const handleSetDateTo = (newDate: Date) => {
    onSelectDateTo(normalizeDate(newDate).toISOString());
  };

  return (
    <DateIntervalSelector
      title={'Пероид поставки'}
      dateFrom={dateFrom}
      onSelectDateFrom={handleSetDateFrom}
      dateTo={dateTo}
      onSelectDateTo={handleSetDateTo}
      minDateFrom={minDate}
      maxDateFrom={maxDate}
      minDateTo={minDate}
      maxDateTo={maxDate}
    />
  );
};

export default OrdersDateIntervalSelector;
