// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAWdhD8RhIL98SstPgSzDros7c5fTQ--Y",
    authDomain: "bigpaddi-2f1da.firebaseapp.com",
    projectId: "bigpaddi-2f1da",
    storageBucket: "bigpaddi-2f1da.appspot.com",
    messagingSenderId: "675636849240",
    appId: "1:675636849240:web:8928156091d7182d6f382d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)