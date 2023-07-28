import * as Yup from "yup";
//Field Validations
export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(20, "field Maximum length should be 20 characters.")
    .required("Field Cannot be blank!")
    .matches(
      /^[a-zA-Z]+$/,
      "name must not contain numbers or special characters"
    ),

  dateOfBirth: Yup.date()
    .nullable()
    .required("Field Cannot be blank!")
    .max(new Date(), "Cannot be greater than today's date"),
  // address: Yup.string()
  // .required("Field Cannot be blank!"),
  phoneNumber: Yup.string()
    .required("Field Cannot be blank!")
    .matches(/^[0-9]+$/, "Phone Number cannot contain letters")
    .min(8, "Phone Number should be at least 8 digits")
    .max(10, "Phone Number should not exceed 10 digits"),

  password: Yup.string()
    .min(10, "Must have a minimum length of 10 characters.")

    .matches(/[A-Z]/, "at least one uppercase char")
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      "at least 1 number or special char (@,!,#, etc)."
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "passwords don't match"),
});
