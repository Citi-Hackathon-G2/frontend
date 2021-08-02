import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
    Redirect,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { ShopOutlined } from '@ant-design/icons';
import { Home, Me, Register, Wallet } from './pages';
import { PATHS } from './config/routes';
import { SplashScreenContainer } from './components';
import { AuthProvider } from './authentication';
import { Login } from './pages/login';
import { Layout } from './components';
import { Base } from './base';

function App() {
    let history = useHistory();
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        setTimeout(() => setShowSplash(false), 1000);
    });

    if (showSplash) {
        return (
            <SplashScreenContainer
                children={<ShopOutlined style={{ fontSize: '20vh' }} />}
            />
        );
    }

    // const handleTabChange = (e: any, tab: PATHS) => {
    //     return history.push(tab);
    // };

    return (
        <AuthProvider>
            <Base />
        </AuthProvider>
    );
}

export default App;
