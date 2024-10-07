import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCu0-pIxGJoqEhrspUK9FxSzWn4MpzlanM",
  authDomain: "farmstatus-ef1eb.firebaseapp.com",
  projectId: "farmstatus-ef1eb",
  storageBucket: "farmstatus-ef1eb.appspot.com",
  messagingSenderId: "396895342692",
  appId: "1:396895342692:web:dd8a5841d022794f470f71",
  databaseURL: 'https://farmstatus-ef1eb-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, onValue };