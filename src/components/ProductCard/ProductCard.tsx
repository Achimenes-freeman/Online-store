import { ProductCardProps } from "./types";
import styles from './styles.module.scss';

export default function ProductCard({product}:ProductCardProps) {
    return(
        <div className={styles.CardCont}>
            <img className={styles.cardImg} src={product.thumbnail} alt={product.title} />
            <p className={styles.title}>{product.title}</p>
            <p className={styles.description}>{product.category}</p>
            <div className={styles.buttonCont}>
                <button className={`${styles.buttons}\n${styles.buttonAdd}`} type="button">Add to cart</button>
                <button className={styles.buttons} type="button">Buy now</button>
            </div>
        </div>
    )
}