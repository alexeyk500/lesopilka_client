import React from 'react';
import classes from './ManufacturerDataPupUp.module.css';
import { ManufacturerType } from '../../../../../../../../types/types';

type PropsType = {
  manufacturer: ManufacturerType;
};

const ManufacturerDataPupUp: React.FC<PropsType> = ({ manufacturer }) => {
  return (
    <div className={classes.container}>
      <div className={classes.popUpTitle}>Данные организации поставщика</div>
      <div className={classes.row}>
        <div className={classes.title}>
          {'Название'}
          <div className={classes.separator}>-</div>
        </div>
        <div className={classes.subTitle}>{manufacturer.title}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>
          {'ИНН'}
          <div className={classes.separator}>-</div>
        </div>
        <div className={classes.subTitle}>{manufacturer.inn}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>
          {'Электронная почта'}
          <div className={classes.separator}>-</div>
        </div>
        <div className={classes.subTitle}>{manufacturer.email}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>
          {'Телефон'}
          <div className={classes.separator}>-</div>
        </div>
        <div className={classes.subTitle}>{manufacturer.phone}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>
          {'Почтовый индекс'}
          <div className={classes.separator}>-</div>
        </div>
        <div className={classes.subTitle}>{manufacturer.address.postIndex}</div>
      </div>

      <div className={classes.row}>
        <div className={classes.title}>
          {'Регион'}
          <div className={classes.separator}>-</div>
        </div>
        <div className={classes.subTitle}>{manufacturer.address.region.title}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>
          {'Локация'}
          <div className={classes.separator}>-</div>
        </div>
        <div className={classes.subTitle}>{manufacturer.address.location.title}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>
          {'Улица'}
          <div className={classes.separator}>-</div>
        </div>
        <div className={classes.subTitle}>{manufacturer.address.street}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>
          {'Дом'}
          <div className={classes.separator}>-</div>
        </div>
        <div className={classes.subTitle}>{manufacturer.address.building}</div>
      </div>
      {manufacturer.address.office && (
        <div className={classes.row}>
          <div className={classes.title}>
            {'Офис'}
            <div className={classes.separator}>-</div>
          </div>
          <div className={classes.subTitle}>{manufacturer.address.office}</div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerDataPupUp;
