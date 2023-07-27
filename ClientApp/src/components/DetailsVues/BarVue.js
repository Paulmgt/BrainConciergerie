import React, { useState, useEffect } from 'react';
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

export default function Bars() {
    const [bars, setBars] = useState([]);

    useEffect(() => {
        fetchBarsList();
    }, []);

    async function fetchBarsList() {
        try {
            const response = await fetch('/api/Bars');
            if (!response.ok) {
                throw new Error('Failed to fetch bars data');
            }
            const barsData = await response.json();
            setBars(barsData);
        } catch (error) {
            console.error('Error fetching bars data:', error);
        }
    }

    return (
        <Container maxW={'5xl'} py={12}>
            {bars.length === 0 ? (
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
                            Bars
                        </Text>
                            <Heading>Section Barrs et Cafe </Heading>
                        <Text color={'gray.500'} fontSize={'lg'}>
                       
                        </Text>
                        <UnorderedList>
                            {bars.map((bar) => (
                                <ListItem key={bar.id}>
                                    <Feature
                                        icon={
                                            <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
                                        }
                                        iconBg='purple.100'
                                        text={bar.nom}
                                    />
                                    <Text color={'gray.500'} fontSize={'md'} ml={8}>
                                        {bar.description}
                                    </Text>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Stack>
                    <Flex>
                        {/* Note: This assumes that the first appartement in the list has a photoFile property */}
                        {bars[0].appartement &&
                            <Image
                                rounded={'md'}
                                alt={'feature image'}
                                src={`data:image/jpeg;base64,${bars[0].appartement[0].photoFile}`}
                                objectFit={'cover'}
                            />
                        }
                    </Flex>
                </SimpleGrid>
            )}
        </Container>
    );
}
