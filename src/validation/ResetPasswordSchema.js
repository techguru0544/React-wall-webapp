import * as Yup from 'yup';

export const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Too short. Must be minimum of 8 characters')
        .required('Required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'The password & its confirm password does not match')
        .min(6, 'Too short. Must be minimum of 8 characters')
        .required('Required')
});
