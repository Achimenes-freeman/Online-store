import { ProductCardProps } from "./types";
import styles from './styles.module.scss';

export default function ProductCard({product, cardSize}:ProductCardProps) {
    
    return(
        <div className={`${styles.CardCont}\n${cardSize.smallCards ? styles.CardContSmall : styles.CardContBig}`}>
            <a className={styles.cardImgCont} href='/#'>
                <img className={styles.cardImg} src={product.thumbnail} alt={product.title} />
            </a>
            <div className={styles.textCont}>
                <a className={styles.title} href='/#'>{product.title}</a>
                <p className={styles.description}>{product.category}</p>
            </div>
            {
                cardSize.bigCards && 
                <div className={styles.infoCont}>
                    <p className={styles.infoRate}>Rating: <span>★{product.rating}</span></p>
                    <p className={styles.infoStock}>Stock: <span>{product.stock}</span></p>
                </div>
            }
            <div className={styles.buttonCont}>
                <button className={`${styles.buttons}\n${styles.buttonAdd}`} type="button">{`Add €${product.price}`}</button>
                <button className={styles.buttons} type="button">Buy now</button>
            </div>
        </div>
    )
}