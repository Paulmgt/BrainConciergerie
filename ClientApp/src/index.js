import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from './Config/AuthContext';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    styles: {
        global: {
            body: {
                color: 'black', // text color
                backgroundColor: '#282c34', // background color
            },
        },
    },
    colors: {
        primary: '#daa520', // primary color
    },
});

root.render(
    <React.StrictMode>
        <BrowserRouter basename={baseUrl}>
            <AuthProvider>
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
