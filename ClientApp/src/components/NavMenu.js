import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spacer, Text } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';

const NavMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <Box bg="linear-gradient(to bottom, rgba(255, 223, 0, 1), rgba(255, 193, 7, 0.9), rgba(255, 160, 0, 1))" p={4} color='#daa520'>
            <Flex>
                <Text as={Link} to="/" fontSize="xl" fontWeight="bold" color='black'>Brain Conciergerie</Text>
                <Spacer />
                <Menu>
                    <MenuButton as={Button}>Menu</MenuButton>
                    <MenuList>
                        <MenuItem as={Link} to="/">Home</MenuItem>
                        <MenuItem as={Link} to="/appart">Apparts</MenuItem>
                        <MenuItem onClick={handleLogout}>Deconnexion</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    );
};

export default NavMenu;
