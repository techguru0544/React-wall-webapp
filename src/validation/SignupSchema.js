import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('Firstname is required')
    .max(60),
  last_name: Yup.string()
    .required('Lastname is required')
    .max(60),
  username: Yup.string()
    .required('Username is required')
    .min(6,'Too short. Must be minimum of 6 characters'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Too short. Must be minimum of 6 characters')
    .required('Password is required'),
  phone_number: Yup.string()
    .max(13, 'Phone number is too long')
    .matches(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, 'Invalid number')
    .required('Phone number is required'),
});
