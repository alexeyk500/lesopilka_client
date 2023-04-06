import React from 'react';
import classes from './ResellerCabinetControls.module.css';
import { formatUTCtoDDMMMMYYYY, lastDigitToWord } from '../../../utils/dateTimeFunctions';
import LicensesStatusSelector from './LicensesStatusSelector/LicensesStatusSelector';
import IconButton from '../../../components/commonComponents/IconButton/IconButton';
import addManufacturerIco from '../../../img/addManufacturerIco.svg';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../components/AppRouter/AppRouter';

const publicationWords = ['публикация', 'публикации', 'публикаций'];

const ResellerCabinetControls: React.FC = () => {
  const navigate = useNavigate();
  const date = formatUTCtoDDMMMMYYYY(new Date().toString()).replace('.', 'ода');
  const publicationAmount = 9;
  const publicationAmountWord = lastDigitToWord(publicationAmount, publicationWords);

  const onClickCreateManufacturer = () => {
    navigate(PageEnum.ResellerCreateManufacturerPage);
  };

  return (
    <div className={classes.container}>
      <div className={classes.dateTitle}>{date}</div>
      <div className={classes.publicationAmountTitle}>{`${publicationAmount} ${publicationAmountWord}`}</div>
      <LicensesStatusSelector />
      <div className={classes.buttonContainer}>
        <IconButton
          ico={addManufacturerIco}
          title={'Новый поставщик'}
          customIconClasses={classes.priceIco}
          onClick={onClickCreateManufacturer}
        />
      </div>
      <div className={classes.bottomContainer}>
        <BottomButtonReturnTo returnTo={ReturnToEnum.rootPage} />
      </div>
    </div>
  );
};

export default ResellerCabinetControls;
