export interface ModalWindowProps {
    closeModal: () => void;
    clearCart: () => void;
}

export interface ValidateModalInterface {
    fullname: boolean;
    tel: boolean;
    address: boolean;
    email: boolean;
    cardNum: boolean;
    cardValid: boolean;
    cardCvv: boolean;
}