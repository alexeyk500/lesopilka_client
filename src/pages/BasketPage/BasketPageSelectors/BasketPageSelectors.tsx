import React from 'react';
import classes from './BasketPageSelectors.module.css';
import IconButton from '../../../components/commonComponents/IconButton/IconButton';
import warehouseWhiteIco from '../../../img/warehouseWhiteIco.svg';
import ButtonsSection from '../../../components/commonComponents/ButtonsSection/ButtonsSection';
import ButtonComponent from '../../../components/commonComponents/ButtonComponent/ButtonComponent';
import {useAppSelector} from "../../../hooks/hooks";
import {selectorCatalogSearchParams} from "../../../store/productSlice";
import {useNavigate} from "react-router-dom";
import {PageEnum} from "../../../components/AppRouter/AppRouter";

const BasketPageSelectors: React.FC = () => {

  const navigate = useNavigate();
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);

  const onClickGoToCatalog = () => {
    if (catalogSearchParams) {
      navigate(`${PageEnum.RootPage}?${catalogSearchParams}`)
    } else {
      navigate(PageEnum.RootPage)
    }
  }

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
        <ButtonComponent title={'В каталог'} onClick={onClickGoToCatalog} />
      </div>
    </div>
  );
};

export default BasketPageSelectors;
