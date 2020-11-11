import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYU9H2sxQYgURHEfzuM8FGlHOpDuN7fKA",
  authDomain: "music-app-9deb8.firebaseapp.com",
  databaseURL: "https://music-app-9deb8.firebaseio.com",
  projectId: "music-app-9deb8",
  storageBucket: "music-app-9deb8.appspot.com",
  messagingSenderId: "497498508584",
  appId: "1:497498508584:web:70f69e581cb1ac1ad6141d",
  measurementId: "G-K4FDWKER7G",
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};
