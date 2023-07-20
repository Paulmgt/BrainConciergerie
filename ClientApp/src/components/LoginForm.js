import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { app } from '../Config/firebaseConfig';

const auth = getAuth(app);

const LoginForm = () => {
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // L'utilisateur est connecté
                // Redirigez vers votre page principale ici
                navigate('/');
            } else {
                // L'utilisateur n'est pas connecté
                // Gérer le cas où la ressource n'est pas accessible
            }
        });

        signInWithPopup(auth, provider)
            .then((result) => {
                // L'utilisateur est connecté avec succès
                const user = result.user;
                // Faites quelque chose avec les données utilisateur
            })
            .catch((error) => {
                // Une erreur s'est produite lors de la connexion avec Google
                const errorCode = error.code;
                const errorMessage = error.message;
                // Gérez l'erreur
            });
    };

    return (
        <div className="login-page">
            <div className="background"></div>
            <div className="content">
                <h1>Connectez-vous pour accéder au site</h1>
                <button onClick={signInWithGoogle}>Connexion avec Google</button>
            </div>
        </div>
    );
};

export default LoginForm;
