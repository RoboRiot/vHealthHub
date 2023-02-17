// Import the functions you need from the SDKs you need
import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FirebaseCredentials = {
  apiKey: "AIzaSyAa6dH3DfDqA2wMP_l15NKzy--UHhA_j50",
  authDomain: "vhealthhub-3883e.firebaseapp.com",
  projectId: "vhealthhub-3883e",
  storageBucket: "vhealthhub-3883e.appspot.com",
  messagingSenderId: "351787563950",
  appId: "1:351787563950:web:b2e0275d21955615c4263f",
  measurementId: "G-SPGTD7TWG3"
};

// if a Firebase instance doesn't exist, create one
if (!Firebase.apps.length) {
    console.log("initialized!")
    // console.log(Firebase)
    Firebase.initializeApp(FirebaseCredentials);
    // console.log(Firebase.initializeApp(FirebaseCredentials))
    // console.log(Firebase)
}

export default Firebase;

  