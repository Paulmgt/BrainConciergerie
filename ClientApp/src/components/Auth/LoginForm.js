import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Input, Button, Box, VStack } from '@chakra-ui/react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful.');
            navigate('/'); // Redirige vers la page d'accueil après la connexion
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={3}>
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">Login</Button>
            </VStack>
        </Box>
    );
};

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Registration successful.');
            navigate('/login'); // Redirige vers la page de connexion après l'inscription
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={3}>
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">Register</Button>
            </VStack>
        </Box>
    );
};

const AuthForm = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);

    return (
        <Box>
            {showLoginForm ? <LoginForm /> : <Register />}
            <Button onClick={() => setShowLoginForm(!showLoginForm)}>
                {showLoginForm ? 'Create an account' : 'Log in'}
            </Button>
        </Box>
    );
};

export default AuthForm;
