import React from 'react';
import classes from './UserPriceSelectors.module.css';
import ButtonsSection from '../../../components/commonComponents/ButtonsSection/ButtonsSection';
import IconButton from '../../../components/commonComponents/IconButton/IconButton';
import downloadIco from '../../../img/downloadFileWhiteIco.svg';
import { setPriceDownLoading } from '../../../store/priceSlice';
import { serverApi } from '../../../api/serverApi';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';

const UserPriceSelectors: React.FC = () => {
  const { mid } = useParams();
  const dispatch = useAppDispatch();

  const onClickDownload = async () => {
    if (mid && Number(mid) > 0) {
      dispatch(setPriceDownLoading(true));
      const response = await serverApi.getPricePDF(Number(mid));
      const blob = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank_');
      dispatch(setPriceDownLoading(false));
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.priceSectionContainer}>
        <ButtonsSection title={'Прайс'}>
          <IconButton
            ico={downloadIco}
            title={'Скачать'}
            customIconClasses={classes.downloadIco}
            onClick={onClickDownload}
          />
        </ButtonsSection>
      </div>
      <div className={classes.bottomContainer}>
        <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
      </div>
    </div>
  );
};

export default UserPriceSelectors;
