import React, { useEffect, useState } from 'react';
import classes from './ResellerCabinetMain.module.css';
import ResellerManufacturersList from './ResellerManufacturersList/ResellerManufacturersList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getResellerManufacturersThunk,
  selectorResellerLicensesStatusOptionsId,
  selectorResellerManufacturers,
} from '../../../store/resellerSlice';
import { ManufacturerType } from '../../../types/types';
import { RESELLER_MANUFACTURER_STATUS_ATTENTION_DAYS, WELCOME_LICENSES_AMOUNT } from '../../../utils/constants';
import { getForecastDayAmount } from './ResellerManufacturersList/ResellerManufacturerListItem/ResellerManufacturerListItem';

const getFilteredResellerManufacturers = (
  licensesStatusOptionsId: number,
  resellerManufacturers: ManufacturerType[]
) => {
  if (licensesStatusOptionsId === 0) {
    return resellerManufacturers;
  } else if (licensesStatusOptionsId === 1) {
    return resellerManufacturers.filter((manufacturer) => {
      const forecastDayAmount = getForecastDayAmount(manufacturer);
      if (forecastDayAmount) {
        return forecastDayAmount > RESELLER_MANUFACTURER_STATUS_ATTENTION_DAYS && manufacturer.approved;
      }
      return false;
    });
  } else if (licensesStatusOptionsId === 2) {
    return resellerManufacturers.filter((manufacturer) => {
      const forecastDayAmount = getForecastDayAmount(manufacturer);
      if (forecastDayAmount) {
        return forecastDayAmount <= RESELLER_MANUFACTURER_STATUS_ATTENTION_DAYS && manufacturer.approved;
      }
      return false;
    });
  } else if (licensesStatusOptionsId === 3) {
    return resellerManufacturers.filter((manufacturer) => {
      const forecastDayAmount = getForecastDayAmount(manufacturer);
      return !forecastDayAmount;
    });
  } else if (licensesStatusOptionsId === 4) {
    return resellerManufacturers.filter((manufacturer) => {
      return !manufacturer.approved;
    });
  }
};

const ResellerCabinetMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const resellerManufacturers = useAppSelector(selectorResellerManufacturers);
  const licensesStatusOptionsId = useAppSelector(selectorResellerLicensesStatusOptionsId);

  const [resellerManufacturersList, setResellerManufacturersList] = useState<ManufacturerType[]>([]);

  useEffect(() => {
    const filteredResellerManufacturers =
      getFilteredResellerManufacturers(licensesStatusOptionsId, resellerManufacturers) || [];
    setResellerManufacturersList(filteredResellerManufacturers);
  }, [licensesStatusOptionsId, resellerManufacturers]);

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      dispatch(getResellerManufacturersThunk(token));
    }
  }, [dispatch]);
  return (
    <div className={classes.container}>
      {resellerManufacturers.length ? (
        <>
          <div className={classes.pageTitle}>{'Список закрепленных поставщиков'}</div>
          <ResellerManufacturersList manufacturers={resellerManufacturersList} />
        </>
      ) : (
        <div className={classes.noManufacturersContainer}>
          <div className={classes.noManufacturersTitle}>
            {'У вас еще нет поставщиков которых вы привели на площадку...'}
          </div>
          <div className={classes.noManufacturersAdvise}>
            <div className={classes.itemRow}>
              {`1) Найдите производителя или поставщика пиломатериалов в своем регионе.`}
            </div>
            <div className={classes.itemRow}>
              {`2) Договритесь с производителем о том, что он будет представлен на площадке.`}
            </div>
            <div className={classes.itemRow}>
              {`3) Заполните форму регистрации нового производителя через свой личный кабинет реселлера.
              (Кнопка "Новый поставщик" - в колонке слева )`}
            </div>
            <div className={classes.itemRow}>
              {`4) После регистрации поставщика в вашем кабинете реселлера, поставщику на почту
              будет отправленно письмо с инструкцией об активации личного кабинета поставщика `}
            </div>
            <div className={classes.itemRow}>
              {`5) Перейдя по ссылке из письма поставщик получит готовый аккаунт поставщика с его учетными данными,
              которые вы ранее заполнили в форме регистрации.`}
            </div>
            <div className={classes.itemRow}>
              {`6) Для поставщика сразу будет доступна возможность создавать карточки с пиломатериалами, а так же добавлено ${WELCOME_LICENSES_AMOUNT} привественных
              лицензий для публикации его первых товаров.`}
            </div>
            <div className={classes.itemRow}>
              {`7) После активации поставщиком своего личного кабинета, вы увидете этого поставщика в списке закрепленных за вами поставщиков пиломатериалов.
              В дальнейшем когда поставщик начнет использовать уже платные лицензии вы будете получать с этого свои комиссионные`}
            </div>
            <div className={classes.itemRow}>
              {`8) Вся статистика использования поставщиком лицензий будет доступна в вашем отчете ресллера`}
            </div>

            <div className={classes.manufacturerAdvantage}>
              <div className={classes.advantageTitle}>
                {`Памятка для реселлера: "Преимущества поставщика при работе через площадку"`}
              </div>
              <div className={classes.Advantage}>
                <div className={classes.itemRowAdvantage}>
                  {`- Площадка позволяет локальным производителям и поставщикам пиломатериалов сделать свои товары доступными для покупателей из других регионов.`}
                </div>
                <div className={classes.itemRowAdvantage}>
                  {`- Площадка позволяет поставщикам пиломатериалов круглосуточно принимать заказы от покупателей, вести учет поступивших заказов и их историю. `}
                </div>
                <div className={classes.itemRowAdvantage}>
                  {`- Для поставщика пиломатериалов площадка способна заменить персональный сайт. Поставщику доступны персональная витрина с его товарами. Ссылку на эту витрину он может разместить в рекламе или отправить в месенджере своим покупателям.`}
                </div>
                <div className={classes.itemRowAdvantage}>
                  {`- Площадка для поставщика пиломатериалов способна заменить отдел секретаря. В личном кабинете для поставщика доступен прайс-лист который он может скачать в формате PDF и распечатать на принтере. Ссылку на свой персональный прайс-лист поставщик так же может отправить своим покупателям`}
                </div>
                <div className={classes.itemRowAdvantage}>
                  {`- Публикация товаров на площадке имеет более разумную стоимость, чем на любых прочих досках обьявлений и каталогах.`}
                </div>
              </div>
            </div>
          </div>
        </div>

        // <span>
        // (это бесплатно и для того что бы поставщик начал продавать свои пиломатериалы через площадку
        // ему будут начисленны ${WELCOME_LICENSES_AMOUNT} приветственных лицензий
        // - одна лицензия позволяет опубликовать одну карточку товара на сутки)
        // </span>
      )}
    </div>
  );
};

export default ResellerCabinetMain;
