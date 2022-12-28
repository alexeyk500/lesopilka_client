import React from 'react';
import classes from './OrderToManufacturer.module.css';
import addToBasketIco from '../../../../../img/addToBasketIco.svg';
import downloadFileIco from '../../../../../img/downloadFileIco.svg';
import ButtonComponent, {
  ButtonType,
} from '../../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import OrderToManufacturerItem from './OrderToManufacturerItem/OrderToManufacturerItem';
import { ProductType } from '../../../../../types/types';
import { getTotalLogisticInfo, isAllProductAvailable } from '../../../../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../../../components/AppRouter/AppRouter';
import classNames from 'classnames';

type PropsType = {
  products: ProductType[];
  hideButtons?: boolean;
};

const OrderToManufacturer: React.FC<PropsType> = ({ products, hideButtons }) => {
  const navigate = useNavigate();
  const manufacturer = products?.[0]?.manufacturer;

  const { totalWeight, totalVolume, totalSumm } = getTotalLogisticInfo(products);
  const allProductAvailable = isAllProductAvailable(products);

  const goToPrice = () => {
    if (manufacturer?.id) {
      navigate(`${PageEnum.UserPricePage}/${manufacturer.id}`);
    }
  };

  const onClickCreateOrder = () => {
    if (manufacturer?.id) {
      navigate(`${PageEnum.NewOrder}/${manufacturer.id}`);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.orderInfoRow}>
        <div className={classes.manufacturerInfo}>
          <div className={classes.rowTitle}>{manufacturer?.title}</div>
          <div className={classes.rowTitle}>
            {manufacturer?.address?.region.title}, {manufacturer?.address?.location.title},{' '}
            {manufacturer?.address?.street}, {`д.${manufacturer?.address?.building}`}
            {manufacturer?.address?.office && `, оф.${manufacturer?.address?.office}`}
          </div>
          <div className={classes.rowTitle}>{manufacturer?.email}</div>
          <div className={classes.rowTitle}>{manufacturer?.phone}</div>
        </div>
        <div className={classNames(classes.infoRowActions, { [classes.infoRowActionsSingleButton]: hideButtons })}>
          <div className={classes.actionContainer}>
            <img src={addToBasketIco} className={classes.addToBasketIco} onClick={goToPrice} alt="add to basket" />
          </div>
          {!hideButtons && (
            <div className={classes.actionContainer}>
              <img src={downloadFileIco} className={classes.downloadFileIco} alt="download" />
            </div>
          )}
        </div>
        {!hideButtons && (
          <div className={classes.btnContainer}>
            {allProductAvailable ? (
              <ButtonComponent title={'Оформить'} buttonType={ButtonType.GREEN} onClick={onClickCreateOrder} />
            ) : (
              <ButtonComponent title={'Оформить'} buttonType={ButtonType.GRAY} />
            )}
          </div>
        )}
      </div>
      <div className={classes.delimiter} />
      <div className={classes.priceContentContainer}>
        {products.map((product, ind) => {
          return <OrderToManufacturerItem key={ind} num={ind + 1} product={product} />;
        })}
      </div>
      <div className={classes.delimiter} />
      <div className={classes.conclusionRow}>
        <div className={classes.allWeightTitle}>{`Вес: ${totalWeight} кг`}</div>
        <div className={classes.allVolumeTitle}>{`Обьем: ${totalVolume} м.куб.`}</div>
        <div className={classes.allSummTitle}>{`Сумма: ${totalSumm} руб.`}</div>
      </div>
    </div>
  );
};

export default OrderToManufacturer;
