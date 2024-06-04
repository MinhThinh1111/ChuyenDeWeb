import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCn7R5Qo3vqvFK9AB0Cvcn7e7wL64zoUZw",
    authDomain: "pushnotification-1cf60.firebaseapp.com",
    databaseURL: "https://pushnotification-1cf60-default-rtdb.firebaseio.com",
    projectId: "pushnotification-1cf60",
    storageBucket: "pushnotification-1cf60.appspot.com",
    messagingSenderId: "533405558317",
    appId: "1:533405558317:web:fb799eb3b1dbc12f14faa4",
    measurementId: "G-9PPLTG0B8W"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
