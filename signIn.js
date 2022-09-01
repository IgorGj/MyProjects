import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import * as firebaseui from "https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyAmsKYsU_0LQkC2KGFxRvzNV9dcmkWiqP0",
  authDomain: "watchsalesite-f6af0.firebaseapp.com",
  databaseURL: "https://watchsalesite-f6af0-default-rtdb.firebaseio.com",
  projectId: "watchsalesite-f6af0",
  storageBucket: "watchsalesite-f6af0.appspot.com",
  messagingSenderId: "21745374690",
  appId: "1:21745374690:web:fa3faec6184db9f08415bb",
};
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth();

const loginBtn = document.getElementById("login-btn");
const loginEmail = document.querySelector("#login-email");
const loginPass = document.querySelector("#login-pass");
loginBtn.addEventListener("click", () => {
  let email = loginEmail.value;
  let password = loginPass.value;
  // auth
  //   .signInWithEmailAndPassword(email, password)
  //   .then(function () {
  //     // Declare user variable
  //     var user = auth.currentUser;

  //     // Add this user to Firebase Database
  //     var database_ref = database.ref();

  //     // Create User data
  //     var user_data = {
  //       last_login: Date.now(),
  //     };

  //     // Push to Firebase Database
  //     database_ref.child("users/" + user.uid).update(user_data);

  //     // DOne
  //     alert("User Logged In!!");
  //   })
  //   .catch(function (error) {
  //     // Firebase will use this to alert of its errors
  //     var error_code = error.code;
  //     var error_message = error.message;

  //     alert(error_message);
  //   });
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const signRow = document.getElementById("sign-in-card").parentElement;
      // Signed in
      const user = userCredential.user;
      let widthChange = 1;
      console.log(userCredential.user.email);
      const theInterval = setInterval(() => {
        widthChange++;
        if (widthChange === 100 || widthChange >= 100) {
          widthChange = 100;
        }
        document.getElementById("loader").style.display = "block";
        signRow.innerHTML = `<div id="outer-progress" style="display:inline-block; width:100%; height:30px; background-color:gray; text-align:center"><div id="inner-progress" style="display:inline-block;height:100%;background-color: red; width:${widthChange}%; "></div><h2>Logging into your account</h2></div>`;
      }, 30.333333);
      setTimeout(() => {
        clearInterval(theInterval);
        window.location.href = "./index.html";
      }, 3000);
      // window.location.href = "./index.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
    console.log("Nema user");
  }
});
