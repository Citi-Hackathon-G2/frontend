import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  notification,
  Typography,
  Divider,
  Space,
  Col,
  Row,
  List,
  Image,
} from 'antd';
import { VoucherCard } from '../components/voucher';
import React, { useState, useEffect } from 'react';
import { PATHS } from '../config/routes';
import styles from './login.module.css';
import firebase from 'firebase';

export const Results: React.FC<{}> = () => {


  
  
  const [voucherdata, setvoucherdata] = useState({
    id: "",
    title: "",
    
  });
  useEffect(() => {
    
    getdata();
  }, []);

  async function getdata() {
    const ref = firebase.firestore().collection("vouchers");
    const snapshot = await ref.get();
    
    snapshot.forEach(doc => {
      console.log(doc.id, doc.data());
      //map the whole array into each card
      console.log(doc.data());
      if (doc.exists) {
        setvoucherdata({
          id: doc.id,
          title: doc.data().description,

                  
        })
      }
      
      
    })
  }
  
  return (
    
    <div>
      
      <Card className={styles.card} title="" extra={<a href="/buy">View Details</a>} style={{ left: '5%',width: 300 }}>
      <Form>
        <h1>{voucherdata.title}</h1>
        <p>{voucherdata.id}</p>
        { console.log(voucherdata)}
        </Form>
    </Card>
    
    </div>

  
  )};

/* const array = [{ title: "hi", price: "20%", user: "hjasbjds", description: "starbucks" }]
{array !== null ? array.map((vou) => (
        
        
        )) : null}
 <List
    itemLayout="horizontal"
    data={res}
    renderItem={item => (
        <List.Item key={item.id}>
        <VoucherCard result={item}/>
      </List.Item>

title,
  description,
  price,
  expireAt,
  style,
  user,
  redeemedAt,

      
 
  //vouchers
  return (

    array.map((vou) => {
      <VoucherCard
       
        
        {...vou} />
    })
       
  
  );
*/
