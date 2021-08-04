import React from 'react';
import { ShopOutlined } from '@ant-design/icons';

import { Home, Me, Register, Wallet, Cashier } from './pages';
import scanQR from './cashier/scanQR';
import { PATHS } from './config/routes';
import { useAuth } from './authentication';
import { Login } from './pages/login';
import { AuthRoute, GuardedRoute } from './guarded-route';
import { SplashScreenContainer } from './components';

import './App.css';

export const Base: React.FC<{}> = () => {
  const { isLoading, isAuthenticated } = useAuth();

  return isLoading ? (
    <SplashScreenContainer
      children={<ShopOutlined style={{ fontSize: '20vh' }} />}
    />
  ) : (
    <>
      <GuardedRoute
        isAuthenticated={isAuthenticated}
        path={PATHS.HOME}
        component={Home}
      ></GuardedRoute>
      <GuardedRoute
        isAuthenticated={isAuthenticated}
        path={PATHS.WALLET}
        component={Wallet}
      ></GuardedRoute>
      <GuardedRoute
        isAuthenticated={isAuthenticated}
        path={PATHS.ME}
        component={Me}
      ></GuardedRoute>
      <GuardedRoute
        isAuthenticated={isAuthenticated}
        path={PATHS.CASHIER}
        component={Cashier}
      ></GuardedRoute>
      <GuardedRoute
        isAuthenticated={isAuthenticated}
        path={PATHS.SCAN}
        component={scanQR}
      ></GuardedRoute>
      <AuthRoute
        isAuthenticated={isAuthenticated}
        component={Login}
        path={PATHS.LOGIN}
      />
      <AuthRoute
        isAuthenticated={isAuthenticated}
        path={PATHS.REGISTER}
        component={Register}
      ></AuthRoute>
    </>
  );
};
