//Importation
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Pour les formulaires
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  let navigate = useNavigate();

  // Initialise les champs
  const initialValues = {
    title: "",
    postText: "",
  };

  //Vérifif token, si false => renvois à la page login
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  // Schema de validation Yup pour formik
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Titre requis"),
    postText: Yup.string().required("Message requis"),
  });

  const [file, setFile] = useState(null); // State du nom du fichier

  // Envoi les données du formulaire, data contient le titre et le corps du texte
  const onSubmit = (data) => {
    const formData = new FormData(); // Les données de l'image sont contenus dans formData
    formData.append("photo", file); // On ajoute le nom du fichier
    formData.append("title", data.title); // son titre
    formData.append("postText", data.postText); // et le corps du texte

    // Titre et corps du texte
    axios
      .post("http://localhost:5000/posts/", formData, {
        headers: { accessToken: localStorage.getItem("accessToken") },
        "content-type": "multipart/form-data", // multipart/form-data essentiel pour gérer les images
      })
      .then((response) => {
        navigate("/posts"); // Si c'est OK redirige vers la page d'accueil
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onInputChange = (e) => {
    setFile(e.target.files[0]); // Met à jour le state avec le nom du fichier
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="register-form">
          <h1>Ajouter un post</h1>
          <ErrorMessage name="title" component="span" className="text-danger" />
          <Field
            autoComplete="off"
            className="form-control"
            name="title"
            placeholder="Donner un titre à votre post"
          />
          <ErrorMessage name="postText" component="span" className="text-danger"/>
          <Field
            autoComplete="off"
            className="form-control"
            name="postText"
            placeholder="Message"
          />
          {/* input parcourir qui permet d'envoyer la photo au backend */}
          <input type="file" name="photo" onChange={onInputChange} />
          <button type="submit" className="btn btn-warning">Publier</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
