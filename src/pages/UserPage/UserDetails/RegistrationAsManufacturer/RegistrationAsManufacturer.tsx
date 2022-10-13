import React from 'react';
import SectionContainer from "../SectionContainer/SectionContainer";
import classes from "./RegistrationAsManufacturer.module.css";
import ButtonComponent, {ButtonType} from "../../../../components/commonComponents/ButtonComponent/ButtonComponent";

const RegistrationAsManufacturer = () => {
  return (
    <SectionContainer title={'Доступ к продажам'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>
              {`Получить доступ к продажам`}
            </div>
            <div className={classes.title}>
              {`как производитель пиломатериалов`}
            </div>
          </div>
          <div className={classes.btnContainer}>
            <ButtonComponent title={'Доступ'} buttonType={ButtonType.SECONDARY} />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default RegistrationAsManufacturer;