import React from 'react';
import classes from './OrderToManufacturer.module.css';
import addToBasketIco from '../../../../../img/addToBasketIco.svg';
import downloadFileIco from '../../../../../img/downloadFileIco.svg';
import ButtonComponent, {
  ButtonType,
} from '../../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import BasketListItem from '../BasketListItem/BasketListItem';
import { ProductType } from '../../../../../types/types';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorUser } from '../../../../../store/userSlice';

type PropsType = {
  products: ProductType[];
};

const OrderToManufacturer: React.FC<PropsType> = ({ products }) => {
  const user = useAppSelector(selectorUser);

  return (
    <div className={classes.container}>
      <div className={classes.orderInfoRow}>
        <div className={classes.manufacturerInfo}>
          <div className={classes.rowTitle}>{user?.manufacturer?.title}</div>
          <div className={classes.rowTitle}>
            {user?.manufacturer?.address?.region.title}, {user?.manufacturer?.address?.location.title},{' '}
            {user?.manufacturer?.address?.street}, {`д.${user?.manufacturer?.address?.building}`}
            {user?.manufacturer?.address?.office && `, оф.${user?.manufacturer?.address?.office}`}
          </div>
          <div className={classes.rowTitle}>{user?.email}</div>
          <div className={classes.rowTitle}>{user?.manufacturer?.phone}</div>
        </div>
        <div className={classes.infoRowActions}>
          <div className={classes.actionContainer}>
            <img src={addToBasketIco} className={classes.addToBasketIco} alt="view" />
          </div>
          <div className={classes.actionContainer}>
            <img src={downloadFileIco} className={classes.downloadFileIco} alt="view" />
          </div>
        </div>
        <div className={classes.btnContainer}>
          <ButtonComponent title={'Оформить'} buttonType={ButtonType.GREEN} onClick={() => {}} />
        </div>
      </div>
      <div className={classes.delimiter} />
      <div className={classes.priceContentContainer}>
        {products.map((product, ind) => {
          return <BasketListItem key={ind} num={ind} product={product} />;
        })}
      </div>
      <div className={classes.delimiter} />
      <div className={classes.conclusionRow}>
        <div className={classes.allWeightTitle}>
          {`Вес: 254.8 кг`}
        </div>
        <div className={classes.allVolumeTitle}>
          {`Обьем: 12.1 м.куб.`}
        </div>
        <div className={classes.allSummTitle}>
          {`Сумма: 12678.90 руб.`}
        </div>

      </div>
    </div>
  );
};

export default OrderToManufacturer;
