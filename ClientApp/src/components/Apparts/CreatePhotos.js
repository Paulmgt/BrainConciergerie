import React, { useState, useEffect } from 'react';
import {
    Box, Button, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, Select, AlertDialog, AlertDialogOverlay,
    AlertDialogHeader, AlertDialogContent, AlertDialogBody, AlertDialogFooter, Image
} from "@chakra-ui/react";

const CreatePhotos = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialFormState = { Nom: "", PhotoFile: null, AppartId: "" };
    const [formData, setFormData] = useState(initialFormState);
    const [existingApparts, setExistingApparts] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [deletePhotosId, setDeletePhotosId] = useState(null);

    useEffect(() => {
        fetch('/api/Apparts') // Remplacez 'api/Apparts' par l'URL correcte pour obtenir les appartements
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data); // Ajoutez cette ligne pour vérifier les données
                setExistingApparts(data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch('/api/Photos')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data); // Ajoutez cette ligne pour vérifier les données
                setPhotos(data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let postData = { ...formData };

        postData.Appartements = postData.AppartId ? [{ id: Number(postData.AppartId) }] : [];

        try {
            const photoData = new FormData();
            photoData.append("Nom", formData.Nom);
            photoData.append("PhotoFile", formData.PhotoFile);
            photoData.append("AppartId", Number(formData.AppartId));

            const response = await fetch('/api/Photos', {
                method: 'POST',
                body: photoData,
            });

            if (response.ok) {
                // Vous pouvez décider d'afficher un message de succès ici
                setFormData(initialFormState);
                onClose();
            } else {
                console.error('Erreur lors de la création de la photo:', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la création de la photo:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, PhotoFile: e.target.files[0] });
    };

    const handleAppartementChange = (e) => {
        setFormData({ ...formData, AppartId: e.target.value });
    };

    const handleDeletePhotos = async (id) => {
        try {
            const response = await fetch(`api/Photos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
                closeDeleteAlert();
            } else {
                console.error('Error deleting photo:', response.status);
            }
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    const openDeleteAlert = (id) => {
        setDeletePhotosId(id);
        setIsDeleteAlertOpen(true);
    };

    const closeDeleteAlert = () => {
        setIsDeleteAlertOpen(false);
        setDeletePhotosId(null);
    };

    return (
        <Box>
            <Button colorScheme="blue" onClick={onOpen}>Ajouter une photo</Button>

            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Nom de la photo</Th>
                        <Th>Image</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {photos.map((photo) => (
                        <Tr key={photo.id}>
                            <Td>{photo.id}</Td>
                            <Td>{photo.nom}</Td>
                            <Td>
                                <Image src={`data:image/jpg;base64,${photo.photoFile}`} alt={photo.nom} width="200" height="200" />
                            </Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    onClick={() => openDeleteAlert(photo.id)}
                                >
                                    Supprimer
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter une nouvelle photo</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nom de la photo</FormLabel>
                                <Input name="Nom" value={formData.Nom} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Photo</FormLabel>
                                <Input type="file" name="PhotoFile" onChange={handleFileChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Lier à un appartement</FormLabel>
                                <Select name="AppartId" value={formData.AppartId} onChange={handleAppartementChange}>
                                    <option value="" disabled>Choisir un appartement</option>
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
                            Êtes-vous sûr de vouloir supprimer cette photo ?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={() => handleDeletePhotos(deletePhotosId)}>
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

export default CreatePhotos;
