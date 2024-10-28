import * as Yup from "yup";

// const passwordRules = !/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{7,}/
const passwordRules =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).*$/;

export const SignUpValidation = Yup.object().shape({
  first_name: Yup.string().required("First name is required!"),
  last_name: Yup.string().required("Last name is required!"),
  organization: Yup.string().required("Organization is required!"),
  email: Yup.string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  password: Yup.string()
    .matches(
      passwordRules,
      "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required!!"),
});

export const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!!"),
});
