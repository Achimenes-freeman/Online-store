import styles from './styles.module.scss';
import { ProductCardsListProps } from './types';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductCardsList({products, cardSize, openModal}: ProductCardsListProps) {
    if(products.length) {
        return (
        <div className={`${styles.ProductsList}\n${cardSize.smallCards ? styles.productsListSmall : styles.productsListBig}`}>
            {products.map(product => <ProductCard key={product.id} product={product} cardSize={cardSize} openModal={openModal} />)}
        </div>)
    }
    return (
        <div className={styles.noProductsList}>
            No Products found!
        </div>
    )
}