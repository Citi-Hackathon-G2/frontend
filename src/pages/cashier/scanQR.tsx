import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  notification,
  Typography,
  Space,
  Spin,
} from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import React, { Component, useState } from 'react';
import { Route, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import QrReader from 'react-qr-reader';

import { redeemVoucher } from './utils/api';
import firebase from 'firebase';
import { firebaseFunctions } from '../../config/firebase.config';
import { db } from '../../config/firebase.config';
require('firebase/functions');
import { PATHS } from '../../config/routes';

export const scanQR = () => {
  let history = useHistory();
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  //wait for scan
  const handleScan = async (data: any) => {
    if (data) {
      try {
        setLoading(true);
        //console.log(data);
        setResult(data.toString()); ///getStringValue() or toString()
        const voucherId: string = data.toString();
        console.log(voucherId);
        await redeemVoucher({ voucherId }); //oFZc7OIVuFpWR56EsOgM
        notification.success({ message: 'Voucher Redeemed' });
        history.push(PATHS.CASHIER);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  const handleError = (err: TypeError) => {
    console.error(err);
  };

  const navToCashierHome = () => {
    //gobackhome
    history.push(PATHS.CASHIER);
  };

  return (
    <div>
      <div style={{ height: '70vh', overflowY: 'scroll' }}>
        <Button
          style={{
            backgroundColor: 'white',
            border: '#B15983',
            position: 'absolute',
            marginLeft: '5%',
            width: '100vh',
          }}
          type="link"
          icon={<CloseCircleFilled />}
          onClick={navToCashierHome}
        >
          Back
        </Button>
        <Spin spinning={loading}>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{
              width: '50%',
              marginTop: '5%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </Spin>
      </div>
    </div>
  );
};

export default scanQR;

/*

call backend redeem couchr function 
User must own a shop to redeem voucher
call ReenRequest with voucher id as string
use v8 version

success or error => show error message (when scan voucher from not in the shop)

<p style={{ position: "absolute", marginLeft: "50%" }}>
              
            </p>
*/
