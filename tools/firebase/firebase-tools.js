// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
const firebaseConfig = require("./meeba-dev-firebase-config").firebaseConfig;
// Add the Firebase products that you want to use
require("firebase/auth");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* eslint no-console: 0 */
process.env.NODE_ENV = 'development';

const CompanyModel = require("../../models/CompanyModel");
// eslint-disable-next-line no-unused-vars
const UserModel = require("../../models/UserModel");
const mongoose = require('mongoose');
const config = require('../../config');


mongoose.connect(config.dbUrl, {useNewUrlParser: true }, () => {
    console.log("Connected to DB successfully");
});

let email = "chenop@gmail.com";
const password = "123456";

const isValidEmail = (email) => !!email.match('^\\S+@\\S+$');

const createUserWithEmailAndPassword  = async () => {
    try {
        if (!isValidEmail(email))
            email += '@meeba.co.il';
        
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
        // Handle Errors here.
        console.log(error);
    }
};

const signInWithEmailAndPassword  = async () => {
    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        const idToken = await firebase.auth().currentUser.getIdToken();
        
        console.log(idToken);
    } catch (error) {
        // Handle Errors here.
        console.log(error);
    }
};

const resetPassword  = async () => {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
        // Handle Errors here.
        console.log(error);
    }
};

resetPassword();
