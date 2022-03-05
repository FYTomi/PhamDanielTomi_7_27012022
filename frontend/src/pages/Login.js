//Importation
import React, { useState, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  // Valeurs initiales du formulaire
  const initialValues = {
    username: '',
    password: '',
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:5000/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
          adminStatus: response.data.adminStatus,
        });
        navigate("/"); //Redirige vers la pages des posts après connexion
      }
    });
  };

  return (
    <div className="register-form">
      <h1>Se connecter</h1>
      <Formik initialValues={initialValues} onSubmit={login}>
        <Form className="formContainer">
          <ErrorMessage name="username" component="span" />
          <input
            type="text"
            placeholder="Pseudo"
            className="form-control"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          <ErrorMessage name="password" component="span" />
          <input
            type="password"
            placeholder="Mot de passe"
            className="form-control"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button type="submit" className="btn btn-warning float-right">Connexion</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
