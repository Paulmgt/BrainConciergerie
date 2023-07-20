import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebaseConfig'

const PrivateRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // L'utilisateur est connect�
                setIsAuthenticated(true);
            } else {
                // L'utilisateur n'est pas connect�
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        });

        return () => {
            // Nettoyer l'�couteur lors du d�montage du composant
            unsubscribe();
        };
    }, []);

    if (isLoading) {
        // Afficher un indicateur de chargement pendant la v�rification de l'�tat d'authentification
        return <div>Chargement en cours...</div>;
    }

    if (isAuthenticated) {
        // L'utilisateur est connect�, permettre l'acc�s aux routes priv�es
        return element;
    } else {
        // L'utilisateur n'est pas connect�, rediriger vers la page de connexion
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
