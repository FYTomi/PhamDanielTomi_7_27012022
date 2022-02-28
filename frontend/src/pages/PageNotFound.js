import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="centerVertical toTheLine">
      <h1>Erreur 404 - Cette page n'existe pas</h1>
      <h1><Link to="/login">Retourner à l'accueil</Link></h1>    
    </div>
  );
}

export default PageNotFound;