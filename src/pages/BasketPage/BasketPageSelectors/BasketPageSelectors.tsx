import React from 'react';
import classes from './BasketPageSelectors.module.css';
import IconButton from '../../../components/commonComponents/IconButton/IconButton';
import warehouseWhiteIco from '../../../img/warehouseWhiteIco.svg';
import ButtonsSection from '../../../components/commonComponents/ButtonsSection/ButtonsSection';
import { ProductType } from '../../../types/types';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';

type PropsType = {
  productsByManufacturer: ProductType[][];
  manufacturersRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
};

const BasketPageSelectors: React.FC<PropsType> = ({ productsByManufacturer, manufacturersRef }) => {
  const onClickScrollTo = (ind: number) => {
    manufacturersRef.current[ind]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>{'Корзина'}</div>
      <div className={classes.btnSectionContainer}>
        {!!productsByManufacturer.length && (
          <ButtonsSection title={'Поставщики'}>
            {productsByManufacturer.map((manufacturerProduct, ind) => (
              <IconButton
                key={ind}
                ico={warehouseWhiteIco}
                title={manufacturerProduct[0].manufacturer?.title || ''}
                secondRow={manufacturerProduct[0].manufacturer?.address.location.title || ''}
                customIconClasses={classes.warehouseWhiteIco}
                onClick={() => onClickScrollTo(ind)}
              />
            ))}
          </ButtonsSection>
        )}
      </div>
      <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
    </div>
  );
};

export default BasketPageSelectors;
