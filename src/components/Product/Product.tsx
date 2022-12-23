import ClassNames from 'classnames';

import ProductImages from '../ProductImages/ProductImages';

import { IProductData } from '../ProductPage/types';

import styles from './style.module.scss';
import RateIcon from '../../assets/icons/Rating.svg';
import CategoryIcon from '../../assets/icons/Category.svg';
import StockIcon from '../../assets/icons/Stock.svg';

function Product(props: IProductData) {
    const {
        id,
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
        <div className={styles.Product} id={id.toString()}>
            <div className={styles.ProductPresentation}>
                <ProductImages thumbnail={thumbnail} images={images} />
            </div>

            <div className={styles.ProductInfo}>
                <div
                    className={ClassNames(
                        styles.ProductInfoContainer,
                        styles.ProductInfoName
                    )}
                >
                    <h3 className={styles.ProductInfoTitle}>{title}</h3>
                    <p className={styles.ProductInfoBrand}>{brand}</p>
                </div>

                <p className={styles.ProductInfoDescription}>{description}</p>

                <div
                    className={ClassNames(
                        styles.ProductInfoContainer,
                        styles.ProductInfoRSC
                    )}
                >
                    <div className={styles.ProductInfoRSCItem}>
                        <img
                            className={styles.ProductInfoRSCIcon}
                            src={RateIcon}
                            alt=""
                        />
                        <p className={styles.ProductInfoRSCText}>{rating}</p>
                    </div>
                    <div className={styles.ProductInfoRSCItem}>
                        <img
                            className={styles.ProductInfoRSCIcon}
                            src={StockIcon}
                            alt=""
                        />
                        <p className={styles.ProductInfoRSCText}>
                            <span>Stock: </span>
                            {stock}
                        </p>
                    </div>
                    <div className={styles.ProductInfoRSCItem}>
                        <img
                            className={styles.ProductInfoRSCIcon}
                            src={CategoryIcon}
                            alt=""
                        />
                        <p className={styles.ProductInfoRSCText}>{category}</p>
                    </div>
                </div>

                <div className={styles.ProductInfoContainer}>
                    <p className={styles.ProductInfoPrice}>{price}$</p>
                </div>
            </div>
        </div>
    );
}

export default Product;
