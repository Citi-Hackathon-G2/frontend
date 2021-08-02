import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    HomeOutlined,
    ShopOutlined,
    SmileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Home, Me, Wallet } from '../pages';
import { PATHS } from '../config/routes';
import { SplashScreenContainer } from '../components';
import { AuthProvider, useAuth } from '../authentication';
import styles from './layout.module.css';
type props = {
    children: React.ReactNode;
    title?: string;
    selectedkey?: string;
};

export const Layout: React.FC<props> = ({ children, title, selectedkey }) => {
    let history = useHistory();
    const handleTabChange = (e: any, tab: PATHS) => {
        return history.push(tab);
    };

    return (
        <AuthProvider>
            <div className={styles.main}>
                <div className={styles.container}>{children}</div>
                <div className={styles.bottomMenu}>
                    <div className={styles.navItem}>
                        <HomeOutlined
                            onClick={(e) => handleTabChange(e, PATHS.HOME)}
                        />
                    </div>
                    <div className={styles.navItem}>
                        <ShopOutlined
                            onClick={(e) => handleTabChange(e, PATHS.WALLET)}
                        />
                    </div>
                    <div className={styles.navItem}>
                        <UserOutlined
                            onClick={(e) => handleTabChange(e, PATHS.ME)}
                        />
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
};
