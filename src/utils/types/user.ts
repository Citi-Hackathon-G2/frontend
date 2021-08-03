import firebase from 'firebase';
import { Shop, Voucher } from './firestore';
export type User = {
  username: string; // unique key
  email: string;
  vouchers: firebase.firestore.DocumentReference[]; // vouchers which user has bought
  shops: firebase.firestore.DocumentReference[]; // shops which user controls
};

export type UserModel = {
  username: string; // unique key
  email: string;
  vouchers: Voucher[];
  shops: Shop[];
};
