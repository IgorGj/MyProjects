import { app,  auth } from "./baseSetup.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
// const auth = getAuth();
auth.useDeviceLanguage();
const googleBtn = document.getElementById("google");
const facebookBtn = document.getElementById("facebook");
const createWatchMkAcc = document.getElementById("watch-mk-acc");
const signInCard = document.getElementById("sign-in-card");
const theLoadingScreen = () => {
  document.getElementById("loader").style.display = "block";
  let widthChange = 1;
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
};
googleBtn.addEventListener("click", () => {
  theLoadingScreen();
  signInWithPopup(auth, googleProvider)
    .then((result) => {

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
  theLoadingScreen();

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
const passwordRequirements = document.createElement("small");
const passwordsNotMatching = document.createElement("small");
const validatingEmail = document.createElement("small");


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

validatingEmail.textContent = "The email you entered is incorrect!";
validatingEmail.setAttribute(
  "style",
  "color:red; display:none; margin-bottom:1rem;"
);
passwordRequirements.textContent =
  "The Password Must Be Atleast 8 Characters Long";
passwordRequirements.setAttribute("style", "display:none");

passwordsNotMatching.textContent = "Your Passwords Are not Matching!";
passwordsNotMatching.setAttribute("style", " display:none");


createWatchMkAcc.addEventListener("click", () => {
  createMyAccBtn.textContent = "Create My Account";
  createMyAccBtn.classList.add("btn", "btn-sm", "btn-info");

  signInCard.append(
    emailInput,
    validatingEmail,
    passInput,
    passwordRequirements,
    confirmPassInput,
    passwordsNotMatching,
    createMyAccBtn
  );
});

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

emailInput.addEventListener("keyup", () => {
  if (!validateEmail(emailInput.value)) {
    console.log("incorrect email");
    validatingEmail.style.display = "block";
    emailInput.style.borderColor = "red";
    emailInput.style.marginBottom = "0";
  } else {
    emailInput.style.borderColor = "green";
    validatingEmail.style.display = "none";
    emailInput.style.marginBottom = "1rem";
  }
});

const returningPassValue = () => {
  return passInput.value;
};
passInput.addEventListener("focus", () => {
  returningPassValue();
  passwordRequirements.setAttribute("style", "display:block");
});

passInput.addEventListener("keyup", () => {
  console.log(passInput.value.length);
  if (passInput.value.length <= 8) {
    passwordRequirements.setAttribute("style", "color:red");
  } else {
    passwordRequirements.setAttribute("style", "color:green");
    passInput.style.borderColor = "green";
  }
});
passInput.addEventListener("blur", () => {
  if (passInput.value.length > 8) {
    passwordRequirements.setAttribute("style", "display:none");
  }
});

confirmPassInput.addEventListener("blur", () => {
  const passwordValue = returningPassValue();
  if (confirmPassInput.value !== passwordValue) {
    passwordsNotMatching.setAttribute(
      "style",
      "color:red;display:block; margin-bottom: 1rem;"
    );
    confirmPassInput.style.marginBottom = "0px";
  } else {
    confirmPassInput.style.borderColor = "green";
  }
});

const signRow = document.getElementById("sign-in-card").parentElement;

createMyAccBtn.addEventListener("click", () => {
  if (
    emailInput.value === "" ||
    passInput.value === "" ||
    confirmPassInput.value === ""
  ) {

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
    document.getElementById("loader").style.display = "block";
    signRow.style.display = "none";
    createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      confirmPassInput.value
    )
      .then((userCredential) => {
        // Signed in

        const signRow = document.getElementById("sign-in-card").parentElement;
        // Signed in
        document.getElementById("loader").style.display = "none";
        window.location.href = "./index.html";
        const user = userCredential.user;
        console.log(user.uid);
        const userUid = user.uid; // The UID of the user.
        const email = user.email; // The email of the user.
        const displayName = user.displayName; // The display name of the user.
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  // passInput.value = "";
  // confirmPassInput.value = "";
  // emailInput.value = "";

});
