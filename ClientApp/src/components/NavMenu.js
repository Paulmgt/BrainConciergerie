import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { getAuth, signOut } from 'firebase/auth';
import {
    Button,
    useColorMode,
    Stack,
    Menu,
    MenuItem,
    MenuButton,
    MenuList,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const NavMenu = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const handleLogout = () => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                // La déconnexion s'est effectuée avec succès
                // Vous pouvez effectuer des actions supplémentaires si nécessaire
            })
            .catch((error) => {
                // Une erreur s'est produite lors de la déconnexion
                const errorCode = error.code;
                const errorMessage = error.message;
                // Gérez l'erreur
            });
    };

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">AppartAppCs</NavbarBrand>
                <NavbarToggler className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen navbar>
                    <Stack direction="row" spacing={4} align="center">
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        <Menu>
                            <MenuButton as={Button}>Menu</MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <NavLink tag={Link} to="/">
                                        Home
                                    </NavLink>
                                </MenuItem>
                                <MenuItem>
                                    <NavLink tag={Link} to="/counter">
                                        Counter
                                    </NavLink>
                                </MenuItem>
                                <MenuItem>
                                    <NavLink tag={Link} to="/appart">
                                        Appart_Form
                                    </NavLink>
                                </MenuItem>
                                <MenuItem>
                                    <NavLink tag={Link} to="/delete">
                                        DeleteAppart
                                    </NavLink>
                                </MenuItem>
                                <MenuItem>
                                    <button onClick={handleLogout}>Déconnexion</button>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>
                </Collapse>
            </Navbar>
        </header>
    );
};

export default NavMenu;
