//importation
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const initialValues = {
    username: '',
    password: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters")
      .required("Un nom d'utilisateur est requis"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .max(20, "Password must not exceed 20 characters")
      .required("Un mot de passe et requis"),
    email: Yup.string()
    .required("Un email est requis")
    .email("l'email est invalide"),
  });

  let navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/auth/signup", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        navigate("/login");
      }
    });
  };
  return (
    <div className="register-form">
      <h1>S'inscrire</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-group">
          <Field
            autoComplete="off"
            type="text"
            className="form-control"
            name="username"
            placeholder="Votre nom d'utilisateur"
          />
          <ErrorMessage name="username" component="span" className="text-danger" />

          
          <Field
            autoComplete="off"
            type="password"
            className="form-control"
            name="password"
            placeholder="Mot de passe"
          />
          <ErrorMessage name="password" component="span" className="text-danger" />

          
          <Field
            autoComplete="off"
            type="email"
            className="form-control"
            name="email"
            placeholder="Votre email"
          />
          <ErrorMessage name="email" component="span" className="text-danger" />

          <button type="submit" className="btn btn-warning float-right" >S'inscrire</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
