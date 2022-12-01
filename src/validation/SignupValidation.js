import * as yup from "yup";

export const signupValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("This Feild is required !")
    .typeError("Name Can't be Empty"),
  email: yup
    .string()
    .email("Invalid Email Format")
    .required("This Feild is required !"),
  userName: yup.string().min(4).required("This Feild is required !"),
  password: yup.string().min(4).required("This Feild is required !"),
  confirmPassword: yup
    .string()
    .required("This Feild is required !")
    .oneOf([yup.ref("password")], "Password should Match"),
});
