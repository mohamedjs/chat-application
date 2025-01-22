import * as Yup from 'yup';
import {isValidPhoneNumber} from 'libphonenumber-js'

export interface AuthState {
    phone: string;
    message: string;
    image: string;
    status: boolean;
    next: number;
    open: boolean;
    loading: boolean;
    err: boolean;
}

export const initAuthData: AuthState = {
    phone: "",
    message: "",
    image: "",
    status: false,
    next: 1,
    open: false,
    loading: false,
    err: false
}

export interface authRegister {
    country: string;
    phone: string;
}

export interface authVerify {
    otp: number;
}

export const validationRegiterSchema = Yup.object().shape({
    country: Yup.string().required('Please select your country'),
    phone: Yup.string()
        .required('Please enter your phone number')
        .test('is-valid-phone', 'Phone number is not valid for the selected country', function(value) {
            const { country } = this.parent;
            // Custom validation logic based on country
           return isValidPhoneNumber(value, country)
        }),
});

export const validationVerifySchema = Yup.object().shape({
    otp: Yup.number()
        .typeError('Please enter a valid number')
        .required('Please enter your OTP')
        .test('len', 'OTP must be exactly 6 digits', val => val?.toString().length === 6)
        .min(100000, 'OTP must be 6 digits')
        .max(999999, 'OTP must be 6 digits'),
});
