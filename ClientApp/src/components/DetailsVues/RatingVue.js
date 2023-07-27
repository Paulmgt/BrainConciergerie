import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';

const NotationForm = ({ appartementId, appartementNom }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formData, setFormData] = useState({ NomClient: "", Note: "", AppartId: appartementId });



    const handleChange = (e, field) => {
        if (field === 'Note') {
            setFormData({
                ...formData,
                [e.target.name]: String(e.target.value),
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/NotationsApparts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const newNotation = await response.json();
                console.log(newNotation);
                setFormData({ NomClient: "", Note: "", AppartId: appartementId });
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button colorScheme="blue" onClick={onOpen}>Noter cet appartement</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>Noter l'appartement</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nom</FormLabel>
                                <Input name="NomClient" value={formData.NomClient} onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Note</FormLabel>
                                <NumberInput max={5} min={1}>
                                    <NumberInputField
                                        name="Note"
                                        value={formData.Note}
                                        onChange={(e) => handleChange(e, 'Note')}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>

                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" type="submit">Envoyer</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NotationForm;
