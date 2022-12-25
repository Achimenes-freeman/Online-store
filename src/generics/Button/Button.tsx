import classNames from 'classnames';
import styles from './styles.module.scss';
import { GenericButton } from './types';

function Button(props: GenericButton) {
    const { text, callback, isReverse } = props;
    return (
        <button
            onClick={callback}
            type="button"
            className={classNames(
                styles.Button,
                isReverse ? styles.ButtonReverse : null
            )}
        >
            {text}
        </button>
    );
}

export default Button;
