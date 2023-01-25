import React, { useState } from 'react';
import classes from './DatePickerComponent.module.css';
import DatePicker from 'react-datepicker';
import calendarBlueIco from '../../../img/calendarBlueIco.svg';
import classNames from 'classnames';
import { showErrorPopUp } from '../../InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { formatUTCtoDDMMMMYYYY } from '../../../utils/dateTimeFunctions';

type PropsType = {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  customClasses?: string;
};

const DatePickerComponent: React.FC<PropsType> = ({
  selectedDate = null,
  onSelectDate,
  minDate,
  maxDate,
  customClasses,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const showOverMaxDate = () => {
    showErrorPopUp(`Максимальная дата для выбора - ${formatUTCtoDDMMMMYYYY(maxDate!.toISOString())}`, () => {
      setIsOpen(true);
    });
  };
  const showUndoMinDate = () => {
    showErrorPopUp(`Минимальная дата для выбора - ${formatUTCtoDDMMMMYYYY(minDate!.toISOString())}`, () => {
      setIsOpen(true);
    });
    setIsOpen(true);
  };

  const handleSetDate = (date: Date) => {
    if (date && onSelectDate) {
      if (minDate) {
        if (date >= minDate) {
          if (maxDate) {
            if (date <= maxDate) {
              onSelectDate(date);
              setIsOpen(false);
            } else {
              showOverMaxDate();
            }
          } else {
            onSelectDate(date);
            setIsOpen(false);
          }
        } else {
          showUndoMinDate();
        }
      } else {
        if (maxDate) {
          if (date <= maxDate) {
            onSelectDate(date);
            setIsOpen(false);
          } else {
            showOverMaxDate();
          }
        }
        onSelectDate(date);
        setIsOpen(false);
      }
    }
  };

  const handleCloseDatePicker = () => {
    setIsOpen(false);
  };

  const customClassesContainer = classNames(customClasses);

  return (
    <div className={classNames(classes.datePickerContainer, { [customClassesContainer]: customClasses })}>
      <DatePicker
        locale="ru"
        dateFormat="dd MMMM yyyy"
        selected={selectedDate}
        onChange={handleSetDate}
        open={isOpen}
        onInputClick={toggleDatePicker}
        onClickOutside={handleCloseDatePicker}
      />
      <img src={calendarBlueIco} className={classes.calendarIco} onClick={toggleDatePicker} alt="calendar" />
    </div>
  );
};

export default DatePickerComponent;
