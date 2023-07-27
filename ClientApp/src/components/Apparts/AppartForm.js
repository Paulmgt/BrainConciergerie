import React, { useState, useEffect } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Box, Heading, VStack, Button,
    IconButton, Drawer, DrawerOverlay,
    useDisclosure, DrawerContent, 
    DrawerCloseButton, DrawerHeader,
    DrawerBody
} from '@chakra-ui/react';



import Apparts from './Apparts';
import Equipements from './CreateEquipement';
import CreatePhotos from './CreatePhotos';
import CreateAutreActivite from './CreateAutreActivite';
import CreateBar from './CreateBar';
import CreateCinema from './CreateCinema';
import CreateMonument from './CreateMonument';
import CreateRestaurant from './CreateRestaurant';
import RatingDetails from '../DetailsVues/RatingTable';



const AppartForm = () => {


    const [apparts, setApparts] = useState([]);
    const [equipements, setEquipements] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [autresactivites, setAutresactivites] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [bar, setBar] = useState([]);
    const [monuments, setMonuments] = useState([]);
    const [restaurants, setRestaurants] = useState([]);



    const fetchUrlApparts = 'api/Apparts';
    const fetchUrlEquipements = '/api/Equipements';
    const fetchUrlPhotos = '/api/Photos';
    const fetchUrlAutreActivite = 'api/AutresActivites';
    const fetchUrlBars = 'api/Bars';
    const fetchUrlCinemas = 'api/Cinemas';
    const fetchUrlMonuments = 'api/Monuments';
    const fetchUrlRestaurants = 'api/Restaurants';

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [activeTab, setActiveTab] = useState('apparts');
    const btnRef = React.useRef();




    useEffect(() => {
        fetch(fetchUrlApparts)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => setApparts(data))
            .catch(err => console.error(err));

        fetch(fetchUrlEquipements)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => setEquipements(data))
            .catch(err => console.error(err));

        fetch(fetchUrlPhotos)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => setPhotos(data))
            .catch(err => console.error(err));

        fetch(fetchUrlAutreActivite)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => setAutresactivites(data))
            .catch(err => console.error(err));

        fetch(fetchUrlBars)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => setBar(data))
            .catch(err => console.error(err));

        fetch(fetchUrlCinemas)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => setBar(data))
            .catch(err => console.error(err));

        fetch(fetchUrlMonuments)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => setBar(data))
            .catch(err => console.error(err));

        fetch(fetchUrlRestaurants)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! status : ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(data => setBar(data))
            .catch(err => console.error(err));

    }, []);

    const renderComponent = () => {
        switch (activeTab) {
            case 'apparts':
                return <Apparts apparts={apparts} handleAppartsSubmit={handleAppartsSubmit} />;
            case 'equipements':
                return <Equipements equipements={equipements} handleEquipementsSubmit={handleEquipementsSubmit} />;
            case 'photos':
                return <CreatePhotos photos={photos} handlePhotosSubmit={handlePhotosSubmit} />;
            case 'autresactivites':
                return <CreateAutreActivite autresactivites={autresactivites} handleAutreActiviteSubmit={handleAutreActiviteSubmit} />;
            case 'bars':
                return <CreateBar bar={bar} handleBarSubmit={handleBarSubmit} />;
            case 'cinemas':
                return <CreateCinema cinemas={cinemas} handleBarSubmit={handleBarSubmit} />;
            case 'monuments':
                return <CreateMonument monuments={monuments} handleMonumentsSubmit={handleMonumentsSubmit} />;
            case 'restaurants':
                return <CreateRestaurant restaurants={restaurants} handleRestaurantsSubmit={handleRestaurantsSubmit} />;
            case 'ratingDetails':
                return <RatingDetails appartementId={1} />;
            default:
                return <Apparts apparts={apparts} handleCinemasSubmit={handleCinemasSubmit} />;
        }
    };

    const handleAppartsSubmit = async (formData) => {
        // same logic as your handleSubmit in Apparts component
    };

    const handleEquipementsSubmit = async (formData) => {
        // same logic as your handleSubmit in Equipements component
    };

    const handlePhotosSubmit = async (formData) => {
        // same logic as your handleSubmit in Equipements component
    };

    const handleAutreActiviteSubmit = async (formData) => {
        // same logic as your handleSubmit in Equipements component
    };
    const handleBarSubmit = async (formData) => {
        // same logic as your handleSubmit in Equipements component
    };
    const handleCinemasSubmit = async (formData) => {
        // same logic as your handleSubmit in Equipements component
    };
    const handleMonumentsSubmit = async (formData) => {
        // same logic as your handleSubmit in Equipements component
    };

    const handleRestaurantsSubmit = async (formData) => {
        // same logic as your handleSubmit in Equipements component
    };


    return (
        <Box display="flex" height="100vh">
            <IconButton
                ref={btnRef}
                colorScheme="teal"
                onClick={onOpen}
                icon={<HamburgerIcon />}
                marginRight="10px"
                bg='#fff'
            />

            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent backgroundColor='#282c34'>
                        <DrawerCloseButton />
                        <DrawerHeader>Dashboard</DrawerHeader>
                        <DrawerBody>
                            <VStack
                                spacing={4}
                                justify="flex-start"
                                align="stretch"
                            >
                                <Button onClick={() => setActiveTab('apparts')}>Apparts</Button>
                                <Button onClick={() => setActiveTab('equipements')}>Equipements</Button>
                                <Button onClick={() => setActiveTab('photos')}>Photos</Button>
                                <Button onClick={() => setActiveTab('autresactivites')}>Autres Activites</Button>
                                <Button onClick={() => setActiveTab('bars')}>Bars</Button>
                                <Button onClick={() => setActiveTab('cinemas')}>Cinemas</Button> 
                                <Button onClick={() => setActiveTab('monuments')}>Monuments</Button>
                                <Button onClick={() => setActiveTab('restaurants')}>Restaurants</Button>
                                <Button onClick={() => setActiveTab('ratingDetails')}>Details des Notations</Button>
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>

            <Box flex="1" overflowY="auto">
                {renderComponent()}
            </Box>
        </Box>
    );
};

export default AppartForm;
