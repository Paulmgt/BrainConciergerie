import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react';
import { IoSearchSharp } from 'react-icons/io5';

export default function EquipementVue() {
    const { id: appartementId } = useParams();
    const [equipements, setEquipements] = useState([]);

    useEffect(() => {
        fetchEquipementsList();
    }, []);

    async function fetchEquipementsList() {
        try {
            const response = await fetch(`/api/Equipements/${appartementId}/equipements`);
            if (!response.ok) {
                throw new Error('Failed to fetch equipements data');
            }
            const equipementsData = await response.json();

            console.log('Raw equipements data:', equipementsData); // Ajout de cette ligne

            const appartementsPromises = equipementsData.map(async equipement => {
                const response = await fetch(`/api/Apparts/${equipement.appartement}`);
                const appartementData = await response.json();

                return { ...equipement, appartement: appartementData, appartementPhoto: appartementData.photoFile };
            });

            const equipementsWithAppartements = await Promise.all(appartementsPromises);

            console.log('Equipements data with appartements:', equipementsWithAppartements);
            setEquipements(equipementsWithAppartements);
        } catch (error) {
            console.error('Error fetching equipements data:', error);
        }
    }





    return (
        <Container maxW={'5xl'} py={12}>
            {equipements.length === 0 ? (
                <div>Chargement en cours...</div>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Stack spacing={4}>
                        <Heading>Section pour Equipements </Heading>
                        <Text color={'gray.500'} fontSize={'lg'}>
                            {/* Contenu du texte */}
                        </Text>
                        <UnorderedList>
                            {equipements.map(equipement => (
                                <ListItem key={equipement.id}>
                                    <Flex align="center">
                                        <IoSearchSharp color={'purple.500'} w={5} h={5} />
                                        <Text fontWeight={600} ml={2}>
                                            {equipement.nom}
                                        </Text>
                                    </Flex>
                                    <Text color={'gray.500'} fontSize={'md'} ml={7}>
                                        {equipement.description}
                                    </Text>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Stack>
                    <Flex>
                        {equipements[0].appartement && (
                            <Image
                                rounded={'md'}
                                alt={'feature image'}
                                src={`data:image/jpg;base64,${equipements[0].appartement.photoFile}`}
                                objectFit={'cover'}
                            />
                        )}
                    </Flex>
                </SimpleGrid>
            )}
        </Container>
    );
}
