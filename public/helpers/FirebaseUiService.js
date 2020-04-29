import React from "react";
//import {StyledFirebaseAuth} from "react-firebaseui";

let firebase = require('firebase');
// let firebaseUi = require('firebaseui');

const firebaseConfig = {
    apiKey: "AIzaSyDC-HD3iBhzu_dgGVd1Ft6yIYa72SobDpo",
    authDomain: "meeba-dev.firebaseapp.com",
    databaseURL: "https://meeba-dev.firebaseio.com",
    projectId: "meeba-dev",
    storageBucket: "meeba-dev.appspot.com",
    messagingSenderId: "66295631311",
    appId: "1:66295631311:web:7b363598748fb5b1c7d6ba",
    measurementId: "G-JR0XZQC1Z0"
};
firebase.initializeApp(firebaseConfig);

let uiConfig = {
    // signInSuccessUrl: 'localhost:5000/dashboard',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
};

// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// ui.start('#firebaseui-auth-container', uiConfig);

export const initOnAuthStateChange = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // localStorage.setItem('fbUser', user);

            firebase.auth().currentUser.getIdToken()
                .then(idToken => {
                    localStorage.setItem('idToken', idToken);
                });
        }
        else {
            // localStorage.removeItem('fbUser');
            localStorage.removeItem('idToken');
        }
    });
};

export default firebase; 

