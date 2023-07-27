import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // New import
import { IoCartSharp } from "react-icons/io5";
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
} from '@chakra-ui/react';
import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
} from 'react-icons/io5';
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

export default function AutresActivitesVue() {
    const { id: appartementId } = useParams(); // New constant
    const [activites, setActivites] = useState([]);
    const [photos, setPhotos] = useState([])
    useEffect(() => {
        fetchActivitesList();
    }, []);

  async function fetchActivitesList() {
    try {
        const response = await fetch(`/api/AutresActivites/${appartementId}/autresactivites`);
        if (!response.ok) {
            throw new Error('Failed to fetch activities data');
        }
        const activitesData = await response.json();

        console.log('Raw activites data:', activitesData); // New console.log

        const appartementsPromises = activitesData.map(async activite => {
            const response = await fetch(`/api/Apparts/${activite.appartementId}`);
            const appartementData = await response.json();
            
            const responsePhotos = await fetch(`/api/Photos/${activite.appartementId}`);
            const photosData = await responsePhotos.json();

            return { ...activite, appartement: appartementData, appartementPhoto: appartementData.photoFile, photos: photosData };
        });

        const activitesWithAppartements = await Promise.all(appartementsPromises);

        console.log('Activites data with appartements:', activitesWithAppartements);
        setActivites(activitesWithAppartements);
    } catch (error) {
        console.error('Error fetching activites data:', error);
    }
}


    return (
        <Container maxW={'5xl'} py={12}>
            {activites.length === 0 ? (
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
                            Shopping
                        </Text>
                        <Heading>Section pour Shopping</Heading>
                        <Text color={'gray.500'} fontSize={'lg'}></Text>
                        <UnorderedList>
                            {activites.map((activite) => (
                                <ListItem key={activite.id}>
                                    <Feature
                                        icon={
                                            <Icon as={IoCartSharp} color={'purple.500'} w={5} h={5} />
                                        }
                                        iconBg='purple.100'
                                        text={activite.nom}
                                    />
                                    <Text color={'gray.500'} fontSize={'md'} ml={8}>
                                        {activite.description}
                                    </Text>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Stack>
                        <Flex justifyContent="center" alignItems="center" width="100%">
                            <Box position="fixed" width="46%" top="50%" left="70%" transform="translate(-50%, -20%)">
                                {activites.map((activite) =>
                                    photos
                                        .filter(photo => photo.appartementId === activite.appartement.id)
                                        .slice(0, 1)  // only take the first photo
                                        .map((photo, index) => (
                                            <Image
                                                key={index}
                                                rounded={'md'}
                                                alt={`Photo ${index + 1} for apartment ${activite.appartement.id}`}
                                                src={`data:image/jpg;base64,${photo.photoFile}`}
                                                objectFit={'cover'}
                                                boxSize="100%"  // adjust image size according to the container
                                            />
                                        ))
                                )}
                            </Box>
                        </Flex>
                </SimpleGrid>
            )}
        </Container>

    );
}
