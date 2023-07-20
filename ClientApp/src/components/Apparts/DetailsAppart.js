import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Grid, Box, Button, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
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

const DetailsAppart = () => {
    const { id } = useParams();
    const displayThreeColumns = useBreakpointValue({ base: false, md: true });

    // Utilisez l'ID pour récupérer les détails de l'appartement à partir de votre liste d'appartements

    return (
           
            <Flex
                minH="100vh"
                align="center"
                justify="center"
                bg={useColorModeValue('gray.50', 'gray.800')}
        >
                <Grid
                    templateColumns={displayThreeColumns ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'}
                    gap={6}
                >
                    <Box>
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
                            <Link to="/restoproxi-page">
                                <Button w="full" variant="unstyled">
                                    <CoffeeOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                                </Button>
                            </Link>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                Café & Bar
                            </Text>
                        </Stack>
                    </Box>

                    <Box>
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
                            <Button w="full" variant="unstyled">
                                <ScheduleOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                            </Button>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                Entrée
                            </Text>
                        </Stack>
                    </Box>

                    {/* Ajoutez ici les deux autres Stack de la même manière */}

                    <Box>
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
                            <Button w="full" variant="unstyled">
                                <SolutionOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                            </Button>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                Equipement
                            </Text>
                        </Stack>
                    </Box>

                    <Box>
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
                            <Button w="full" variant="unstyled">
                                <ShopOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                            </Button>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                Restaurants
                            </Text>
                        </Stack>
                    </Box>

                    <Box>
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
                            <Button w="full" variant="unstyled">
                                <WifiOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                            </Button>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                Accès Wifi
                            </Text>
                        </Stack>
                    </Box>

                    <Box>
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
                            <Button w="full" variant="unstyled">
                                <TeamOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                            </Button>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                Tourismes
                            </Text>
                        </Stack>
                    </Box>

                    <Box>
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
                            <Button w="full" variant="unstyled">
                                <SkinOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                            </Button>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                Shopping
                            </Text>
                        </Stack>
                    </Box>

                    <Box>
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
                            <Button w="full" variant="unstyled">
                                <CarOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                            </Button>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                Parking
                            </Text>
                        </Stack>
                    </Box>

                    <Box>
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
                            <Button w="full" variant="unstyled">
                                <SplitCellsOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                            </Button>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                Sortie
                            </Text>
                        </Stack>
                    </Box>

                    <Box>
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
                            <Button w="full" variant="unstyled">
                                <ShoppingOutlined style={{ fontSize: '80px', color: '#FFD700' }} />
                            </Button>
                            <br />
                            <Text align="center" fontSize="2xl" fontWeight="bold">
                                Achats
                            </Text>
                        </Stack>
                    </Box>

                </Grid>
            </Flex>
    );
};

export default DetailsAppart;
