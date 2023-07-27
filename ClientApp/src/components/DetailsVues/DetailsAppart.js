import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Grid, Box, Button, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoFilmSharp } from "react-icons/io5";

import {
    Stack,
    Text,
    Icon,
    useDisclosure,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberDecrementStepper,
    ModalFooter,
    Textarea,
} from '@chakra-ui/react';
import {
    CoffeeOutlined,
    CarryOutOutlined,
    KeyOutlined,
    DeleteOutlined,
    CommentOutlined,
    WifiOutlined,
    ShopOutlined,
    CarOutlined,
    ScheduleOutlined,
    TeamOutlined,
    SkinOutlined,
    SplitCellsOutlined,
    ShoppingOutlined,
    SolutionOutlined,
} from '@ant-design/icons';
import { useForm } from 'react-hook-form';
const DetailsAppart = () => {
    const { id } = useParams();
    const [appart, setAppart] = useState(null);
    const displayThreeColumns = useBreakpointValue({ base: false, md: true });
    const numberOfColumns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [notations, setNotations] = useState([]);
    const initialFormState = { NomClient: "", Note: "", AppartId: id };
    const [formData, setFormData] = useState({ NomClient: "", Note: "", Commentaire: "", AppartId: id });
    const fetchUrl = `/api/NotationsApparts`;


    useEffect(() => {
        getIdAppart(id);
    }, [id]);

    const getIdAppart = async (id) => {
        const data = await fetchAppartDetails(id);
        setAppart(Array.isArray(data) ? data : [data]);
    }

    async function fetchAppartDetails(id) {
        try {
            const response = await fetch(`/Apparts/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('There was a problem with the fetch operation: ' + error.message);
        }
    }


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
                setFormData({ NomClient: "", Note: "", Commentaire: "", AppartId: id });
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    function GridItem({ linkTo, icon, children, iconComponent, onClick }) {
        const IconComponent = iconComponent || (() => <icon style={{ fontSize: '80px', color:'black' }} />);
        return (
            <Box>
                <Stack
                    spacing={4}
                    w="full"
                    maxW="md"
                    bg='#fff'
                    rounded="xl"
                    boxShadow="5px 10px 16px rgba(255, 223, 0, 0.5)" // ombre dorée
                    bgImage="linear-gradient(to right, rgba(255, 223, 0, 1), rgba(255, 193, 7, 0.9), rgba(255, 160, 0, 1))"
                    p={12}
                    my={18}
                    textAlign="center"
                >
                    <Link to={linkTo}>
                        <Button w="full" variant="unstyled">
                            <IconComponent />
                        </Button>
                    </Link>
                    <br />
                    <Text align="center" fontSize="2xl" fontWeight="bold">
                        {children}
                    </Text>
                </Stack>
            </Box>
        );
    }

    const isLargeScreen = useBreakpointValue({ base: false, lg: true });

    const allGridItems = [

        <GridItem linkTo={`/details/${id}`} iconComponent={() => <CoffeeOutlined style={{ fontSize: '80px', color: 'black' }} />}>Cafe & Bar</GridItem>,
        <GridItem iconComponent={() => <ScheduleOutlined style={{ fontSize: '80px', color:'black' }} />}>Entree</GridItem>,
        <GridItem linkTo={`/equipment/${id}`} iconComponent={() => <SolutionOutlined style={{ fontSize: '80px', color: 'black' }} />}>Equipement</GridItem>,
        <GridItem iconComponent={() => <ShopOutlined style={{ fontSize: '80px', color: 'black' }} />}>Restaurants</GridItem>,
        <GridItem linkTo={`/cinema/${id}`} iconComponent={() => <Icon as={IoFilmSharp} color={'black'} w={20} h={20} />}>Cinema</GridItem>,
        <GridItem iconComponent={() => <WifiOutlined style={{ fontSize: '80px', color:'black' }} />}>Acces Wifi</GridItem>,
        <GridItem iconComponent={() => <TeamOutlined style={{ fontSize: '80px', color:'black' }} />}>Tourismes</GridItem>,
        <GridItem linkTo={`/shopping/${id}`} iconComponent={() => <SkinOutlined style={{ fontSize: '80px', color:'black' }} />}>Shopping</GridItem>,
        <GridItem iconComponent={() => <CarOutlined style={{ fontSize: '80px', color:'black' }} />}>Parking</GridItem>,
        <GridItem iconComponent={() => <SplitCellsOutlined onClick={onOpen} style={{ fontSize: '80px', color:'black' }} />}>Sortie</GridItem>,
        <GridItem iconComponent={() => <ShoppingOutlined style={{ fontSize: '80px', color:'black' }} />}>Consigne</GridItem>,
        <GridItem iconComponent={() => <ShoppingOutlined style={{ fontSize: '80px', color:'black' }} />}>Transports</GridItem>

    ];

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg='#282c34'
        >
            <Grid templateColumns={`repeat(${numberOfColumns}, 1fr)`} gap={6}>
                {allGridItems}

               


            </Grid>
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
                            </FormControl>
                            <FormControl>
                                <FormLabel>Commentaire</FormLabel>
                                <Textarea name="Commentaire" value={formData.Commentaire} onChange={handleChange} />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" type="submit">Envoyer</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Flex>



    );
};

export default DetailsAppart;
