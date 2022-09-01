import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import * as firebaseui from "https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
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
auth.useDeviceLanguage();
const googleBtn = document.getElementById("google");
const facebookBtn = document.getElementById("facebook");
const createWatchMkAcc = document.getElementById("watch-mk-acc");
const signInCard = document.getElementById("sign-in-card");
googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});
facebookBtn.addEventListener("click", () => {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
});
const createMyAccBtn = document.createElement("button");
const emailInput = document.createElement("input");
const passInput = document.createElement("input");
const confirmPassInput = document.createElement("input");

emailInput.required = true;
emailInput.setAttribute("type", "email");
emailInput.setAttribute("placeholder", "Type Your E-mail");
emailInput.setAttribute("style", "display:block; margin:1rem auto; width:50%");
emailInput.classList.add("form-control");

passInput.required = true;
passInput.setAttribute("type", "password");
passInput.setAttribute("placeholder", "Type Your Password");
passInput.setAttribute("style", "display:block; margin:0 auto;width:50%");
passInput.classList.add("form-control");

confirmPassInput.required = true;
confirmPassInput.setAttribute("type", "password");
confirmPassInput.setAttribute("placeholder", "Type Your Password");
confirmPassInput.setAttribute(
  "style",
  "display:block; margin:1rem auto;width:50%"
);
confirmPassInput.classList.add("form-control");

createWatchMkAcc.addEventListener("click", () => {
  createMyAccBtn.textContent = "Create My Account";
  createMyAccBtn.classList.add("btn", "btn-sm", "btn-info");

  signInCard.append(emailInput, passInput, confirmPassInput, createMyAccBtn);
});

// let dynamicWidth = 0;
// const myProgressBar = () => {
//   if (dynamicWidth === 0) {
//     dynamicWidth = 1;
//     let width = 1;
//     let progressBarWorking = setInterval(fps, 10);

//     function fps() {
//       if (width >= 100) {
//         clearInterval(progressBarWorking);
//         // dynamicWidth = 0;
//       } else {
//         width++;
//         innerProgress.style.width = `${width}%`;
//       }
//     }
//   }
// };
const signRow = document.getElementById("sign-in-card").parentElement;

createMyAccBtn.addEventListener("click", () => {
  if (
    emailInput.value === "" ||
    passInput.value === "" ||
    confirmPassInput.value === ""
  ) {
    // emailInput.setAttribute("style", "border-color:red");
    emailInput.value === ""
      ? (emailInput.style.borderColor = "red")
      : (emailInput.style.borderColor = "green");
    passInput.value === ""
      ? (passInput.style.borderColor = "red")
      : (passInput.style.borderColor = "green");
    confirmPassInput.value === ""
      ? (confirmPassInput.style.borderColor = "red")
      : (confirmPassInput.style.borderColor = "green");

    passInput.placeholder = "This Field Is Required";
    confirmPassInput.placeholder = "This Field Is Required";
    return;
  } else if (passInput.value !== confirmPassInput.value) {
    const smallOne = document.createElement("p");
    smallOne.classList.add("text-danger");
    smallOne.textContent = "Your passwords are not matching";
    passInput.style.borderColor = "red";
    confirmPassInput.style.borderColor = "red";
    signRow.insertBefore(smallOne, confirmPassInput);
    return;
  } else if (passInput.value === confirmPassInput.value) {
    const rightPassword = confirmPassInput.value;

    console.log(rightPassword);
    createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      confirmPassInput.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  passInput.value = "";
  confirmPassInput.value = "";
  emailInput.value = "";
  let widthChange = 1;

  document.getElementById("loader").style.display = "block";

  const theInterval = setInterval(() => {
    widthChange++;
    if (widthChange === 100 || widthChange >= 100) {
      widthChange = 100;
    }

    signRow.innerHTML = `<div id="outer-progress" style="display:inline-block; width:100%; height:30px; background-color:gray; text-align:center"><div id="inner-progress" style="display:inline-block;height:100%;background-color: red; width:${widthChange}%; "></div><h2>Creating Your Account</h2></div>`;
  }, 30.333333);
  setTimeout(() => {
    clearInterval(theInterval);
    window.location.href = "./index.html";
  }, 3000);
});

// <div id="outer-progress">
//   <div id="inner-progress"></div>
// </div>;
