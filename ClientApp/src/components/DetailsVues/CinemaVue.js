import React, { useState, useEffect } from 'react';
import { IoFilmSharp } from "react-icons/io5";
import { FaPlusSquare } from 'react-icons/fa';
import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    Icon,
    useColorModeValue,
    UnorderedList,
    ListItem,
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@chakra-ui/react';

import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5';
import { ReactElement } from 'react';

interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
    return (
        <Stack direction={'row'} align={'center'}>
            <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}
                bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};

export default function Cinema() {

    const [cinemas, setCinemas] = useState([]);
    const [cinemaPhotos, setCinemaPhotos] = useState({});
    const [photos, setPhotos] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [availableImages, setAvailableImages] = useState([]);

    useEffect(() => {
        fetchCinemaList();
    }, []);

    useEffect(() => {
        fetch('api/Photos')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data);
                setPhotos(data);
                setAvailableImages(data.map(photo => photo.nom));
            })
            .catch(err => console.error(err));
    }, []);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.value);

        // replace this with the ID of the cinema
        const cinemaId = 1;

        const photo = photos.find(photo => photo.nom === event.target.value);

        fetch(`/api/Cinemas/${cinemaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ photoFile: photo.photoFile }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Updated cinema:', data);
                setCinemaPhotos(prevCinemaPhotos => ({ ...prevCinemaPhotos, [cinemaId]: photo.photoFile }));
            })
            .catch(err => console.error(err));
    };

    async function fetchCinemaList() {
        try {
            const res = await fetch('/api/Cinemas');
            const data = await res.json();

            const promises = data.map(async (cinema) => {
                // Check if cinema has an associated apartment with a valid ID
                if (cinema.appartement && cinema.appartement.id) {
                    const appartRes = await fetch(`/api/Apparts/${cinema.appartement.id}/Photos`);
                    const appartData = await appartRes.json();
                    cinema.appartement.Photos = appartData;
                }
                return cinema;
            });

            const cinemasWithPhotos = await Promise.all(promises);
            setCinemas(cinemasWithPhotos);
        } catch (error) {
            console.error('Error fetching cinemas data:', error);
        }
    }




    return ( 
        <Container maxW={'5xl'} py={12}>
            {cinemas.length === 0 ? (
                <div>Chargement en cours...</div>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Stack spacing={4}>
                        <Text
                            textTransform={'uppercase'}
                            color={'blue.400'}
                            fontWeight={600}
                            fontSize={'sm'}
                            iconBg='purple.100'
                            p={2}
                            alignSelf={'flex-start'}
                            rounded={'md'}
                        >
                            Cinema
                        </Text>
                        <Heading>Section pour Cinema</Heading>
                        <Text color={'gray.500'} fontSize={'lg'}></Text>
                        <UnorderedList>
                            {cinemas.map((cinema) => (
                                <ListItem key={cinema.id}>
                                    <Feature
                                        icon={
                                            <Icon as={IoFilmSharp} color={'purple.500'} w={5} h={5} />
                                        }
                                        iconBg='purple.100'
                                        text={cinema.nom}
                                    />
                                    <Text color={'gray.500'} fontSize={'md'} ml={8}>
                                        {cinema.description}
                                    </Text>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Stack>
                    <Flex justifyContent="center" alignItems="center" width="100%">
                        <Box position="fixed" width="46%" top="50%" left="70%" transform="translate(-50%, -20%)">
                                {cinemas.map((cinema) =>
                                    cinema.appartement?.Photos?.map((photo, index) =>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Box>
                                                    <Image
                                                        rounded={'md'}
                                                        alt={`Photo for cinema ${cinema.id}`}
                                                        src={`data:image/jpg;base64,${cinema.photoFile}`}
                                                        objectFit={'cover'}
                                                    />
                                                    <Box position="absolute" right="5" top="5">
                                                        <Icon as={FaPlusSquare} boxSize="6" color="white" />
                                                    </Box>
                                                </Box>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <select value={selectedImage} onChange={(event) => handleImageChange(event, cinema.id, cinema.appartement.id)}>
                                                    {cinema.appartement?.Photos?.map((photoOption, index) => (
                                                        <option value={photoOption}>{`Photo ${index + 1}`}</option>
                                                    ))}
                                                </select>
                                            </PopoverContent>
                                        </Popover>
                                    )
                                )}

                        </Box>
                    </Flex>
                </SimpleGrid>
            )}
        </Container>
    );
}
