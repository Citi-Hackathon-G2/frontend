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
import scanQR from './cashier/scanQR';
import { PATHS } from './config/routes';
import { SplashScreenContainer } from './components';
import { AuthProvider, useAuth } from './authentication';
import { Login } from './pages/login';
import { Layout } from './components/layout';
import { AuthRoute, GuardedRoute } from './guarded-route';

export const Base: React.FC<{}> = () => {
  const { isAuthenticated, isLoading } = useAuth();
  //   console.log(isAuthenticated);
  return (
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
