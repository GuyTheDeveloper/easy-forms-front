import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().trim().required("Username is required"),
  email: yup.string().trim().required("Email is required!"),
  password: yup
    .string()
    .trim()
    .min(8, "Minimum 8 digits")
    .required("Password is required!"),
});
