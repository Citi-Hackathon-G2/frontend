// firebase must only be initialised in client, not server:
// Config file
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    // apiKey: "",
    // authDomain: "",
    // databaseURL: "",
    // projectId: "",
    // storageBucket: "",
    // messagingSenderId: "",
    // appId: "",
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export default auth;
