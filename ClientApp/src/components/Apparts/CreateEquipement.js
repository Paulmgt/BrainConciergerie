import React, { useState, useEffect } from 'react';
import {
    Box, Button, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody,
    AlertDialogFooter, AlertDialogHeader, NumberInput, NumberInputField, Textarea, Select
} from "@chakra-ui/react"

const Equipements = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [equipements, setEquipements] = useState([]);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [deleteEquipementId, setDeleteEquipementId] = useState(null);
    const initialFormState = { Nom: "", Quantite: "", Description: "", AppartId: "" };
    const [formData, setFormData] = useState(initialFormState);
    const fetchUrl = '/api/Equipements';
    const [existingApparts, setExistingApartments] = useState([]);

    useEffect(() => {
        fetch('/api/Apparts')
            .then(response => response.json())
            .then(data => setExistingApartments(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => setEquipements(data))
            .catch(err => console.error(err));
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e) => {
        setFormData({ ...formData, AppartId: e.target.value });
    };

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
                body: JSON.stringify(postData),
            });
            if (response.ok) {
                const newEquipement = await response.json();
                setEquipements([...equipements, newEquipement]);
                setFormData(initialFormState);
                onClose();
            } else {
                console.error('Erreur lors de la création de l\'équipement:', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'équipement:', error);
        }
    };

    const handleDeleteEquipement = async (id) => {
        try {
            const response = await fetch(`${fetchUrl}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setIsDeleteAlertOpen(false);
                setEquipements(equipements.filter(equipement => equipement.id !== id));
            } else {
                console.error('Error deleting equipement:', response.status);
            }
        } catch (error) {
            console.error('Error deleting equipement:', error);
        }
    };

    const openDeleteAlert = (id) => {
        setDeleteEquipementId(id);
        setIsDeleteAlertOpen(true);
    };

    const closeDeleteAlert = () => {
        setIsDeleteAlertOpen(false);
        setDeleteEquipementId(null);
    };

    return (
        <Box>
            <Button colorScheme="blue" onClick={onOpen}>Ajouter un équipement</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Nom de l'équipement</Th>
                        <Th>Quantité</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {equipements
                        .filter(equipement => equipement.nom !== null)
                        .map((equipement) => (
                            <Tr key={equipement.id}>
                                <Td>{equipement.id}</Td>
                                <Td>{equipement.nom}</Td>
                                <Td>{equipement.quantite}</Td>
                                <Td>{equipement.description}</Td>
                                <Td>
                                    <Button colorScheme="red" onClick={() => openDeleteAlert(equipement.id)}>Supprimer</Button>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter un nouvel équipement</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nom de l'équipement</FormLabel>
                                <Input name="Nom" value={formData.Nom} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Quantité</FormLabel>
                                <NumberInput value={formData.Quantite} onChange={(value) => setFormData({ ...formData, Quantite: value })} min={0}>
                                    <NumberInputField name="Quantite" />
                                </NumberInput>
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
                            Etes-vous sûr de vouloir supprimer cet équipement ?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={() => handleDeleteEquipement(deleteEquipementId)}>
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

export default Equipements;
