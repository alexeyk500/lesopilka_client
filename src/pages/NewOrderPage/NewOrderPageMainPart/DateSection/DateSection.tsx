import React, { useState } from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import classes from './DateSection.module.css';
import calendarBlueIco from '../../../../img/calendarBlueIco.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datapicker_style.css';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { selectorNewOrderDate, setDate } from '../../../../store/newOrderSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
registerLocale('ru', ru);

export const checkDateSection = (orderDate: Date) => {
  return !!orderDate;
};

const DateSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const orderDate = new Date(useAppSelector(selectorNewOrderDate));
  const isSectionCondition = checkDateSection(orderDate);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSetDate = (date: Date) => {
    dispatch(setDate(date.toISOString()));
    setIsOpen(false);
  };

  const handleCloseDatePicker = () => {
    setIsOpen(false);
  };

  return (
    <SectionContainer title={'Дата доставки'} completeCondition={isSectionCondition}>
      <div className={classes.datePickerContainer}>
        <DatePicker
          locale="ru"
          dateFormat="dd MMMM yyyy"
          selected={orderDate}
          onChange={handleSetDate}
          open={isOpen}
          onInputClick={toggleDatePicker}
          onClickOutside={handleCloseDatePicker}
          wrapperClassName={classes.wrapperDataPicker}
        />
        <img src={calendarBlueIco} className={classes.calendarIco} onClick={toggleDatePicker} alt="calendar" />
      </div>
    </SectionContainer>
  );
};

export default DateSection;
