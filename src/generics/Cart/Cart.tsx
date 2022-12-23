import cartIcon from '../../assets/icons/cart-icon.svg'
import { CartType } from './types'
import styles from './styles.module.scss'

export default function Cart({productsAmount = 0, callback}:CartType) {
    let amount = '';
    if(productsAmount >= 100) {
        amount = `99+`
    } else amount = productsAmount.toString();
    return (
        <button type='button' className={styles.cartButton} onClick={callback}>
            <img className={styles.cartImg} src={cartIcon} alt="Cart" />
            <span className={productsAmount ? styles.cartAmountVisible : styles.cartAmountHidden}>{amount}</span>
        </button>
    )
}