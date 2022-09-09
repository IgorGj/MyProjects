import { app, auth, database } from "./baseSetup.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
// const auth = getAuth();
auth.useDeviceLanguage();
const googleBtn = document.getElementById("google");
const facebookBtn = document.getElementById("facebook");
const createWatchMkAcc = document.getElementById("watch-mk-acc");
const signInCard = document.getElementById("sign-in-card");

let onlyOnceGoogle = true;
let onlyOnceFacebook = true;

let widthChange = 1;
const theInterval = () => {
  widthChange++;
  if (widthChange === 100 || widthChange >= 100) {
    widthChange = 100;
  }

  signRow.innerHTML = `<div id="outer-progress" style="display:inline-block; width:100%; height:30px; background-color:gray; text-align:center"><div id="inner-progress" style="display:inline-block;height:100%;background-color: red; width:${widthChange}%; "></div><h2>Creating Your Account</h2></div>`;
};

googleBtn.addEventListener("click", () => {
  if (formDiv) {
    formDiv.style.display = "none";
  }
  const fbFormWrapper = document.getElementById("fb-name-contact-wrapper");
  if (fbFormWrapper) {
    fbFormWrapper.style.display = "none";
  }
  const h5 = document.querySelector("#hfive-for-acc");
  h5.style.display = "none";
  const watchSaleSiteAccBtn = document.querySelector("#watch-mk-acc");
  watchSaleSiteAccBtn.style.display = "none";

  const nameAndContactWrapper = document.createElement("div");
  nameAndContactWrapper.setAttribute("id", "name-contact-wrapper");
  const fullNameInput = document.createElement("input");
  const contactInfoInput = document.createElement("input");
  const signupWithGoogle = document.createElement("button");
  fullNameInput.setAttribute("placeholder", "Enter Your Full Name");
  fullNameInput.setAttribute("type", "text");
  fullNameInput.setAttribute(
    "style",
    "display:block; margin:1rem auto; width:50%"
  );
  fullNameInput.classList.add("from-control");

  contactInfoInput.setAttribute("placeholder", "Enter Your Contact Number");
  contactInfoInput.setAttribute("type", "number");

  contactInfoInput.setAttribute(
    "style",
    "display:block; margin:1rem auto; width:50%"
  );
  contactInfoInput.classList.add("from-control");

  signupWithGoogle.textContent = "Sign Up With Google";
  signupWithGoogle.classList.add("btn", "btn-info");

  if (onlyOnceGoogle) {
    nameAndContactWrapper.append(
      fullNameInput,
      contactInfoInput,
      signupWithGoogle
    );
    signInCard.append(nameAndContactWrapper);
  }
  onlyOnceGoogle = false;

  signupWithGoogle.addEventListener("click", (e) => {
    if (contactInfoInput.value === "" || fullNameInput.value === "") {
      const required = document.createElement("small");
      required.style.color = "red";
      required.innerHTML =
        "Enter Your Full Name And Contact Info <br> So Peope Know Who Posted The Watch";

      fullNameInput.style.borderColor = "red";
      contactInfoInput.style.borderColor = "red";
      signInCard.insertBefore(required, contactInfoInput);
      return;
    } else if (contactInfoInput.value !== "" && fullNameInput.value !== "") {
      document.getElementById("loader").style.display = "block";

      setInterval(theInterval, 30.333333);
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          // The signed-in user info.
          const user = result.user;
          clearInterval(theInterval);
          document.getElementById("loader").style.display = "none";

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
          console.log(user.email);
          let user_info = {
            id: user.uid,
            email: user.email,
            fullName: fullNameInput.value,
            contactNum: contactInfoInput.value,
          };
          set(ref(database, "users/" + user_info.id), {
            fullName: user_info.fullName,
            email: user_info.email,
            id: user_info.id,
            contactNum: user_info.contactNum,
          });
          console.log(auth.currentUser);
          // window.location.href = "./index.html";
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          //     // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          //     // // The email of the user's account used.
          const email = auth.currentUser.email;
          //     // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          //     // ...
        });
    }
    console.log(contactInfoInput.value);
  });

  // theLoadingScreen();
  // signInWithPopup(auth, googleProvider)
  //   .then((result) => {
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     console.log(user);
  //     // clearInterval(theInterval);
  //     // window.location.href = "./index.html";
  //     // ...
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     // const errorCode = error.code;
  //     // const errorMessage = error.message;
  //     // // The email of the user's account used.
  //     // const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
});
facebookBtn.addEventListener("click", () => {
  // theLoadingScreen();
  const nameContactWrapper = document.getElementById("name-contact-wrapper");
  if (nameContactWrapper) {
    nameContactWrapper.style.display = "none";
  }

  const fbNameContactWrapper = document.createElement("div");
  fbNameContactWrapper.setAttribute("id", "fb-name-contact-wrapper");
  const fullNameInput = document.createElement("input");
  const contactInfoInput = document.createElement("input");
  const signUpWithFaceBookBtn = document.createElement("button");

  fullNameInput.setAttribute("placeholder", "Enter Your Full Name");
  fullNameInput.setAttribute("type", "text");
  fullNameInput.setAttribute(
    "style",
    "display:block; margin:1rem auto; width:50%"
  );
  fullNameInput.classList.add("from-control");

  contactInfoInput.setAttribute("placeholder", "Enter Your Contact Number");
  contactInfoInput.setAttribute("type", "number");

  contactInfoInput.setAttribute(
    "style",
    "display:block; margin:1rem auto; width:50%"
  );
  contactInfoInput.classList.add("from-control");

  signUpWithFaceBookBtn.textContent = "Sign Up With Facebook";
  signUpWithFaceBookBtn.classList.add("btn", "btn-info");

  const h5 = document.querySelector("#hfive-for-acc");
  h5.style.display = "none";
  const watchSaleSiteAccBtn = document.querySelector("#watch-mk-acc");
  watchSaleSiteAccBtn.style.display = "none";
  if (onlyOnceFacebook) {
    fbNameContactWrapper.append(
      fullNameInput,
      contactInfoInput,
      signUpWithFaceBookBtn
    );
    signInCard.append(fbNameContactWrapper);
  }
  onlyOnceFacebook = false;
  signUpWithFaceBookBtn.addEventListener("click", (e) => {
    document.getElementById("loader").style.display = "block";
    setInterval(theInterval, 30.333333);
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        clearInterval(theInterval);
        document.getElementById("loader").style.display = "none";
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        let user_info = {
          id: userUid,
          email: emailInput.value,
          fullName: fullNameInput.value,
          contactNum: contactInfoInput.value,
        };
        set(ref(database, "users/" + user_info.id), {
          fullName: user_info.fullName,
          email: user_info.email,
          id: userUid,
          contactNum: user_info.contactInfoInput,
        });
        // ...

        window.location.href = "./index.html";
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

  // signInWithPopup(auth, facebookProvider)
  //   .then((result) => {
  //     // The signed-in user info.
  //     const user = result.user;

  //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //     const credential = FacebookAuthProvider.credentialFromResult(result);
  //     const accessToken = credential.accessToken;
  //     let user_info = {
  //       id: userUid,
  //       email: emailInput.value,
  //       fullName: fullNameInput.value,
  //       contactNum: numberInput.value,
  //     };

  //     set(ref(database, "users/" + user_info.id), {
  //       fullName: user_info.fullName,
  //       email: user_info.email,
  //       id: userUid,
  //       contactNum: user_info.contactNum,
  //     });

  //     // ...
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = FacebookAuthProvider.credentialFromError(error);

  //     // ...
  //   });
});
const createMyAccBtn = document.createElement("button");
const formDiv = document.createElement("div");
const emailInput = document.createElement("input");
const passInput = document.createElement("input");
const confirmPassInput = document.createElement("input");
const fullNameInput = document.createElement("input");
const numberInput = document.createElement("input");
const passwordRequirements = document.createElement("small");
const passwordsNotMatching = document.createElement("small");
const validatingEmail = document.createElement("small");

formDiv.setAttribute("id", "div-for-form");

emailInput.required = true;
emailInput.setAttribute("type", "email");
emailInput.setAttribute("placeholder", "Type Your E-mail");
emailInput.setAttribute("style", "display:block; margin:1rem auto; width:50%");
emailInput.classList.add("form-control");

fullNameInput.required = true;
fullNameInput.setAttribute("type", "email");
fullNameInput.setAttribute("placeholder", "Type Your Full Name");
fullNameInput.setAttribute(
  "style",
  "display:block; margin:1rem auto; width:50%"
);
fullNameInput.classList.add("form-control");

numberInput.required = true;
numberInput.setAttribute("type", "email");
numberInput.setAttribute("placeholder", "Type Your Contact Num");
numberInput.setAttribute("style", "display:block; margin:1rem auto; width:50%");
numberInput.classList.add("form-control");

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

  formDiv.append(
    fullNameInput,
    numberInput,
    emailInput,
    validatingEmail,
    passInput,
    passwordRequirements,
    confirmPassInput,
    passwordsNotMatching,
    createMyAccBtn
  );
  signInCard.append(formDiv);
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
        // window.location.href = "./index.html";
        const user = userCredential.user;
        console.log(user.uid);
        const userUid = user.uid; // The UID of the user.
        const email = user.email; // The email of the user.
        const displayName = user.displayName; // The display name of the user.

        let user_info = {
          id: userUid,
          email: emailInput.value,
          fullName: fullNameInput.value,
          contactNum: numberInput.value,
        };

        set(ref(database, "users/" + user_info.id), {
          fullName: user_info.fullName,
          email: user_info.email,
          id: userUid,
          contactNum: user_info.contactNum,
        });
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
