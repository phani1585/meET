import * as yup from 'yup'

export const ResetPasswordValidation = yup.object().shape({
    oldPassword: yup.string().required("This Feild is Required").min(4,'Password should be atleast 4 characters'),
    newPassword: yup.string().required("This Feild is Required").min(4,'Password should be atleast 4 characters'),
    confirmPassword: yup.string().required("This Feild is Required").min(4,'Password should be atleast 4 characters')
})