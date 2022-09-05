import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,

} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import {
  getAuth,

} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
import {
  getStorage,

} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmsKYsU_0LQkC2KGFxRvzNV9dcmkWiqP0",
  authDomain: "watchsalesite-f6af0.firebaseapp.com",
  databaseURL: "https://watchsalesite-f6af0-default-rtdb.firebaseio.com",
  projectId: "watchsalesite-f6af0",
  storageBucket: "watchsalesite-f6af0.appspot.com",
  messagingSenderId: "21745374690",
  appId: "1:21745374690:web:fa3faec6184db9f08415bb",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const user = auth.currentUser;
export const collectionQuery = query(collection(db, "watches"));

