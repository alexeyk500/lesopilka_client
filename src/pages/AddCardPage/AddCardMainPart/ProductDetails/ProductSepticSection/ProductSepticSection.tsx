import React from 'react';
import SectionContainer from '../SectionContainer/SectionContainer';
import classes from '../CatalogSection/CatalogSection.module.css';
import CheckBoxBlue from '../../../../../components/commonComponents/CheckBoxBlue/CheckBoxBlue';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorNewCard, setNewCardIsSeptic } from '../../../../../store/newCardSlice';

const ProductSepticSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);

  const onSelect = (id: number) => {
    dispatch(setNewCardIsSeptic(!!id));
  };

  return (
    <SectionContainer title={'Обработка Антисептиком'} completeCondition={true} blurCondition={false}>
      <div className={classes.rowContainer}>
        <CheckBoxBlue id={0} title={'Нет'} checked={newCard.isSeptic === false} onSelect={onSelect} />
        <CheckBoxBlue id={1} title={'Обработан'} checked={newCard.isSeptic === true} onSelect={onSelect} />
      </div>
    </SectionContainer>
  );
};

export default ProductSepticSection;
