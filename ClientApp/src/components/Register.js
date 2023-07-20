import React, { useState, useEffect } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        roles: [], // Liste des rôles disponibles
    });

    useEffect(() => {
        // Récupérer la liste des rôles disponibles depuis l'API
        fetch('/api/roles')
            .then((response) => response.json())
            .then((data) => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    roles: data,
                }));
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoyer les données d'inscription à l'API
        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                // Gérer la réponse de l'API ici
                console.log(response);
                // Rediriger vers une autre page, par exemple, la page de connexion
            })
            .catch((error) => {
                console.error('Erreur lors de l\'enregistrement :', error);
            });
    };

    return (
        <div>
            <h2>Enregistrement</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Confirmer le mot de passe:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="">Sélectionner un rôle</option>
                        {formData.roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;
