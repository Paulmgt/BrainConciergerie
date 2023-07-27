import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element }) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkUserAuthentication();
    }, []);

    const checkUserAuthentication = async () => {
        if (currentUser) {
            setIsLoading(false);
        } else {
            setIsLoading(false);
            navigate('/authform');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return element;
};

export default PrivateRoute;
