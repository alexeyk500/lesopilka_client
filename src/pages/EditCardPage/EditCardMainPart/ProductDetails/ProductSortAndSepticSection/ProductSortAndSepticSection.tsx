import React from 'react';
import { EditCardSectionsEnum, OptionsType, ProductCardType, SepticEnum } from '../../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorProductSorts } from '../../../../../store/catalogSlice';
import classes from './ProductSortAndSepticSection.module.css';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import SectionContainer from '../SectionContainer/SectionContainer';
import { selectorEditCard, updateProductThunk } from '../../../../../store/productSlice';

const getSortOptions = (sorts: OptionsType[]) => {
  const options: OptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...sorts);
  return options;
};

export const checkSortAndSepticSection = (editCard: ProductCardType) => {
  return !!editCard.sortId;
};

const antisepticOptions = [
  { id: 0, title: SepticEnum.noSeptic },
  { id: 1, title: SepticEnum.septic },
];

const ProductSortAndSepticSection = () => {
  const dispatch = useAppDispatch();
  const editCard = useAppSelector(selectorEditCard);
  const sorts = useAppSelector(selectorProductSorts);
  const sortsOption = getSortOptions(sorts);
  const selectedSortId = sortsOption.find((sort) => sort.id === editCard.sortId);

  const onChangeSortSelector = (id: number) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token && id) {
      const updateData = {
        productId: editCard.id,
        productSortId: id,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  const onChangeSepticSelector = (id: number) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      const updateData = {
        productId: editCard.id,
        isSeptic: id > 0 ? true : null,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  const isSortAndSepticSection = checkSortAndSepticSection(editCard);

  return (
    <SectionContainer
      title={EditCardSectionsEnum.sortAndSeptic}
      completeCondition={isSortAndSepticSection}
      blurCondition={false}
    >
      <div className={classes.rowContainer}>
        <SectionSelector
          title={'Сорт пиломатериала'}
          options={sortsOption}
          selectedOption={selectedSortId}
          onChangeSelector={onChangeSortSelector}
        />
        <SectionSelector
          title={'Обработка Антисептиком'}
          options={antisepticOptions}
          selectedOption={editCard.isSeptic ? antisepticOptions[1] : antisepticOptions[0]}
          onChangeSelector={onChangeSepticSelector}
        />
      </div>
    </SectionContainer>
  );
};

export default ProductSortAndSepticSection;
