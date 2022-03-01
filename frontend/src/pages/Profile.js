//Importation
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

function Profile() {
	let { id } = useParams() // Récupère id de l'URL
	let navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [postsOfUser, setpostsOfUser] = useState([])
	const { authState, setAuthState } = useContext(AuthContext)

    useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			navigate('/login')
		} else {
			// Récupère username et le rajoute au state
			axios.get(`http://localhost:5000/auth/accountInfo/${id}`).then((response) => {
				setUsername(response.data.username)
			})

			// Récupère les posts qui appartient au profil et le rajoute au state
			axios.get(`http://localhost:5000/posts/userPosts/${id}`).then((response) => {
				setpostsOfUser(response.data)
			})
		}	
	}, [navigate, id])

    //Suppression d'un compte

    const deleteAccount = () => {
		axios
			.delete(`http://localhost:5000/auth/deleteAccount/${id}`, {
				headers: { accessToken: localStorage.getItem('accessToken') },
			})
			.then(() => {
				alert('Compte supprimé')
				//Renvoi l'utilisateur à la page login après suppression du compte
				if (authState.id !== 1) {
					localStorage.removeItem('accessToken')
					setAuthState({ username: '', id: 0, status: false, adminStatus: false })
					navigate('/login')
				} else {
					navigate('/posts')
				}
			})
	}

    return (
		<div className="profilePageContainer">
			<div className="basicInfo">
				
				{/* Username */}
				<h1>{username}</h1>
				
				{/* Affiche "Changer votre mot de passe" et "Supprimer votre compte" si c'est l'utilisateur du profil qui est connecté */}
				{authState.username === username && (authState.adminStatus === false) && (
					<>
						<button onClick={() => {navigate('/password')}}>
							Changer votre mot de passe
						</button>

						<button onClick={() => {deleteAccount(id)}}>
							Supprimer votre compte
						</button>
					</>
				)}
				
				{/* Affiche "Changer le mot de passe" et "Supprimer le compte" si c'est l'administrateur qui est connecté */}
				{(authState.adminStatus === true) && (
					<>
						{authState.username === username && (
							<button onClick={() => {navigate('/password')}}>
								Changer le mot de passe
							</button>
						)}

						<button
						onClick={() => {
							deleteAccount(id)
						}}
						>
							Supprimer le compte
						</button>
					</>
				)}
			</div>
			
			<div className="postsOfUser">
				{/* Affiche tout les posts */}
				{postsOfUser.map((value, key) => {
					return (
						<div key={key} className="post">
							<div className="title"> {value.title} </div>
							<div
								className="body"
								onClick={() => {
									navigate(`/post/${value.id}`)
								}}
							>
								{value.postText}
								{value.imageUrl && <img src={`../${value.imageUrl}`} className="imagePost" alt="" />}
							</div>
							<div className="footer">
								<div className="username">{value.username}</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Profile
    
