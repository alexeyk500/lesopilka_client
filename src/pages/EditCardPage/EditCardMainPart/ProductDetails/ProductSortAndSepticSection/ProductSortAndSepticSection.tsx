import React from 'react';
import { DriedEnum, EditCardSectionsEnum, OptionsType, ProductType, SepticEnum } from '../../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorProductSorts } from '../../../../../store/catalogSlice';
import classes from './ProductSortAndSepticSection.module.css';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import SectionContainer from '../SectionContainer/SectionContainer';
import { selectorEditProduct, updateProductThunk } from '../../../../../store/productSlice';

const getSortOptions = (sorts: OptionsType[]) => {
  const options: OptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...sorts);
  return options;
};

export const checkSortAndSepticSection = (product: ProductType) => {
  return !!product.sort?.id;
};

const antisepticOptions = [
  { id: 0, title: SepticEnum.noSeptic },
  { id: 1, title: SepticEnum.septic },
];

const driedOptions = [
  { id: 0, title: DriedEnum.noDried },
  { id: 1, title: DriedEnum.dried },
];

const ProductSortAndSepticSection = () => {
  const dispatch = useAppDispatch();
  const editProduct = useAppSelector(selectorEditProduct);
  const sorts = useAppSelector(selectorProductSorts);
  const sortsOption = getSortOptions(sorts);
  const selectedSortId = sortsOption.find((sort) => sort.id === editProduct.sort?.id);

  const onChangeSortSelector = (id: number) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token && id) {
      const updateData = {
        productId: editProduct.id,
        productSortId: id,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  const onChangeDriedSelector = (id: number) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      const updateData = {
        productId: editProduct.id,
        isDried: id > 0 ? true : null,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  const onChangeSepticSelector = (id: number) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      const updateData = {
        productId: editProduct.id,
        isSeptic: id > 0 ? true : null,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  const isSortAndSepticSection = checkSortAndSepticSection(editProduct);

  return (
    <SectionContainer
      title={EditCardSectionsEnum.sortAndSeptic}
      completeCondition={isSortAndSepticSection}
      blurCondition={false}
    >
      <div className={classes.rowContainer}>
        <SectionSelector
          title={'Сорт'}
          options={sortsOption}
          selectedOption={selectedSortId}
          onChangeSelector={onChangeSortSelector}
          dataTestId={'Сорт'}
        />
        <SectionSelector
          title={'Влажность'}
          options={driedOptions}
          selectedOption={editProduct.isDried ? driedOptions[1] : driedOptions[0]}
          onChangeSelector={onChangeDriedSelector}
          dataTestId={'Влажность'}
        />
        <SectionSelector
          title={'Обработка антисептиком'}
          options={antisepticOptions}
          selectedOption={editProduct.isSeptic ? antisepticOptions[1] : antisepticOptions[0]}
          onChangeSelector={onChangeSepticSelector}
          dataTestId={'Обработка антисептиком'}
        />
      </div>
    </SectionContainer>
  );
};

export default ProductSortAndSepticSection;
