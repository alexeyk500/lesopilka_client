import React, { useRef } from 'react';
import classes from './PortalPopUp.module.css';
import { createRoot, Root } from 'react-dom/client';
import classNames from 'classnames';
import ButtonComponent, { ButtonType } from '../commonComponents/ButtonComponent/ButtonComponent';

type PropsType = {
  divId: string;
  popUpRoot: Root;
  popUpContent: React.ReactNode;
  onClosePopUp?: (result?: boolean | FormData) => void;
  titleConfirmBtn?: string;
  hideCancelBottomBtn?: boolean;
  customBottomBtn?: React.ReactNode;
  customBottomBtnTwo?: React.ReactNode;
  customClassBottomBtnGroup?: string;
};

const PortalPopUp: React.FC<PropsType> = ({
  popUpContent,
  divId,
  popUpRoot,
  onClosePopUp,
  titleConfirmBtn,
  hideCancelBottomBtn,
  customBottomBtn,
  customBottomBtnTwo,
  customClassBottomBtnGroup,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const customClassBtnGroup = classNames(customClassBottomBtnGroup);

  const destroyPortalPopUp = () => {
    popUpRoot.unmount();
    const div = document.getElementById(divId);
    if (div) {
      div.parentNode?.removeChild(div);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef?.current;
    if (form && form.checkValidity()) {
      const formData = new FormData(form);
      if (!!formData.entries().next().value) {
        onClosePopUp && onClosePopUp(formData);
      } else {
        onClosePopUp && onClosePopUp(true);
      }
      destroyPortalPopUp();
    }
  };

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClosePopUp && onClosePopUp();
    destroyPortalPopUp();
  };

  return (
    <form ref={formRef} className={classes.container} onSubmit={onSubmit} onReset={onReset}>
      <div className={classes.content}>
        <button className={classes.topCloseBtn} type="reset">
          &times;
        </button>
        {popUpContent}
        <div className={classNames(classes.btnGroups, { [customClassBtnGroup]: customClassBottomBtnGroup })}>
          <ButtonComponent title={titleConfirmBtn ? titleConfirmBtn : 'Подтвердить'} type="submit" />
          {!hideCancelBottomBtn && <ButtonComponent title="Отмена" buttonType={ButtonType.SECONDARY} type="reset" />}
          {customBottomBtn && customBottomBtn}
          {customBottomBtnTwo && customBottomBtnTwo}
        </div>
      </div>
    </form>
  );
};

export const showPortalPopUp = ({
  popUpContent,
  onClosePopUp,
  hideCancelBottomBtn,
  customBottomBtn,
  customBottomBtnTwo,
  customClassBottomBtnGroup,
}: {
  popUpContent: React.ReactNode;
  onClosePopUp?: (result?: boolean | FormData) => void;
  hideCancelBottomBtn?: boolean;
  customBottomBtn?: React.ReactNode;
  customBottomBtnTwo?: React.ReactNode;
  customClassBottomBtnGroup?: string;
}) => {
  const div = document.createElement('div');
  div.id = 'popup' + new Date().getTime();
  document.body.append(div);
  const popUpContainer = document.getElementById(div.id)!;
  const popUpRoot = createRoot(popUpContainer);
  popUpRoot.render(
    <PortalPopUp
      popUpContent={popUpContent}
      divId={div.id}
      popUpRoot={popUpRoot}
      onClosePopUp={onClosePopUp}
      hideCancelBottomBtn={hideCancelBottomBtn}
      customBottomBtn={customBottomBtn}
      customBottomBtnTwo={customBottomBtnTwo}
      customClassBottomBtnGroup={customClassBottomBtnGroup}
    />
  );
};
