import React, { useState, useEffect } from 'react';
import {
    Box, Button, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody,
    AlertDialogFooter, AlertDialogHeader, Textarea, Select

} from "@chakra-ui/react"

const CreateBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [bars, setBars] = useState([]);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [deleteBarId, setDeleteBarId] = useState(null);
    const initialFormState = { Nom: "", Localisation: "", Description: "" };
    const [formData, setFormData] = useState(initialFormState);
    const fetchUrl = '/api/Bars';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const newBar = await response.json();
                setBars([...bars, newBar]);
                setFormData(initialFormState);
                onClose();
            } else {
                console.error('Erreur lors de la création du bar:', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la création du bar:', error);
        }
    };

    useEffect(() => {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBars(data);
            })
            .catch(err => console.error(err));
    }, []);


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDeleteBar = async (id) => {
        try {
            const response = await fetch(`${fetchUrl}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setBars((prevBars) => prevBars.filter((bar) => bar.id !== id));
                closeDeleteAlert();
            } else {
                console.error('Erreur lors de la suppression du bar:', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du bar:', error);
        }
    };

    const openDeleteAlert = (id) => {
        setDeleteBarId(id);
        setIsDeleteAlertOpen(true);
    };

    const closeDeleteAlert = () => {
        setIsDeleteAlertOpen(false);
        setDeleteBarId(null);
    };

    return (
        <Box>
            <Button colorScheme="blue" onClick={onOpen}>Ajouter un bar</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Nom du bar</Th>
                        <Th>Localisation</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {bars
                        .filter(bar => bar.nom !== null)
                        .map((bar) => (
                            <Tr key={bar.id}>
                                <Td>{bar.id}</Td>
                                <Td>{bar.nom}</Td>
                                <Td>{bar.localisation}</Td>
                                <Td>{bar.description}</Td>
                                <Td>
                                    <Button colorScheme="red" onClick={() => openDeleteAlert(bar.id)}>Supprimer</Button>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter un nouveau bar</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nom du bar</FormLabel>
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
                            Etes-vous sûr de vouloir supprimer ce bar ?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={() => handleDeleteBar(deleteBarId)}>
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

export default CreateBar;
