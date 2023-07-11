import * as Yup from "yup";

export const signUpSchema = Yup.object({
    first_name: Yup.string().required("Please enter your first name"),
    last_name: Yup.string().required("Please enter your last name"),
    username: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Enter a valid email address").required("Please enter your email"),
    phone_no: Yup.string().length(11, `Phone number must be  11 character`).required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required("Please enter your password"),
    user_type: Yup.string()
        .required("User type is required")
});

export const OtpSchema = Yup.object({
    code: Yup.string().length(6).required('Code is required'),
})
export const identify = Yup.object({
    logo: Yup.string().required('Logo is required'),
    business_registration: Yup.string().required('Business registration is required'),
    business_license: Yup.string().required('Business license is required'),

})
export const indivdual = Yup.object({
    profile_photo: Yup.string().required('Profile photo is required'),
    national_id: Yup.string().required('National id is required'),

})

export const accountUsagSchema = Yup.object({
    account_usage: Yup.string().required('Account type is required'),
})

export const loginSchema = Yup.object({
    email: Yup.string().email("Enter a valid email address").required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
});
