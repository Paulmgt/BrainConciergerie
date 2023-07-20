
import React, { useState, useEffect } from 'react';
import { Flex, Grid, Box, Button, useBreakpointValue, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
// ... autres imports

const EditAppart = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Nom: '',
        Localisation: '',
        Equipements: [],
        Photos: [],
        Monuments: [],
        Restaurants: [],
        Bar: [],
        AutresActivites: [],
        Poubelles: '',
        Transports: '',
        Consignes: '',
        Parking: '',
    });

    useEffect(() => {
        // Récupérer les données de l'appartement à modifier en utilisant l'ID
        const fetchAppartData = async () => {
            try {
                const response = await fetch(`/apparts/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error('Error fetching appart:', response.status);
                }
            } catch (error) {
                console.error('Error fetching appart:', error);
            }
        };

        fetchAppartData();
    }, [id]);

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/apparts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Appartement modifié avec succès, effectuez les actions nécessaires
                navigate('/'); // Redirection vers la page d'accueil
            } else {
                console.error('Error updating appart:', response.status);
            }
        } catch (error) {
            console.error('Error updating appart:', error);
        }
    };

    return (
        <div>
            <h1>Edit Appart</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Nom">Nom:</label>
                    <input
                        type="text"
                        id="Nom"
                        name="Nom"
                        value={formData.Nom}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Localisation">Localisation:</label>
                    <input
                        type="text"
                        id="Localisation"
                        name="Localisation"
                        value={formData.Localisation}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Equipements">Equipements:</label>
                    <select
                        multiple
                        id="Equipements"
                        name="Equipements"
                        value={formData.Equipements}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        {/* Générez les options pour les équipements ici */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Photos">Photos:</label>
                    <select
                        multiple
                        id="Photos"
                        name="Photos"
                        value={formData.Photos}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        {/* Générez les options pour les équipements ici */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Monuments">Monuments:</label>
                    <select
                        multiple
                        id="Monuments"
                        name="Monuments"
                        value={formData.Monuments}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        {/* Générez les options pour les équipements ici */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Restaurants">Restaurants:</label>
                    <select
                        multiple
                        id="Restaurants"
                        name="Restaurants"
                        value={formData.Monuments}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        {/* Générez les options pour les équipements ici */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Bar">Bar:</label>
                    <select
                        multiple
                        id="Bar"
                        name="Bar"
                        value={formData.Bar}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        {/* Générez les options pour les équipements ici */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Theatres">Theatres:</label>
                    <select
                        multiple
                        id="Theatres"
                        name="Theatres"
                        value={formData.Theatres}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        {/* Générez les options pour les équipements ici */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="AutresActivites">AutresActivites:</label>
                    <select
                        multiple
                        id="AutresActivites"
                        name="AutresActivites"
                        value={formData.AutresActivites}
                        onChange={handleInputChange}
                        className="form-control"
                    >Restaurants
                        {/* Générez les options pour les équipements ici */}
                    </select>
                </div>
                {/* Continuez à ajouter les autres champs du formulaire */}
                <button type="submit" className="btn btn-primary">Update</button>
            </form>

        </div>
    );
};

export default EditAppart;
