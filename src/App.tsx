import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Menu, Layout, Row, Col, Button } from 'antd';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    SearchOutlined,
    UserOutlined,
    WalletOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import { Home, Me, Shop } from './pages';
import { Footer } from 'antd/lib/layout/layout';
import { PATHS } from './config/routes';

enum TAB {
    HOME = '',
    SHOP = 'shop',
    ME = 'me',
}

function App() {
    const [currentPage, setCurrentPage] = useState<TAB>(TAB.HOME);
    let history = useHistory();

    const handleTabChange = (e: any, tab: TAB) => {
        history.push(tab);
    };

    return (
        <div className="App">
            <div className="container">
                <Route exact path={PATHS.HOME}>
                    <Home />
                </Route>
                <Route exact path={PATHS.SHOP}>
                    <Shop />
                </Route>
                <Route exact path={PATHS.ME}>
                    <Me />
                </Route>
            </div>
            <div className="bottom-menu">
                <div className="nav-item">
                    <HomeOutlined
                        onClick={(e) => handleTabChange(e, TAB.HOME)}
                    />
                </div>
                <div className="nav-item">
                    <HomeOutlined
                        onClick={(e) => handleTabChange(e, TAB.SHOP)}
                    />
                </div>
                <div className="nav-item">
                    <HomeOutlined onClick={(e) => handleTabChange(e, TAB.ME)} />
                </div>
            </div>
        </div>
    );
}

export default App;
