import React, { useState } from 'react';
import classes from './SearchLocation.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import { SelectOptionsType } from '../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorRegions, selectorSearchLocationsByRegionId } from '../../../../store/addressSlice';
import PlaceSelector from '../../../../components/commonComponents/PlaceSelector/PlaceSelector';
import { getOptionsWithFirstEmptyOption } from '../../../../utils/functions';

const SearchLocation: React.FC = () => {
  const dispatch = useAppDispatch();

  const regions = useAppSelector(selectorRegions);
  const regionsOptions = getOptionsWithFirstEmptyOption(regions);

  const locationsByRegionId = useAppSelector(selectorSearchLocationsByRegionId);

  const onChangeRegion = (id: number) => {
    if (id > 0) {
      const selectedOption = regionsOptions.find((option) => option.id === id);
      setSelectedRegionOption(selectedOption);
    } else {
      setSelectedRegionOption(undefined);
    }
  };

  const [selectedRegionOption, setSelectedRegionOption] = useState<SelectOptionsType | undefined>(undefined);

  return (
    <SectionContainer title={'Территориальный поиск'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.field}>
            <label className={classes.label}>
              <input
                className={classes.inputInvisible}
                name="searchLocationId"
                defaultValue={selectedRegionOption ? selectedRegionOption.id : undefined}
                required
              />
              <div className={classes.selectorContainer}>
                <div className={classes.selectorLabel}>{`Поиск товаров начинать с территории`}</div>
                <PlaceSelector
                  regionsOptions={regionsOptions}
                  selectedRegionOption={selectedRegionOption}
                  onChangeRegion={onChangeRegion}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default SearchLocation;
