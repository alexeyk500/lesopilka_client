import React from 'react';
import { normalizeDate } from '../../../utils/dateTimeFunctions';
import DateIntervalSelector from '../DateIntervalSelector/DateIntervalSelector';

type PropsType = {
  dateFrom: Date;
  dateTo: Date;
  onSelectDateFrom: (newDate: string) => void;
  onSelectDateTo: (newDate: string) => void;
};

const OrdersDateIntervalSelector: React.FC<PropsType> = ({ dateFrom, dateTo, onSelectDateFrom, onSelectDateTo }) => {
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
    />
  );
};

export default OrdersDateIntervalSelector;
