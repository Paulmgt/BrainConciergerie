import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, firestore } from './firebaseConfig';

const AuthContext = createContext();
const auth = getAuth(app);
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null)

    useEffect(() => {
        // Abonnez-vous aux changements d'état d'authentification
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);

            // Vous pouvez implémenter la logique pour obtenir le rôle de l'utilisateur ici
            // Par exemple, en effectuant une requête Firestore pour obtenir le rôle de l'utilisateur à partir de son ID d'utilisateur (currentUser.uid)
            // Vous pouvez également stocker le rôle de l'utilisateur dans le token d'authentification lors de la connexion.

            // Par exemple, si vous stockez le rôle de l'utilisateur dans le token, vous pouvez le récupérer comme ceci :
            // const userRole = user ? user.role : null;
            // setUserRole(userRole);
        });

        // Nettoyage de l'abonnement lors du démontage du composant
        return () => unsubscribe();
    }, [auth]);

    const value = {
        currentUser,
        userRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
