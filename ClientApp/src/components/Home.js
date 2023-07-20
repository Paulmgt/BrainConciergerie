/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { Flex, Grid, Box, Button, useBreakpointValue, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Text,
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

const Home = () => {
    const [apparts, setApparts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [deleteAppartId, setDeleteAppartId] = useState(null);
    const displayThreeColumns = useBreakpointValue({ base: false, md: true });
    const navigate = useNavigate();

    useEffect(() => {
        getApparts();
    }, []);

    const getApparts = async () => {
        try {
            const response = await fetch('/apparts');
            if (response.ok) {
                const data = await response.json();
                setApparts(data);
                setLoading(false);
            } else {
                console.error('Error fetching apparts:', response.status);
            }
        } catch (error) {
            console.error('Error fetching apparts:', error);
        }
    };

    const handleDeleteAppart = async (id) => {
        try {
            const response = await fetch(`/apparts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setApparts((prevApparts) => prevApparts.filter((appart) => appart.id !== id));
                closeDeleteAlert();
            } else {
                console.error('Error deleting appart:', response.status);
            }
        } catch (error) {
            console.error('Error deleting appart:', error);
        }
    };

    const openDeleteAlert = (id) => {
        setDeleteAppartId(id);
        setIsDeleteAlertOpen(true);
    };

    const closeDeleteAlert = () => {
        setIsDeleteAlertOpen(false);
        setDeleteAppartId(null);
    };

    const handleEditAppart = (id, navigate) => {
        navigate(`/edit_appart/${id}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
            <Grid templateColumns={displayThreeColumns ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'} gap={6}>
                {apparts.map((appartement, index) => (
                    <Box key={index}>
                        <Stack
                            spacing={4}
                            w="full"
                            maxW="md"
                            bg={useColorModeValue('', 'gray.700')}
                            rounded="xl"
                            boxShadow="lg"
                            p={12}
                            my={18}
                            textAlign="center"
                        >
                            <Link to={`/details/${appartement.id}`}>
                                <Button w="full" variant="unstyled">
                                    <CoffeeOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                                </Button>
                            </Link>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                {appartement.nom}
                            </Text>
                            <Button variant="unstyled" color="red" onClick={() => openDeleteAlert(appartement.id)}>
                                <DeleteOutlined style={{ fontSize: '24px' }} />
                            </Button>
                            <Button variant="unstyled" color="blue" onClick={() => handleEditAppart(appartement.id, navigate)}>
                                Modifier
                            </Button>
                        </Stack>
                    </Box>
                ))}
            </Grid>

            {/* Confirmation de suppression */}
            <AlertDialog isOpen={isDeleteAlertOpen} onClose={closeDeleteAlert} isCentered>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirmation de suppression
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Êtes-vous sûr de vouloir supprimer cet appartement ?
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
        </Flex>
    );
};

export default Home;
