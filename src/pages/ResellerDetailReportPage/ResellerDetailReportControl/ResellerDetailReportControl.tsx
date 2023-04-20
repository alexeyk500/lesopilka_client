import React from 'react';
import classes from './ResellerDetailReportControl.module.css';
import DatePickerComponent from '../../../components/commonComponents/DatePickerComponent/DatePickerComponent';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  selectorResellerDetailReportDate,
  selectorResellerManufacturers,
  setResellerDetailReportDate,
} from '../../../store/resellerSlice';
import { lastDigitToWord } from '../../../utils/dateTimeFunctions';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';

const ResellerDetailReportControl = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectorResellerDetailReportDate);

  const resellerManufacturers = useAppSelector(selectorResellerManufacturers);
  const publicationAmount = resellerManufacturers.reduce((acc, manufacturer) => {
    const activeCardsAmount = manufacturer?.activeCards ? manufacturer.activeCards : 0;
    return acc + activeCardsAmount;
  }, 0);
  const publicationAmountWord = lastDigitToWord(publicationAmount, ['публикация', 'публикации', 'публикаций']);

  const onSelectDate = (date: Date) => {
    dispatch(setResellerDetailReportDate(date.toISOString()));
  };

  return (
    <div className={classes.container}>
      <div className={classes.dateSelectorRow}>
        <DatePickerComponent
          selectedDate={new Date(date)}
          onSelectDate={onSelectDate}
          customClasses={classes.customDatePicker}
        />
      </div>
      <div className={classes.middleSpreadContainer}>
        <div className={classes.publicationAmountTitle}>{`${publicationAmount} ${publicationAmountWord}`}</div>
      </div>
      <div className={classes.bottomContainer}>
        <BottomButtonReturnTo returnTo={ReturnToEnum.mainPage} />
      </div>
    </div>
  );
};

export default ResellerDetailReportControl;
