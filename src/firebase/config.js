import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database/';

const firebaseConfig = {
  apiKey: "AIzaSyD10oQmqMDWhmVQ4yXNZap-D7ZlaxN5MJw",
  authDomain: "order-management-7e9bd.firebaseapp.com",
  projectId: "order-management-7e9bd",
  storageBucket: "order-management-7e9bd.appspot.com",
  messagingSenderId: "994138583281",
  appId: "1:994138583281:web:3f6a4518f560b774e7f950"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseDB = getDatabase(FirebaseApp);