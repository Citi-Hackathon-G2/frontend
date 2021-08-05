import React from 'react';
import { Home } from '../pages/index';

export enum PATHS {
  HOME = '/',
  WALLET = '/wallet',
  ME = '/me',
  LOGIN = '/login',
  // LOGOUT = '/logout',
  REGISTER = '/register',
  CASHIER = '/cashier',
  SCAN = '/cashier/scan',
  SHOP = '/shop/:id',
  RESULTS = '/results',
  BUY = '/voucher/:id',
}
