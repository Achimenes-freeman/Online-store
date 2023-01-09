import ClassNames from 'classnames';

import ProductImages from '../ProductImages/ProductImages';
import { InfoIcons } from '../InfoIcons/InfoIcons';
import Button from '../../generics/Button/Button';
import { IProductData } from '../ProductPage/types';

import styles from './style.module.scss';

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
                <div className={styles.infoContainer}>
                    <InfoIcons
                        rating={rating}
                        stock={stock}
                        category={category}
                    />
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
