import { ProductCardProps } from "./types";
import styles from './styles.module.scss';

export default function ProductCard({product}:ProductCardProps) {
    return(
        <div className={styles.CardCont}>
            <a className={styles.cardImgCont} href='/#'>
                <img className={styles.cardImg} src={product.thumbnail} alt={product.title} />
            </a>
            <div className={styles.textCont}>
                <a className={styles.title} href='/#'>{product.title}</a>
                <p className={styles.description}>{product.category}</p>
            </div>
            <div className={styles.buttonCont}>
                <button className={`${styles.buttons}\n${styles.buttonAdd}`} type="button">{`Add €${product.price}`}</button>
                <button className={styles.buttons} type="button">Buy now</button>
            </div>
        </div>
    )
}