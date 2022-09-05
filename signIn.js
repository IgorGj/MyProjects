import { app, auth } from "./baseSetup.js";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
// const auth = getAuth(app);

const googleBtn = document.getElementById("google");
const facebookBtn = document.getElementById("facebook");
const loginBtn = document.getElementById("login-btn");
const loginEmail = document.querySelector("#login-email");
const loginPass = document.querySelector("#login-pass");

const theLoadingScreen = () => {
  const signRow = document.getElementById("sign-in-card").parentElement;

  let widthChange = 1;
  const theInterval = setInterval(() => {
    widthChange++;
    if (widthChange === 100 || widthChange >= 100) {
      widthChange = 100;
    }

    signRow.innerHTML = `<div id="outer-progress" style="display:inline-block; width:100%; height:30px; background-color:gray; text-align:center"><div id="inner-progress" style="display:inline-block;height:100%;background-color: red; width:${widthChange}%; "></div><h2>Logging into your account</h2></div>`;
  }, 30.333333);

  // clearInterval(theInterval);
  // window.location.href = "./index.html";
};

googleBtn.addEventListener("click", () => {
  theLoadingScreen();
  document.getElementById("loader").style.display = "block";
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      document.getElementById("loader").style.display = "none";
      window.location.href = "./index.html";
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
  theLoadingScreen();
  document.getElementById("loader").style.display = "block";

  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      document.getElementById("loader").style.display = "none";
      window.location.href = "./index.html";
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
loginBtn.addEventListener("click", () => {
  let email = loginEmail.value;
  let password = loginPass.value;

  document.getElementById("loader").style.display = "block";
  signRow.style.display = "none";

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const signRow = document.getElementById("sign-in-card").parentElement;
      // Signed in
      document.getElementById("loader").style.display = "none";
      window.location.href = "./index.html";
      const user = userCredential.user;
      console.log(userCredential.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

const signUp = document.querySelector("#sign-up");
signUp.addEventListener("click", (e) => {
  if (signUp.textContent === "Sign Out") {
    e.preventDefault();
  }
});
onAuthStateChanged(auth, (user) => {
  if (user) {
    signUp.textContent = "Sign Out";
    // ...
  } else {
    signUp.textContent = "Sign Up";
  }
});

window.addEventListener("click", (e) => {
  if (e.target.textContent === "Sign Out") {
    if (confirm("Do You Want To Sign Out?") === true) {
      signOut(auth)
        .then(() => {
          console.log(auth.currentUser);
          console.log("sign-oout succ");

          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
          console.log("bad hpn");
        });
    }
  }
  return;
});
