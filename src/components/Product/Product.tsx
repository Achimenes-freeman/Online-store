import ClassNames from 'classnames';

import ProductImages from '../ProductImages/ProductImages';

import Button from '../../generics/Button/Button';
import { IProductData } from '../ProductPage/types';

import styles from './style.module.scss';
import RateIcon from '../../assets/icons/Rating.svg';
import CategoryIcon from '../../assets/icons/Category.svg';
import StockIcon from '../../assets/icons/Stock.svg';

function Product(props: IProductData) {
    const {
        title,
        description,
        price,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
    } = { ...props };

    return (
        <div className={styles.Product}>
            <div className={styles.presentation}>
                <ProductImages thumbnail={thumbnail} images={images} />
            </div>

            <div className={styles.info}>
                <div
                    className={ClassNames(
                        styles.infoContainer,
                        styles.infoName
                    )}
                >
                    <h3 className={styles.infoTitle}>{title}</h3>
                    <p className={styles.infoBrand}>{brand}</p>
                </div>

                <p className={styles.infoDescription}>{description}</p>

                <div
                    className={ClassNames(styles.infoContainer, styles.infoRSC)}
                >
                    <div className={styles.infoRSCItem}>
                        <img
                            className={styles.infoRSCIcon}
                            src={RateIcon}
                            alt=""
                        />
                        <p className={styles.infoRSCText}>{rating}</p>
                    </div>
                    <div className={styles.infoRSCItem}>
                        <img
                            className={styles.infoRSCIcon}
                            src={StockIcon}
                            alt=""
                        />
                        <p className={styles.infoRSCText}>
                            <span className={styles.fwRegular}>Stock:</span>{' '}
                            {stock}
                        </p>
                    </div>
                    <div className={styles.infoRSCItem}>
                        <img
                            className={styles.infoRSCIcon}
                            src={CategoryIcon}
                            alt=""
                        />
                        <p className={styles.infoRSCText}>{category}</p>
                    </div>
                </div>

                <div className={ClassNames(styles.infoContainer, styles.price)}>
                    <p className={styles.infoPrice}>{price}$</p>
                    <Button callback={() => {}}>by now</Button>
                    <Button callback={() => {}} isReverse>
                        add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Product;
