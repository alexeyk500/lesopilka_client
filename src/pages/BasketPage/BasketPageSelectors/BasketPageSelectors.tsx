import React from 'react';
import classes from './BasketPageSelectors.module.css';
import IconButton from '../../../components/commonComponents/IconButton/IconButton';
import warehouseWhiteIco from '../../../img/warehouseWhiteIco.svg';
import ButtonsSection from '../../../components/commonComponents/ButtonsSection/ButtonsSection';
import ButtonComponent from '../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorCatalogSearchParams } from '../../../store/productSlice';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../components/AppRouter/AppRouter';
import { ProductType } from '../../../types/types';

type PropsType = {
  productsByManufacturer: ProductType[][];
  manufacturersRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
};

const BasketPageSelectors: React.FC<PropsType> = ({ productsByManufacturer, manufacturersRef }) => {
  const navigate = useNavigate();
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);

  const onClickGoToCatalog = () => {
    if (catalogSearchParams) {
      navigate(`${PageEnum.RootPage}?${catalogSearchParams}`);
    } else {
      navigate(PageEnum.RootPage);
    }
  };

  const onClickScrollTo = (ind: number) => {
    manufacturersRef.current[ind]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>{'Корзина'}</div>
      <div className={classes.btnSectionContainer}>
        {!!productsByManufacturer.length &&
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
        }
      </div>

      <div className={classes.btnReadyContainer}>
        <ButtonComponent title={'В каталог'} onClick={onClickGoToCatalog} />
      </div>
    </div>
  );
};

export default BasketPageSelectors;
