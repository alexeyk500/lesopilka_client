import React from 'react';
import classes from './BasketPageSelectors.module.css';
import IconButton from '../../../components/commonComponents/IconButton/IconButton';
import warehouseWhiteIco from '../../../img/warehouseWhiteIco.svg';
import ButtonsSection from '../../../components/commonComponents/ButtonsSection/ButtonsSection';
import ButtonComponent from '../../../components/commonComponents/ButtonComponent/ButtonComponent';

const BasketPageSelectors: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{'Корзина'}</div>
      <div className={classes.btnSectionContainer}>
        <ButtonsSection title={'Поставщики'}>
          <IconButton
            ico={warehouseWhiteIco}
            title={'ООО Лесопилка'}
            secondRow={'г.Самара'}
            customIconClasses={classes.warehouseWhiteIco}
            onClick={() => {}}
          />
          <IconButton
            ico={warehouseWhiteIco}
            title={'ООО Четко пилим пиломатериалы'}
            secondRow={'г.Пушкин и его окрестности'}
            customIconClasses={classes.warehouseWhiteIco}
            onClick={() => {}}
          />
        </ButtonsSection>
      </div>

      <div className={classes.btnReadyContainer}>
        <ButtonComponent title={'В каталог'} onClick={() => {}} />
      </div>
    </div>
  );
};

export default BasketPageSelectors;
