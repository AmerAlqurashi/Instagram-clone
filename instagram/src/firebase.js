// const firebaseConfig = {


//   export default db

import firebase from 'firebase';

const FirebaseApp = firebase.initializeApp({
      apiKey: "AIzaSyBKACMZm3Bj0gbybXIIbFBG3WtXISPFFRM",
    authDomain: "instagram-clone-1a04f.firebaseapp.com",
    projectId: "instagram-clone-1a04f",
    storageBucket: "instagram-clone-1a04f.appspot.com",
    messagingSenderId: "124207309263",
    appId: "1:124207309263:web:63b3f92e686889e20ff2ba",
    measurementId: "G-312YRG3F1K"
  }
);

const db = FirebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


 //apiKey: "AIzaSyB1poxK0zqDzI_0ikw-2er6DvTLcIqHmQU",
  // authDomain: "instagramclone-b146e.firebaseapp.com",
  // databaseURL: "https://instagramclone-b146e.firebaseio.com",
  // projectId: "instagramclone-b146e",
  // storageBucket: "instagramclone-b146e.appspot.com",
  // messagingSenderId: "583593730459",
  // appId: "1:583593730459:web:74761eadc236b2767b813e",
  // measurementId: "G-ZQJFP5CKT6"