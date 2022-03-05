//Importation
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { AuthContext } from "./helpers/AuthContext";
import banner from "./banner.png"

//Importation des pages
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Post from "./pages/Post"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound";
import CreatePost from "./pages/CreatePost";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const [authState, setAuthState] = useState({
    username:'',
    id: 0,
    status: false,
    adminStatus: false,
  })

  useEffect(() => {
    axios
      .get('http://localhost:5000/auth/verify', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) =>{
        if(response.data.error) {
          setAuthState({...authState, status:false})
        }
        else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            adminStatus: response.data.adminStatus,
          })
				}
			})
	// eslint-disable-next-line
	}, [])

  // Déconnection , l'accessToken est enlevé et on réinitialise le state d'authentification de l'utilisateur

  const logout = () => {
    localStorage.removeItem('accessToken')

    setAuthState({ 
      username:'',
      id: 0,
      status: false,
      adminStatus: false
    })
    window.location.reload()
  }

return (
  <div className="App">
    <AuthContext.Provider value={{authState, setAuthState}}>
      <BrowserRouter>
      <div id="center-element">
      <Link to="/"><img src={banner} alt={"banner"} classname="banner"/></Link>
        <h1 id='titre'>Groupomania - un réseau social d'entreprise</h1>
      </div>
        <div className="navbar">
          <div className="navlinks">
           {/* Si authState false (non connecté) afficher sur la navbar : banner (qui nous redirige pas sur posts), "Se connecter" et "Inscription" */}
							{!authState.status ? (
								<>
									<Link to="/login"> <h2>Se connecter</h2></Link>
									<Link to="/signup"> <h2>Inscription</h2></Link>
								</>
							) :
							// Sinon affiche la navbar avec le banner, "Accueil" et "Poster"
							(
								<>
									<Link to="/"><h1>Accueil</h1></Link>
	                <Link to="/createpost"><h2>Poster</h2></Link>
								</>
							)}
          </div>
          
          {/* Affichage sur la droite du nom d'utilisateur et le bouton "Se déconnecter"*/}
          <div className="loggedInContainer">

            {/* Affiche le nom d'utilisateur, clickable qui nous redirige vers sa page */}
							<Link to={`/profile/${authState.id}`} >
								<h1>{authState.username}</h1>
							</Link>
							
							{/* Si authState true (logged in), afficher le bouton logout */}
							{authState.status && (
								<button className="btn btn-primary" onClick={logout}>Se déconnecter</button>
							)}
          </div>
        </div>

        <Routes>
						<Route path="/signup" element={<Signup/>} />
						<Route path="/login"element={<Login/>} />
            <Route path="/profile/:id" element={<Profile/>} />
            <Route path="/post/:id" element={<Post/>} />
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<PageNotFound/>} />
            <Route path="/createpost" element={<CreatePost/>} />
            <Route path="/password" element={<ChangePassword/>} />

				</Routes>

      </BrowserRouter>
    </AuthContext.Provider>
  </div>
)






}

export default App;
