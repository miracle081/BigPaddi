import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/storage';
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAAWdhD8RhIL98SstPgSzDros7c5fTQ--Y",
    authDomain: "bigpaddi-2f1da.firebaseapp.com",
    projectId: "bigpaddi-2f1da",
    storageBucket: "bigpaddi-2f1da.appspot.com",
    messagingSenderId: "675636849240",
    appId: "1:675636849240:web:8928156091d7182d6f382d"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
export const imgStorage = firebase.storage;