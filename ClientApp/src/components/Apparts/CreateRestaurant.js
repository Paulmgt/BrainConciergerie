
import React, { useState, useEffect } from 'react';
import {
    Box, Button, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody,
    AlertDialogFooter, Textarea, Select, AlertDialogHeader
} from "@chakra-ui/react"

const CreateRestaurant = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [restaurants, setRestaurants] = useState([]);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [deleteRestaurantId, setDeleteRestaurantId] = useState(null);
    const initialFormState = { Nom: "", Localisation: "", Description: "" };
    const [formData, setFormData] = useState(initialFormState);
    const fetchUrl = '/api/Restaurants'; // Change to your restaurants API

    const handleSubmit = async (e) => {
        e.preventDefault();
        let postData = { ...formData };
        // Convertir les équipements et les photos en utilisant uniquement les IDs
        postData.Appartements = postData.Appartements ? postData.Appartements.map(appart => appart.id) : [];
        try {
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const newRestaurant = await response.json();
                setRestaurants([...restaurants, newRestaurant]);
                setFormData(initialFormState);
                onClose();
            } else {
                console.error('Erreur lors de la création de l\'équipement:', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'équipement:', error);
        }
    };

    useEffect(() => {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRestaurants(data);
            })
            .catch(err => console.error(err));
    }, []);

    const [existingApartments, setExistingApartments] = useState([]);

    // Récupérer les appartements lors de l'initialisation
    useEffect(() => {
        // Remplacer cette URL par l'URL réelle de votre API
        fetch('/api/Apparts')
            .then(response => response.json())
            .then(data => setExistingApartments(data))
            .catch(err => console.error(err));
    }, []);


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (fieldName) => (selectedOptions) => {
        const selectedItems = selectedOptions ? selectedOptions.map(option => ({ id: option.value, nom: option.label })) : [];
        setFormData(prevState => ({ ...prevState, [fieldName]: selectedItems }));
    };


    const handleDeleteRestaurant = async (id) => {
        try {
            const response = await fetch(`${fetchUrl}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant) => restaurant.id !== id));
                closeDeleteAlert();
            } else {
                console.error('Error deleting restaurant:', response.status);
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };


    const openDeleteAlert = (id) => {
        setDeleteRestaurantId(id);
        setIsDeleteAlertOpen(true);
    };

    const closeDeleteAlert = () => {
        setIsDeleteAlertOpen(false);
        setDeleteRestaurantId(null);
    };


    return (
        <Box>
            <Button colorScheme="blue" onClick={onOpen}>Ajouter un restaurant</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Nom du restaurant</Th>
                        <Th>Localisation</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {restaurants
                        .filter(restaurant => restaurant.nom !== null)
                        .map((restaurant) => (
                            <Tr key={restaurant.id}>
                                <Td>{restaurant.id}</Td>
                                <Td>{restaurant.nom}</Td>
                                <Td>{restaurant.localisation}</Td>
                                <Td>{restaurant.description}</Td>
                                <Td>
                                    <Button colorScheme="red" onClick={() => openDeleteAlert(restaurant.id)}>Supprimer</Button>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter un nouveau Restaurant</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nom du Restaurant</FormLabel>
                                <Input name="Nom" value={formData.Nom} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Localisation</FormLabel>
                                <Input name="Localisation" value={formData.Localisation} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea name="Description" value={formData.Description} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Appartement</FormLabel>
                                <Select name="AppartId" onChange={handleSelectChange('AppartId')}>
                                    {existingApartments.map(appart => (
                                        <option key={appart.id} value={appart.id}>{appart.nom}</option>
                                    ))}
                                </Select>

                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" type="submit">Ajouter</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <AlertDialog isOpen={isDeleteAlertOpen} onClose={closeDeleteAlert} isCentered>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirmation de suppression
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Etes-vous sûr de vouloir supprimer ce restaurant ?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={() => handleDeleteRestaurant(deleteRestaurantId)}>
                                Supprimer
                            </Button>
                            <Button onClick={closeDeleteAlert} ml={3}>
                                Annuler
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default CreateRestaurant;
