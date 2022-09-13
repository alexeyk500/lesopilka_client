import React, { useCallback, useImperativeHandle, useRef } from 'react';
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
  oneCenterConfirmBtn?: boolean;
  hideCancelBottomBtn?: boolean;
  customBottomBtn?: React.ReactNode;
  customBottomBtnTwo?: React.ReactNode;
  customClassBottomBtnGroup?: string;
  withoutButtons?: boolean;
};

export interface PopupRef {
  closePopup: () => void;
}

const PortalPopUp = React.forwardRef<PopupRef, PropsType>(
  (
    {
      popUpContent,
      divId,
      popUpRoot,
      onClosePopUp,
      titleConfirmBtn,
      oneCenterConfirmBtn,
      hideCancelBottomBtn,
      customBottomBtn,
      customBottomBtnTwo,
      customClassBottomBtnGroup,
      withoutButtons,
    },
    ref
  ) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    console.log('customClassBottomBtnGroup =', customClassBottomBtnGroup);
    const customClassBtnGroup = classNames(customClassBottomBtnGroup);
    console.log('customClassBtnGroup =', customClassBtnGroup);

    const destroyPortalPopUp = useCallback(() => {
      popUpRoot.unmount();
      const div = document.getElementById(divId);
      if (div) {
        div.parentNode?.removeChild(div);
      }
    }, [divId, popUpRoot]);

    useImperativeHandle<PopupRef, PopupRef>(
      ref,
      () => ({
        closePopup() {
          onClosePopUp && onClosePopUp();
          destroyPortalPopUp();
        },
      }),
      [onClosePopUp, destroyPortalPopUp]
    );

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = formRef?.current;
      if (form && form.checkValidity()) {
        const formData = new FormData(form);
        if (formData) {
          const blockToClosePopUp = formData.get('blockToClosePopUp');
          if (blockToClosePopUp) {
            if (blockToClosePopUp === 'false') {
              onClosePopUp && onClosePopUp(formData);
              destroyPortalPopUp();
            }
          } else {
            onClosePopUp && onClosePopUp(formData);
            destroyPortalPopUp();
          }
        }
      } else {
        onClosePopUp && onClosePopUp(true);
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
          {!withoutButtons && !oneCenterConfirmBtn && (
            <button className={classes.topCloseBtn} type="reset">
              &times;
            </button>
          )}
          {popUpContent}
          {!withoutButtons && (
            <div
              className={classNames(classes.btnGroups, {
                [classes.oneCenterConfirmBtn]: oneCenterConfirmBtn,
                [customClassBtnGroup]: customClassBottomBtnGroup,
              })}
            >
              <ButtonComponent title={titleConfirmBtn ? titleConfirmBtn : 'Подтвердить'} type="submit" />
              {!hideCancelBottomBtn && !oneCenterConfirmBtn && (
                <ButtonComponent title="Отмена" buttonType={ButtonType.SECONDARY} type="reset" />
              )}
              {customBottomBtn && customBottomBtn}
              {customBottomBtnTwo && customBottomBtnTwo}
            </div>
          )}
        </div>
      </form>
    );
  }
);

export const showPortalPopUp = ({
  popUpContent,
  onClosePopUp,
  titleConfirmBtn,
  oneCenterConfirmBtn,
  hideCancelBottomBtn,
  customBottomBtn,
  customBottomBtnTwo,
  customClassBottomBtnGroup,
  ref,
  withoutButtons,
}: {
  popUpContent: React.ReactNode;
  onClosePopUp?: (result?: boolean | FormData) => void;
  titleConfirmBtn?: string;
  oneCenterConfirmBtn?: boolean;
  hideCancelBottomBtn?: boolean;
  customBottomBtn?: React.ReactNode;
  customBottomBtnTwo?: React.ReactNode;
  customClassBottomBtnGroup?: string;
  ref?: React.MutableRefObject<PopupRef | null>;
  withoutButtons?: boolean;
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
      titleConfirmBtn={titleConfirmBtn}
      oneCenterConfirmBtn={oneCenterConfirmBtn}
      hideCancelBottomBtn={hideCancelBottomBtn}
      customBottomBtn={customBottomBtn}
      customBottomBtnTwo={customBottomBtnTwo}
      customClassBottomBtnGroup={customClassBottomBtnGroup}
      withoutButtons={withoutButtons}
      ref={ref}
    />
  );
};
