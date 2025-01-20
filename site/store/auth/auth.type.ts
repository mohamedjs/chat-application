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

export interface authRegister {
    country: string;
    phone: string;
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
