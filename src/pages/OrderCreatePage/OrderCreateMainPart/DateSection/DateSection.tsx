import React, { useState } from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import classes from './DateSection.module.css';
import calendarBlueIco from '../../../../img/calendarBlueIco.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datapicker_style.css';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

const DateSection: React.FC = () => {
  const [newOrderDate, setNewOrderDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSetDate = (date: Date) => {
    setNewOrderDate(date);
    setIsOpen(false);
  };

  const handleCloseDatePicker = () => {
    setIsOpen(false);
  };

  return (
    <SectionContainer title={'Дата доставки'} completeCondition={true}>
      <div className={classes.datePickerContainer}>
        <DatePicker
          locale="ru"
          dateFormat="dd MMMM yyyy"
          selected={newOrderDate}
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
