import firebase from 'firebase'
require('@firebase/firestore');
const firebaseConfig = {
  apiKey: "AIzaSyDsUDgx5vcAYGVjpOoEXJnZwV0pganGRMM",
  authDomain: "willy-app1.firebaseapp.com",
  projectId: "willy-app1",
  storageBucket: "willy-app1.appspot.com",
  messagingSenderId: "248590175264",
  appId: "1:248590175264:web:34cd9153aa6a3ab7888045"
};
   
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
