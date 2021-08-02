import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Menu, Layout, Row, Col, Button } from 'antd';
import { HomeOutlined, ShopOutlined, SmileOutlined } from '@ant-design/icons';
import { Home, Me, Wallet } from './pages';
import { PATHS } from './config/routes';
import { SplashScreenContainer } from './components';

function App() {
    const [currentPage, setCurrentPage] = useState<PATHS>(PATHS.HOME);
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

    const handleTabChange = (e: any, tab: PATHS) => {
        return history.push(tab);
    };

    return (
        <div className="App">
            <div className="container">
                <Route exact path={PATHS.HOME}>
                    <Home />
                </Route>
                <Route exact path={PATHS.WALLET}>
                    <Wallet />
                </Route>
                <Route exact path={PATHS.ME}>
                    <Me />
                </Route>
            </div>
            <div className="bottom-menu">
                <div className="nav-item">
                    <HomeOutlined
                        onClick={(e) => handleTabChange(e, PATHS.HOME)}
                    />
                </div>
                <div className="nav-item">
                    <HomeOutlined
                        onClick={(e) => handleTabChange(e, PATHS.WALLET)}
                    />
                </div>
                <div className="nav-item">
                    <SmileOutlined
                        onClick={(e) => handleTabChange(e, PATHS.ME)}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
