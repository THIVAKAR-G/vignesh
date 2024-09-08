// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyDTJkvBjb7UzAjDWwrYzJwTPrezqLIWkBY",
    authDomain: "crackers-4bc23.firebaseapp.com",
    projectId: "crackers-4bc23",
    storageBucket: "crackers-4bc23.appspot.com",
    messagingSenderId: "690504259041",
    appId: "G-Z7XN42F3HT"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { storage };
