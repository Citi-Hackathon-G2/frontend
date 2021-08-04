// firebase must only be initialised in client, not server:
// Config file
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
const config = {
  apiKey: 'AIzaSyAqIXc5CWcV854MlhnuNrkGeU9LpCdXsyY',
  authDomain: 'quearh-69.firebaseapp.com',
  projectId: 'quearh-69',
  storageBucket: 'quearh-69.appspot.com',
  messagingSenderId: '780774623497',
  appId: '1:780774623497:web:5d721292802eba0f74ebd8',
};

const firebaseApp = firebase.initializeApp(config);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const firebaseFunctions = firebaseApp.functions('asia-southeast2');

if (location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099');
  db.useEmulator('localhost', 5002);
  firebaseFunctions.useEmulator('localhost', 5001);
}
export { auth, db, firebaseFunctions };
