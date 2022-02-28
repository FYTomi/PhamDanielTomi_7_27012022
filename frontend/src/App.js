import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { AuthContext } from "./helpers/AuthContext";
import logo from "./logo.png"

//Importation des pages
import Signup from "./pages/Signup"
import Login from "./pages/Login"




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
  });

  // Déconnection 

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
      <Router>
        <div className="navbar">
          <div className="navlinks">
           {/* Si authState false (non login) afficher sur la navbar : logo, login et registration */}
							{!authState.status ? (
								<>
									<Link to="/login">
										<img src={logo} alt={'logo'} className="logo" />
									</Link>
									<Link to="/login"> Se connecter</Link>
									<Link to="/registration"> Inscription</Link>
								</>
							) :
							// Sinon affiche le logo et createpost
							(
								<>
									<Link to="/">
										<img src={logo} alt={'logo'} className="logo" />
									</Link>
			
									<Link to="/createpost">Poster</Link>
								</>
							)}
          </div>
          
          <div className="loggedInContainer">
            {/* Affiche username */}
							<Link to={`/profile/${authState.id}`} >
								<h1>{authState.username} </h1>
							</Link>
							
							{/* Si authState true (login), afficher l'icon logout */}
							{authState.status && (
								<LogoutIcon className="logout" onClick={logout}></LogoutIcon>
							)}
          </div>
        </div>

        <Switch>
						<Route path="/registration" exact component={Registration} />
						<Route path="/login" exact component={Login} />

					</Switch>

      </Router>
    </AuthContext.Provider>
  </div>
)






}

export default App;
