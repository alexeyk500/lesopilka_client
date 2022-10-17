import React, { useState } from 'react';
import classes from './ManufacturerDataForm.module.css';
import Selector from '../../../../../components/commonComponents/Selector/Selector';
import { SelectOptionsType } from '../../../../../types/types';

type PropsType = {
  regionsOptions: SelectOptionsType[];
};

const ManufacturerDataForm: React.FC<PropsType> = ({ regionsOptions }) => {
  const onChangeRegion = (id: number) => {
    let selectedOption: SelectOptionsType | undefined;
    if (id > 0) {
      selectedOption = regionsOptions.find((option) => option.id === id);
    }
    setSelectedOption(selectedOption);
  };

  const [selectedOption, setSelectedOption] = useState<SelectOptionsType | undefined>(undefined);

  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Введите данные поставщика пиломатериалов'}</div>
        <div className={classes.field}>
          <label className={classes.label}>
            Название организации поставщика
            <input
              className={classes.input}
              name="name"
              type="text"
              placeholder={'Введите название организации поставщика'}
              required
            />
          </label>
        </div>

        <div className={classes.field}>
          <label className={classes.label}>
            ИНН организации поставщика
            <input
              className={classes.input}
              name="inn"
              type="text"
              placeholder={'Введите ИНН организации поставщика'}
              required
            />
          </label>
        </div>

        <div className={classes.field}>
          <label className={classes.label}>
            <input
              className={classes.inputInvisible}
              name="locationId"
              defaultValue={selectedOption ? selectedOption.id : undefined}
              required
            />
            <div className={classes.selectorContainer}>
              <div className={classes.selectorLabel}>{`Местоположение \nорганизации поставщика`}</div>
              <Selector
                options={regionsOptions}
                selectedOption={selectedOption}
                onChange={onChangeRegion}
                customClassName={classes.selector}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerDataForm;
