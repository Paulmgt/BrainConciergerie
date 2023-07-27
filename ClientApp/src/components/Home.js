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
    const displayThreeColumns = useBreakpointValue({ base: false, md: true });
    const navigate = useNavigate();
    const numberOfColumns = useBreakpointValue({ base: 1, sm: 2, md: 3 });
    useEffect(() => {
        getApparts();
    }, []);

    const getApparts = async () => {
        try {
            const response = await fetch('api/Apparts');
            if (response.ok) {
                const data = await response.json();
                setApparts(data || []); // Set default to an empty array
                setLoading(false);
            } else {
                console.error('Error fetching apparts:', response.status);
            }
        } catch (error) {
            console.error('Error fetching apparts:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }





    return (
        <Flex minH="100vh" align="center" justify="center" bg='#282c34'>
            <Grid templateColumns={`repeat(${numberOfColumns}, 1fr)`} gap={6}>
                {apparts.map((appartement, index) => (
                    <Box key={index}
                       >
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
                            <Link to={`/details/${appartement.id}`}>
                                <Button w="full" variant="unstyled">
                                    <CoffeeOutlined style={{ fontSize: '80px', color: 'black' }} />
                                </Button>
                            </Link>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                {appartement.nom}
                            </Text>
                        </Stack>
                    </Box >
                ))}
            </Grid>
        </Flex>
    );
};

export default Home;
