//Importation
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]); // Liste des posts
  let navigate = useNavigate();

  //Vérifie le token, si false => renvois à la page login, si true => récupération des posts à afficher
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:5000/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          // Modifie les states avec le contenu de la BDD
          setListOfPosts(response.data.listOfPosts);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [navigate]);

  return (
    <div>
      {/* Utilise map pour afficher chaque post du state */}
      {listOfPosts.map((value, key) => {
        return (
          // Utilise key pour avoir un id unique, et ne pas avoir de warning
          <div key={key} className="post">
            {/* Titre */}
            <div className="title"> {value.title} </div>
            {/* Au click sur le post, redirige vers la page du post */}
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText} {/* Corps du texte  */}
              {value.imageUrl != null && (
                <img src={value.imageUrl} className="imagePost" alt="" />
              )}
            </div>
            <div className="footer">
              {/* Username */}
              <div className="username">
                <Link to={`/profile/${value.UserId}`}> {value.username} </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
