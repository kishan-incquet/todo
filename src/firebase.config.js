import firebase from "firebase/firebase";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDErVXywsUj1kM3OaxQDRX-RQVRBGVEgGI",
    projectId: "todoapp-incquet",
    messagingSenderId: "570602094538",
    appId: "1:570602094538:web:a8ec3bdc42b4b7a70b1933",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };