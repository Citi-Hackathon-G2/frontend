import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  notification,
  Typography,
  Space
} from 'antd';
import {
  CloseCircleFilled,
} from '@ant-design/icons';
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
//import * as cors from 'cors';
//const corsHandler = cors({ origin: true });
//vouchers.push({...data, id: doc.id, redeemedAt: data.redeemedAt?.toDate()}})

export const scanQR = () => {
  let history = useHistory();
  const [result, setResult] = useState<any>();

  //wait for scan
  const handleScan = async (data: any) => {
    if (data) {
      try {
        //console.log(data);
        setResult(data.toString()); ///getStringValue() or toString()
        const voucherId: string = data.toString();
        console.log(voucherId);
        await redeemVoucher({ voucherId }); //oFZc7OIVuFpWR56EsOgM
      } catch (err) {
        console.log(err);
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

  //const [loading, setLoading] = useState<boolean>(false);

  //using webV8
  /* callFirebaseRedeemFunction = () => {
    if (result !== undefined) {
      console.log(result);
      var redeemVoucher = firebase.functions().httpsCallable("redeem voucher");
        //setLoading(true);
        redeemVoucher({ voucherId: result })
            .then((res: any) => {
                console.log(res.data.output); //result of the cloud function returns redeem success??
                
            }).catch((error:any) => {
                var message = error.message;
                console.log(message);
                notification.error({message});
                //setLoading(false);
            }); 
    }
  };*/

  return (
    <div>
      
     

        <div style={{ height: '100vh', overflowY: 'scroll' }}>
        <Button
  
          style={{
            backgroundColor: 'white',
            border: '#B15983',
            position: 'absolute',
            marginLeft: '5%',
            width:'100vh'
          }}
          type="link"
          icon={ <CloseCircleFilled />}
          onClick={navToCashierHome}
        >
          Back
        </Button>
        <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' , marginTop:"5%"}}
        />
        
          

     
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
