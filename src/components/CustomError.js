import React from "react";
import { ErrorMessage } from "formik";
const CustomError = ({ name }) => {
  return (
    <div style={{ color: "red" }}>
      <ErrorMessage name={name} />
    </div>
  );
};
export default CustomError;
