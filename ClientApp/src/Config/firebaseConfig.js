// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQZqhgzG_P84SIkZBpb4U-hVSQH6fgquw",
    authDomain: "appartyannis-54312.firebaseapp.com",
    projectId: "appartyannis-54312",
    storageBucket: "appartyannis-54312.appspot.com",
    messagingSenderId: "497311640677",
    appId: "1:497311640677:web:cb808bcd3b1b449ae7aa8c"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };