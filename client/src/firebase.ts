import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtVOktyCpCr9BlYKoYRS7LJQlWk7xbnX4",
  authDomain: "recipie-img.firebaseapp.com",
  projectId: "recipie-img",
  storageBucket: "recipie-img.appspot.com",
  messagingSenderId: "112358977899",
  appId: "1:112358977899:web:7241bdb030da364abc9c2e",
  measurementId: "G-FX8NTC2P7X",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
