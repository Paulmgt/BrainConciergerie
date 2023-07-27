import React, { useState, useEffect } from 'react';
import {
    Box, Button, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody,
    AlertDialogFooter, AlertDialogHeader, Textarea
} from "@chakra-ui/react"

const Apparts = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [apparts, setApparts] = useState([]);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [deleteAppartId, setDeleteAppartId] = useState(null);

    const initialFormState = {
        Nom: '',
        Localisation: '',
        Poubelles: '',
        Transports: '',
        Consignes: '',
        Parking: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const fetchUrl = 'api/Apparts';

    // Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.Nom || !formData.Localisation) {
            console.error('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        let postData = { ...formData };

        try {
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if (response.ok) {
                const newAppart = await response.json();
                setApparts([...apparts, newAppart]);
                setFormData(initialFormState);
                onClose();

                // Afficher les données de la réponse dans la console
                console.log('Nouvel appartement ajouté:', newAppart);
            } else {
                console.error('Erreur lors de la création de l\'appart:', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'appart:', error);
            console.log('postData:', postData);
        }
    };

    // Utiliser useEffect pour charger les données existantes lors du montage du composant
    useEffect(() => {
        const getApparts = async () => {

            try {
                const response = await fetch(fetchUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    const data = await response.json();
                    setApparts(data);
                }
            } catch (error) {
                console.error('Error fetching apparts:', error);
            }
        };
        getApparts();
    }, []);

    // Gérer les changements de saisie dans le formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Fonction de suppression de l'appartement
    const handleDeleteAppart = async (id) => {
    try {
        const response = await fetch(`api/Apparts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            closeDeleteAlert();
            // Mettre à jour l'état après la suppression
            setApparts((prevApparts) => prevApparts.filter(appart => appart.Id !== id));
        } else {
            console.error('Erreur lors de la suppression de l\'appart:', response.status);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'appart:', error);
    }
};



    // Fonctions pour gérer l'ouverture et la fermeture de la boîte de dialogue de suppression
    const openDeleteAlert = (id) => {
        setDeleteAppartId(id);
        setIsDeleteAlertOpen(true);
    };

    const closeDeleteAlert = () => {
        setIsDeleteAlertOpen(false);
        setDeleteAppartId(null);
    };


    return (
        <Box>
            <Button colorScheme="blue" onClick={onOpen}>Ajouter un appart</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Nom</Th>
                        <Th>Localisation</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {apparts
                        .filter(appart => appart.nom !== null)
                        .map((appart) => (
                            <Tr key={appart.id}>
                                <Td>{appart.id}</Td>
                                <Td>{appart.nom}</Td>
                                <Td>{appart.localisation}</Td>
                                <Td>
                                    <Button colorScheme="red" onClick={() => openDeleteAlert(appart.id)}>Supprimer</Button>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter un nouvel appart</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nom</FormLabel>
                                <Input name="Nom" value={formData.Nom} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Localisation</FormLabel>
                                <Textarea name="Localisation" value={formData.Localisation} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Poubelles</FormLabel>
                                <Textarea name="Poubelles" value={formData.Poubelles} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Transports</FormLabel>
                                <Textarea name="Transports" value={formData.Transports} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Consignes</FormLabel>
                                <Textarea name="Consignes" value={formData.Consignes} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Parking</FormLabel>
                                <Textarea name="Parking" value={formData.Parking} onChange={handleInputChange} />
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
                            Etes-vous sur de vouloir supprimer cet appartement ?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={() => handleDeleteAppart(deleteAppartId)}>
                                Supprimer
                            </Button>
                            <Button ml={3} onClick={closeDeleteAlert}>
                                Annuler
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </Box>
    );
};

export default Apparts;
