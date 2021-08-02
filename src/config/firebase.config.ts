// firebase must only be initialised in client, not server:
// Config file
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyAqIXc5CWcV854MlhnuNrkGeU9LpCdXsyY',
    authDomain: 'quearh-69.firebaseapp.com',
    projectId: 'quearh-69',
    storageBucket: 'quearh-69.appspot.com',
    messagingSenderId: '780774623497',
    appId: '1:780774623497:web:5d721292802eba0f74ebd8',
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export default auth;
