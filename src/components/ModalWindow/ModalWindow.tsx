import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { ModalWindowProps, ValidateModalInterface } from './types';
import defCardImg from '../../assets/images/default-card.jpg'
import visaCardImg from '../../assets/icons/visa-card.svg'
import mcCardImg from '../../assets/icons/mastercard-card.svg'
import mirLogo from '../../assets/icons/mir-logo.svg';

export default function ModalWindow({closeModal, clearCart}: ModalWindowProps) {
    const navigate = useNavigate()
    const [validateModal, setValidateModal] = useState<ValidateModalInterface>({
        fullname: false,
        tel: false,
        address: false,
        email: false,
        cardNum: false,
        cardValid: false,
        cardCvv: false
    })
    const [fullNameValue, setFullNameValue] = useState('');
    const checkFullname = (fullnameString: string) => fullnameString.split(' ').length >= 2 && fullnameString.split(' ').every(part => part.length >= 3 && part.slice(0, 1).toUpperCase() === part.slice(0, 1))
    const fullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullNameValue(event.target.value)
        setValidateModal({...validateModal, fullname: checkFullname(event.target.value)})
    };
    const [telValue, setTelValue] = useState('');
    const checkTel = (telString: string) => !telString.slice(1).replaceAll(/[0-9]/g, '').length && telString.length >= 9 && telString.charAt(0) === '+';
    const telChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelValue(event.target.value)
        setValidateModal({...validateModal, tel: checkTel(event.target.value)})
    };
    const [addressValue, setAddressValue] = useState('');
    const checkAddress = (addressString: string) => addressString.split(' ').length >= 3 && addressString.split(' ').every(part => part.length >= 5);
    const addressChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
        setAddressValue(event.target.value);
        setValidateModal({...validateModal, address: checkAddress(event.target.value)})
    }
    const [emailValue, setEmailValue] = useState('');
    const checkEmail = (emailString: string) => emailString
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null 
    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value);
        setValidateModal({...validateModal, email: checkEmail(event.target.value)})
    }
    const [cardImage, setCardImage] = useState(defCardImg)
    const [cardNumValue, setCardNumValue] = useState('');
    const checkCardNum = (cardNumString: string) => cardNumString.length === 16 && cardNumString.replaceAll(/[0-9]/g, '').length === 0
    const cardNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const firstDigit = Number(event.target.value.slice(0, 1));
        if(firstDigit === 2) {
            setCardImage(mirLogo)
        } else if(firstDigit === 4) {
            setCardImage(visaCardImg)
        } else if(firstDigit === 5) {
            setCardImage(mcCardImg)
        } else {
            setCardImage(defCardImg)
        }
        const cardNumString = event.target.value;
        const lastDigit = cardNumString.slice(-1);
        if(!lastDigit.replace(/[0-9]/g, '').length && cardNumString.length <= 16) {
            setCardNumValue(cardNumString)
            setValidateModal({...validateModal, cardNum: checkCardNum(cardNumString)})
        }

    }
    const [cardValidValue, setCardValidValue] = useState('')
    const checkCardValid = (cardValidString: string) => {
        const month = Number(cardValidString.split('/')[0]);
        return month > 0 && month <= 12 && cardValidString.split('/').join('').length === 4
    }
    const cardValidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.length <= 5) { 
            if(!event.target.value.slice(-1).replace(/[0-9]/, '').length) {  
                if(event.target.value.length === 2 && event.target.value.length > cardValidValue.length) {
                    const newValue = `${event.target.value}/`
                    setCardValidValue(newValue)
                    setValidateModal({...validateModal, cardValid: checkCardValid(newValue)})
                } else if (event.target.value.length === 3 && event.target.value.length > cardValidValue.length) {
                    const newValue = `${event.target.value.slice(0, -1)}/${event.target.value.slice(-1)}`
                    setCardValidValue(newValue)
                    setValidateModal({...validateModal, cardValid: checkCardValid(newValue)})
                } else {
                    setCardValidValue(event.target.value)
                    setValidateModal({...validateModal, cardValid: checkCardValid(event.target.value)})
                }
            }
            if(event.target.value.length === 3 && event.target.value.slice(-1) === '/' && event.target.value.length < cardValidValue.length) {
                setCardValidValue(event.target.value);
                setValidateModal({...validateModal, cardValid: checkCardValid(event.target.value)})
            }
        }
    }
    const [cardCvvValue, setCardCvvValue] = useState('');
    const checkCardCvv = (cardCvvString: string) => cardCvvString.length === 3
    const cardCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.length <= 3) {
            if(!event.target.value.slice(-1).replace(/[0-9]/g, '').length) {
                setCardCvvValue(event.target.value)
                setValidateModal({...validateModal, cardCvv: checkCardCvv(event.target.value)})
            }
            
        }
    }
    const [isValid, setIsValid] = useState<boolean>(false)
    const [counter, setCounter] = useState(3)
    const [timer, setTimer] = useState(false)
    const confirmModal = () => {
        if(Object.values(validateModal).every(part => Boolean(part) === true)) {
            setTimer(true)
        }
        setIsValid(true)
    }
    useEffect(() => {
        if(timer) {
            const interval = setInterval(() => setCounter(c => c - 1), 1000)

            if(counter === 0) {
                clearInterval(interval)
                closeModal()
                clearCart()
                navigate('/')
            }
        }
    }, [counter, timer, closeModal, clearCart, navigate])

    
    return (
        <div className={styles.ModalWindow} >
            <div className={styles.contentCont}>
                {timer
                ? <p>Thanks for the purchase!</p>
                : <>
                    <div className={styles.defInputCont}>
                        <input className={`${styles.defInput}\n${validateModal.fullname ? styles.defInputValid : styles.defInputInvalid}`} 
                            type='text' name='fullname' placeholder='Name nad Surname' onChange={fullNameChange}  value={fullNameValue} required />
                        {isValid === true && validateModal.fullname === false
                        ? <span className={styles.defInputErrorSpan} title="Enter Name and Surname longer than 3 char's">Error!</span>
                        : false}
                    </div>
                    <div className={styles.defInputCont}>
                        <input className={`${styles.defInput}\n${validateModal.tel ? styles.defInputValid : styles.defInputInvalid}`} 
                            type='tel' name='tel' placeholder='Phone number' onChange={telChange} value={telValue} required />
                        {isValid === true && validateModal.tel === false
                        ? <span className={styles.defInputErrorSpan} title="Enter phone number, that starts with '+'">Error!</span>
                        : false}
                    </div>
                    <div className={styles.defInputCont}>
                        <input className={`${styles.defInput}\n${validateModal.address ? styles.defInputValid : styles.defInputInvalid}`} 
                            type='text' name='address' placeholder='Delivery address' onChange={addressChange} value={addressValue} required/>
                        {isValid === true && validateModal.address === false
                        ? <span className={styles.defInputErrorSpan} title="Enter at least three words longer than 5 char's">Error!</span>
                        : false}
                    </div>
                    <div className={styles.defInputCont}>
                        <input className={`${styles.defInput}\n${validateModal.email ? styles.defInputValid : styles.defInputInvalid}`} 
                            type='email' name='email' placeholder='Email' onChange={emailChange} value={emailValue} required/>
                        {isValid === true && validateModal.email === false
                        ? <span className={styles.defInputErrorSpan} title="Enter one correct email">Error!</span>
                        : false}
                    </div>
                    <div className={styles.creditCardCont}>
                        <div className={styles.cardNumberCont}>
                            <img className={styles.cardImg} src={cardImage} alt="Card" />
                            <input className={`${styles.cardInput}\n${validateModal.cardNum ? styles.cardInputValid : styles.cardInputInvalid}`} 
                                type="text" name='cardNumber' placeholder='Card number' onChange={cardNumChange} value={cardNumValue} required/>
                        </div>
                        <div className={styles.cardValidCont}>
                            VALID: <input className={`${styles.cardInput}\n${validateModal.cardValid ? styles.cardInputValid : styles.cardInputInvalid}`} 
                                type="text" name='cardValid' placeholder='Valid Thru' onChange={cardValidChange} value={cardValidValue} required/>
                        </div>
                        <div className={styles.cardCvvCont}>
                            CVV: <input className={`${styles.cardInput}\n${validateModal.cardCvv ? styles.cardInputValid : styles.cardInputInvalid}`} 
                                type='text' name="cardCvv" placeholder='Code' onChange={cardCvvChange} value={cardCvvValue} required/>
                        </div>
                    </div>
                    {!!isValid && 
                    <div className={styles.cardInputErrorCont}>
                        {isValid === true && validateModal.cardNum === false
                        ? <span className={styles.cardInputErrorSpan} title="Your card number must be 16 digits long">Card number error!</span>
                        : false}
                        {isValid === true && validateModal.cardValid === false
                        ? <span className={styles.cardInputErrorSpan} title="Enter valid date, where the first two digits are the month and the second two are the year">Card date error!</span>
                        : false}
                        {isValid === true && validateModal.cardCvv === false
                        ? <span className={styles.cardInputErrorSpan} title="Enter valid CVV code, which must be 3 digits long">Card CVV error!</span>
                        : false}
                    </div>}
                    <button className={styles.confirmButton} type='button' onClick={confirmModal}>Confirm</button>
                    <button className={styles.closeModalButton} type='button' onClick={closeModal}>X</button>
                </>}
            </div>
        </div>
    )
}