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
                // L'utilisateur est connecté
                setIsAuthenticated(true);
            } else {
                // L'utilisateur n'est pas connecté
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        });

        return () => {
            // Nettoyer l'écouteur lors du démontage du composant
            unsubscribe();
        };
    }, []);

    if (isLoading) {
        // Afficher un indicateur de chargement pendant la vérification de l'état d'authentification
        return <div>Chargement en cours...</div>;
    }

    if (isAuthenticated) {
        // L'utilisateur est connecté, permettre l'accès aux routes privées
        return element;
    } else {
        // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
