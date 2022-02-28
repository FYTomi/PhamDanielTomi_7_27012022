//importation
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

function Signup() {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .max(20, "Password must not exceed 20 characters")
      .required("Password is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
  });

  let history = useHistory();

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/auth", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        history.push("/login");
      }
    });
  };
  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            type= "text"
            className="form-control"
            name="username"
            placeholder="Username"
          />

          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            className="form-control"
            name="password"
            placeholder="Mot de passe"
          />

          <ErrorMessage name="email" component="span" />
          <Field
            autoComplete="off"
            type="email"
            className="form-control"
            name="email"
            placeholder="Votre email"
          />

          <button type="submit">S'inscrire</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
