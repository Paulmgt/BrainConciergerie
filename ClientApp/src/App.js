import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import PrivateRoute from './Config/PrivateRoute';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            
                <Layout>
                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const { element, requireAuth, ...rest } = route;
                            return requireAuth ? (
                                <PrivateRoute key={index} {...rest} element={element} />
                            ) : (
                                <Route key={index} {...rest} element={element} />
                            );
                        })}
                    </Routes>
                </Layout>
           
        );
    }
}
