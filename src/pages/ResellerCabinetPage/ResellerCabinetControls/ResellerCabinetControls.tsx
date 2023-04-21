import React from 'react';
import classes from './ResellerCabinetControls.module.css';
import { formatUTCtoDDMMMMYYYY, lastDigitToWord } from '../../../utils/dateTimeFunctions';
import LicensesStatusSelector from './LicensesStatusSelector/LicensesStatusSelector';
import IconButton from '../../../components/commonComponents/IconButton/IconButton';
import addManufacturerIco from '../../../img/addManufacturerIco.svg';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../components/AppRouter/AppRouter';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorResellerManufacturers } from '../../../store/resellerSlice';
import classNames from 'classnames';

const publicationWords = ['публикация', 'публикации', 'публикаций'];

const ResellerCabinetControls: React.FC = () => {
  const navigate = useNavigate();
  const resellerManufacturers = useAppSelector(selectorResellerManufacturers);
  const publicationAmount = resellerManufacturers.reduce((acc, manufacturer) => {
    const activeCardsAmount = manufacturer?.activeCards ? manufacturer.activeCards : 0;
    return acc + activeCardsAmount;
  }, 0);
  const date = formatUTCtoDDMMMMYYYY(new Date().toString()).replace('.', 'ода');
  const publicationAmountWord = lastDigitToWord(publicationAmount, publicationWords);

  const onClickCreateManufacturer = () => {
    navigate(PageEnum.ResellerCreateManufacturerPage);
  };

  return (
    <div className={classes.container}>
      <div className={classes.dateTitle}>{date}</div>
      {!!resellerManufacturers.length && (
        <>
          <div className={classes.publicationAmountTitle}>{`${publicationAmount} ${publicationAmountWord}`}</div>
          <LicensesStatusSelector />
        </>
      )}
      <div className={classNames(classes.buttonContainer, { [classes.buttonCenter]: !resellerManufacturers.length })}>
        <IconButton
          ico={addManufacturerIco}
          title={'Новый поставщик'}
          customIconClasses={classes.priceIco}
          onClick={onClickCreateManufacturer}
        />
      </div>
      <div className={classes.bottomContainer}>
        <BottomButtonReturnTo returnTo={ReturnToEnum.mainPage} />
      </div>
    </div>
  );
};

export default ResellerCabinetControls;
