import React from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datapicker_style.css';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { selectorNewOrderDate, setDate } from '../../../../store/newOrderSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import DatePickerComponent from '../../../../components/commonComponents/DatePickerComponent/DatePickerComponent';
import { dateDayShift, dateMonthShift } from '../../../../utils/dateTimeFunctions';
import { MAX_MONTH_SHIFT_FOR_ORDERS } from '../../../../utils/constants';
registerLocale('ru', ru);

export const checkDateSection = (orderDate: Date) => {
  return !!orderDate;
};

const DateSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const orderDate = new Date(useAppSelector(selectorNewOrderDate));
  const isSectionCondition = checkDateSection(orderDate);
  const dateTodayStr = new Date().toISOString().split('T')[0];
  const minDate = dateDayShift(new Date(dateTodayStr), 1);
  const maxDate = dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_ORDERS);

  const handleSetDate = (newDate: Date) => {
    if (newDate >= minDate) {
      dispatch(setDate(newDate.toISOString()));
    }
  };

  return (
    <SectionContainer title={'Дата доставки'} completeCondition={isSectionCondition}>
      <DatePickerComponent selectedDate={orderDate} onSelectDate={handleSetDate} minDate={minDate} maxDate={maxDate} />
    </SectionContainer>
  );
};

export default DateSection;
