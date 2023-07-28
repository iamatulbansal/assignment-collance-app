import React from "react";
import { Form, Formik, Field, FieldArray } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { register, updateUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

import CustomError from "./CustomError";
import { registerValidationSchema } from "../utils/helper";

const initialValue = {
  name: "",
  dateOfBirth: null,
  age: null,
  phoneNumber: null,
  password: "",
  confirmPassword: "",
  address: [""],
};

const Register = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  const user = useSelector((state) => state?.users?.updateValue);
  const [age, setAge] = useState(0);
  useEffect(() => {
    setAge(age);
  }, [age]);

  return (
    <div className="container">
      <h1 >User Register</h1>
      <div className="form-div">
        <Formik
          initialValues={user || value}
          validationSchema={registerValidationSchema}
          enableReinitialize
          onSubmit={(value, { resetForm, setSubmitting }) => {
            const payload = { ...value, age, id: Date.now().toString() };

            if (!user) {
              dispatch(register(payload));
            } else {
              dispatch(updateUser({ ...value, age }));
            }
            setSubmitting(false);
            resetForm();
          }}
        >
          {(props) => {
            const value =
              new Date().getFullYear() -
              Number(props?.values?.dateOfBirth?.split("-")[0]);
            setAge(value);

            return (
              <Form>
                <label>Name</label>
                <br />
                <Field name='name' type='text' placeholder="Name" /> <br />
                <CustomError name='name' />
                <br />
                <label>Date Of Birth</label>
                <br />
                <Field placeholder="Date Of Birth"
                  name='dateOfBirth'
                  type='date'
                  value={props.values.dateOfBirth}
                  max={new Date().toISOString().split("T")[0]}
                />
                <CustomError name='dateOfBirth' />
                <br />
                <label>Age</label>
                <br />
                <Field name='age' type='number' placeholder="age" value={age} disabled />
                <CustomError name='age' />
                <br />
                <label>Phone Number</label>
                <br />
                <Field name='phoneNumber' type='number' placeholder="Phone Number" />
                <CustomError name='phoneNumber' />
                <br />
                <label>Address</label>
                <FieldArray name='address'>
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { address } = values;

                    return (
                      <div>
                        {address?.map((address, index) => (
                          <div key={index}>
                            <Field name={`address[${index}]`} type="text" placeholder="Address" />
                            {index > 0 && (
                              <button className="buttons" style={{ marginTop: "5px", marginBottom: "5px", background: "red" }} type='button' onClick={() => remove(index)}>
                                -
                              </button>
                            )}
                          </div>
                        ))}
                        <button className="buttons" style={{ marginTop: "10px" }} type='button' onClick={() => push("")}>
                          +
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>
                <br />
                <label>Password</label>
                <br />
                <Field name='password' type='password' placeholder="Password" />
                <CustomError name='password' />
                <br />
                <label>Confirm Password</label>
                <br />
                <Field name='confirmPassword' type='password' placeholder="Confirm Password" />
                <CustomError name='confirmPassword' />
                <br />
                <button className="buttons" type='submit'>{user ? "Update" : "Submit"}</button>
              </Form>
            );
          }}
        </Formik>
      </div>

    </div>
  );
};

export default Register;
