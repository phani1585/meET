import * as yup from "yup";

export const LoginValidation = yup.object().shape({
  userName: yup.string().required("This Feild is Required"),
  password: yup.string().required("This Feild is Required").min(4,'Password should be atleast 4 characters'),
});
