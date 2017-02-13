import {AuthMethods, AuthProviders} from "angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyClJ-gUa31MT0cuVZk7lSN3fbunAjcHCn8",
    authDomain: "au-firebase-6954b.firebaseapp.com",
    databaseURL: "https://au-firebase-6954b.firebaseio.com",
    storageBucket: "au-firebase-6954b.appspot.com",
    messagingSenderId: "933050895661"
};



export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};
