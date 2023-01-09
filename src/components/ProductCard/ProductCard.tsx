import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../lib/CartContext/CartContext';
import { ProductCardProps } from './types';
import styles from './styles.module.scss';

export default function ProductCard({ product, cardSize }: ProductCardProps) {
    const { addProductToCart } = useContext(CartContext);

    return (
        <div
            className={`${styles.CardCont}\n${
                cardSize.smallCards ? styles.CardContSmall : styles.CardContBig
            }`}
        >
            <Link className={styles.cardImgCont} to={`/${product.id}`}>
                <img
                    className={styles.cardImg}
                    src={product.thumbnail}
                    alt={product.title}
                />
            </Link>
            <div className={styles.textCont}>
                <Link className={styles.title} to={`/${product.id}`}>
                    {product.title}
                </Link>
                <p className={styles.description}>{product.category}</p>
            </div>
            {cardSize.bigCards && (
                <div className={styles.infoCont}>
                    <p className={styles.infoRate}>
                        Rating: <span>★{product.rating}</span>
                    </p>
                    <p className={styles.infoStock}>
                        Stock: <span>{product.stock}</span>
                    </p>
                </div>
            )}
            <div className={styles.buttonCont}>
                <button
                    className={`${styles.buttons}\n${styles.buttonAdd}`}
                    onClick={() => {
                        addProductToCart(product.id, product.price);
                    }}
                    type="button"
                >{`Add €${product.price}`}</button>
                <button className={styles.buttons} type="button">
                    Buy now
                </button>
            </div>
        </div>
    );
}
