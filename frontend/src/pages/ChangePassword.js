//Importation
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let navigate = useNavigate()

/*Si l'utilisateur n'est pas authentifié => renvois à la page de login */
  useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			navigate('/login')
		}}, [navigate])

  const changePassword = () => {
    axios
      .put("http://localhost:5000/auth/password",
        {
          // Body de l'ancien et nouveau password
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Votre mot de passe a bien été changé");
          navigate('/')
        }
      });
  };

  /* Render du formulaire à remplaire pour le mot de passe */
  return (
    <div className="register-form">
      <h1>Modifier votre mot de passe</h1>
      <form>
        <input
          className="form-control"
          type="password"
          placeholder="Votre ancien mot de passe"
          onChange={(event) => {
            setOldPassword(event.target.value); // Met à jour le state oldPassword
          }}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Votre nouveau mot de passe"
          onChange={(event) => {
            setNewPassword(event.target.value); // Met à jour le state newPassword
          }}
        />
      </form>
      <button id="btn" onClick={changePassword}> Modifier</button>
    </div>
  );
}

export default ChangePassword;