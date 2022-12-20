import styles from './Button.module.scss';
import { GenericButton } from '../../types/types';

function Button({ text, ...props }: GenericButton) {
    return (
        <button
            onClick={props.callback}
            type="button"
            className={styles.Button}
        >
            {text}
        </button>
    );
}

export default Button;
