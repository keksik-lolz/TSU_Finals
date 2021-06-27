import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const app = firebase.initializeApp({
    apiKey: "AIzaSyAAzw1A62ogvDKyW4TKVl13kEjqKtbA9Jw",
    authDomain: "note-app-ca595.firebaseapp.com",
    projectId: "note-app-ca595",
    storageBucket: "note-app-ca595.appspot.com",
    messagingSenderId: "1063375863878",
    appId: "1:1063375863878:web:6e2eb1fbfda709ecc50a47"
})

export default app;