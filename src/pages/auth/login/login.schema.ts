import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().trim().required("Email is required!"),
  password: yup
    .string()
    .trim()
    .min(8, "Minimum 8 digits")
    .required("Password is required!"),
});
