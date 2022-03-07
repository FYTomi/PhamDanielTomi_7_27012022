//Imporation
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  // Se lance quand on render la page
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      // Récupère un post grâce à son id
      axios.get(`http://localhost:5000/posts/post/${id}`,).then((response) => {
        setPostObject(response.data);
      });

      // Récupère les commentaires d'un post
      axios.get(`http://localhost:5000/comments/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        setComments(response.data);
      });
    }
  }, [navigate, id]);

  // Ajoute un commentaire
  const addComment = () => {
    if (newComment !== "") {
      axios
        .post(
          "http://localhost:5000/comments",
          {
            // Rajouter le nouveau commentaire et l'id du post au body
            commentBody: newComment,
            PostId: id,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            // Objet qui contient le nouveau commentaire : avec le commentBody, username et id
            const commentToAdd = {
              commentBody: response.data.commentBody,
              username: response.data.username,
              id: response.data.id,
            };
            setComments([...comments, commentToAdd]); // Récupère les anciens commentaire, et rajoute le nouveau
            setNewComment(""); // Réinitialise l'input
          }
        });
    }
  };

  // Supprime un commentaire, prend id en paramètre
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:5000/comments/${id}`, {
        // On rajoute id dans la requête axios
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        // Filtre les commentaires pour récupérer ceux différent de notre id
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  // Supprime un post avec id, même principe que pour le commentaire
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  // Permet de modifier un post
  const editPost = (option) => {
    // Modifie le titre
    if (option === "title") {
      // Variable qui contient le prompt titre
      let newTitle = prompt("Nouveau titre :");
      // Empêche que le titre soit null
      if (newTitle !== undefined && newTitle !== "") {
        axios.put(
          "http://localhost:5000/posts/title",
          {
            // Body
            newTitle: newTitle,
            id: id,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );

        setPostObject({ ...postObject, title: newTitle }); // On garde postObject et on change uniquement title
      }
    }
    // Modifie la description du post, même principe que pour le titre
    else {
      let newPostText = prompt("Nouveau texte :");
      if (newPostText !== undefined && newPostText !== "") {
        axios.put(
          "http://localhost:5000/posts/postText",
          {
            newText: newPostText,
            id: id,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );

        setPostObject({ ...postObject, postText: newPostText }); // On garde postObject et on change uniquement la description
      }
    }
  };

  return (
    <div className="postPage">
      <div>
        <div className="post">
          {/* Modification du titre au click */}
          <div
            className="title"
            onClick={() => {
              // Seul la personne qui crée le post ou un admin peut le modifier
              if (
                authState.username === postObject.username ||
                authState.adminStatus === true
              ) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>
          {/* Modification de la description au click */}
          <div
            className="body"
            onClick={() => {
              // Seul la personne qui crée le post ou un admin peut le modifier
              if (
                authState.username === postObject.username ||
                authState.adminStatus === true
              ) {
                editPost("body");
              }
            }}
          >
            {postObject.imageUrl && (
              <img src={postObject.imageUrl} className="imagePost" alt="" />
            )}
            <div>{postObject.postText}</div>
          </div>
          {/* Affiche qui a posté le post */}
          <div className="container-content">
            <div className="username">
              Auteur: {postObject.username}
            </div>

            {/* Affiche pour l'utilisateur ou un admin une icône de poubelle pour supprimer le post*/ }
            <div className="buttons">
              {(authState.username === postObject.username ||
                authState.adminStatus === true) && (
                <DeleteIcon
                  onClick={() => {
                    deletePost(postObject.id);
                  }}
                ></DeleteIcon>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        
        {/* Liste des commentaires */}
        <div className="listOfComments">
          {/* Utilise map pour boucler et afficher tout les commentaires */}
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <div>
                  {/* Affiche username et le commentaire depuis l'objet comment */}
                  <label>{comment.username}</label> : {comment.commentBody}
                </div>
                <div
                  className="delete"
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  {/* Affiche l'icon delete pour l'admin ou si c'est l'utilisateur qui a posté le commentaire */}
                  {(authState.username === comment.username ||
                    authState.adminStatus === true) && (
                    <DeleteIcon></DeleteIcon>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ajout d'un commentaire */}
        <div className="addCommentContainer">
          <label className="title">Ajouter un commentaire</label>
          <textarea
            type="text"
            placeholder="Votre commentaire..."
            autoComplete="off"
            // Valeur de l'input par défaut
            value={newComment}
            // Récupère le commentaire du form et le modifie dans le state
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button className="btn btn-primary" onClick={addComment}> Commenter</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
