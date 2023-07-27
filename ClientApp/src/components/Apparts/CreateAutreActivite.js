import React, { useState, useEffect } from 'react';
import {
    Box, Button, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody,
    AlertDialogFooter, AlertDialogHeader, Textarea, Select

} from "@chakra-ui/react"

const AutresActivites = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activites, setActivites] = useState([]);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [deleteActiviteId, setDeleteActiviteId] = useState(null);
    const initialFormState = { Nom: "", Localisation: "", Description: "", AppartId: "" };
    const [formData, setFormData] = useState(initialFormState);
    const fetchUrl = '/api/AutresActivites';
    const [existingApparts, setExistingApartments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let postData = { ...formData };
        postData.AppartId = Number(formData.AppartId);
        try {
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const newActivite = await response.json();
                setActivites([...activites, newActivite]);
                setFormData(initialFormState);
                onClose();
            } else {
                console.error('Erreur lors de la création de l\'activité:', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'activité:', error);
        }
    };

    useEffect(() => {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setActivites(data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch('/api/Apparts')
            .then(response => response.json())
            .then(data => setExistingApartments(data))
            .catch(err => console.error(err));
    }, []);


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e) => {
        setFormData({ ...formData, AppartId: e.target.value });
    };

    const handleDeleteActivite = async (id) => {
        try {
            const response = await fetch(`${fetchUrl}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setActivites((prevActivites) => prevActivites.filter((activite) => activite.id !== id));
                closeDeleteAlert();
            } else {
                console.error('Erreur lors de la suppression de l\'activité:', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'activité:', error);
        }
    };

    const openDeleteAlert = (id) => {
        setDeleteActiviteId(id);
        setIsDeleteAlertOpen(true);
    };

    const closeDeleteAlert = () => {
        setIsDeleteAlertOpen(false);
        setDeleteActiviteId(null);
    };

    return (
        <Box>
            <Button colorScheme="blue" onClick={onOpen}>Ajouter une activité</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Nom de l'activité</Th>
                        <Th>Localisation</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {activites
                        .filter(activite => activite.nom !== null)
                        .map((activite) => (
                            <Tr key={activite.id}>
                                <Td>{activite.id}</Td>
                                <Td>{activite.nom}</Td>
                                <Td>{activite.localisation}</Td>
                                <Td>{activite.description}</Td>
                                <Td>
                                    <Button colorScheme="red" onClick={() => openDeleteAlert(activite.id)}>Supprimer</Button>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter une nouvelle activité</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nom de l'activité</FormLabel>
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
                                <Select name="AppartId" value={formData.AppartId} onChange={handleSelectChange}>
                                    <option value="" disabled>Choisir un appartement</option>
                                    <option value={null}>Ne pas lier à un appartement</option>
                                    {existingApparts.map(appart => (
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
                            Etes-vous sûr de vouloir supprimer cette activité ?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={() => handleDeleteActivite(deleteActiviteId)}>
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

export default AutresActivites;
