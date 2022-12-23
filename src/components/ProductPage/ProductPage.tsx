import Product from '../Product/Product';

import { IProductPageProps, IProductData, productsArray } from './types';

import styles from './style.module.scss';

function ProductPage({ productId }: IProductPageProps) {
    const {
        id,
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
    } = productsArray.find((item) => item.id === productId) as IProductData;

    return (
        <div className={styles.ProductPage}>
            <Product
                id={id}
                title={title}
                description={description}
                price={price}
                discountPercentage={discountPercentage}
                rating={rating}
                stock={stock}
                brand={brand}
                category={category}
                thumbnail={thumbnail}
                images={images}
            />
        </div>
    );
}

export default ProductPage;
