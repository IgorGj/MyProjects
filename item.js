import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import {
  getFirestore,
  collection,
  query,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
// import { theBestFunc } from "./listing.js";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmsKYsU_0LQkC2KGFxRvzNV9dcmkWiqP0",
  authDomain: "watchsalesite-f6af0.firebaseapp.com",
  databaseURL: "https://watchsalesite-f6af0-default-rtdb.firebaseio.com",
  projectId: "watchsalesite-f6af0",
  storageBucket: "watchsalesite-f6af0.appspot.com",
  messagingSenderId: "21745374690",
  appId: "1:21745374690:web:fa3faec6184db9f08415bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

const imgOfWatch = document.getElementById("img-of-watch");
let files = [];
let reader = new FileReader();
imgOfWatch.onchange = (e) => {
  files = e.target.files;
  console.log([...e.target.files]);
  // let extention = GetFileExt(files[0]);
  // let theName = GetFileName(files[0]);
  reader.readAsDataURL(files[0]);
};

// function GetFileExt(file) {
//   let temp = file.name.split(".");
//   let ext = temp.slice(temp.length - 1, temp.length);
//   return "." + ext[0];
// }

// function GetFileName(file) {
//   let temp = file.name.split(".");
//   let fname = temp.slice(0, -1).join(".");
//   return fname;
// }

// Add a new document in collection "wathes"
const addingWatches = document.getElementById("add-watch");
addingWatches.addEventListener("click", saveURLtoFirestore);
let allUrls = [];

// async function uploadProcess() {
//   let imgtoUpload = files;
//   console.log([...files]);
//   [...files].forEach((el) => {
//     let imgName = new Date();
//     // set metadata so if the user doesn't chose an image he can't make a listing.
//     const metaData = {
//       contentType: el.type,
//     };
//     const storageRef = sRef(storage, "images/" + el.name);
//     const uploadTask = uploadBytesResumable(storageRef, el, metaData);
//     uploadTask.on(
//       "state-changed",
//       (snapshot) => {
//         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log(progress);
//       },
//       (error) => {
//         alert("not uploaded");
//       },
//       function downURL() {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           allUrls.push(downloadURL);
//           saveURLtoFirestore(allUrls);
//         });
//       }
//     );
//   });
//   allUrls = [];
// }

async function saveURLtoFirestore(url) {
  // let imagName = new Date().toGMTString();
  let imagName = new Date();
  // imagName = imagName.replace(/ +/g, "");
  console.log(imagName);

  const watchBrand = document.getElementById("watch-brand");
  const watchModel = document.getElementById("watch-model");
  const watchProdYear = document.getElementById("watch-age");
  const descOfWatch = document.getElementById("desc-of-watch");
  // await setDoc(doc(db, "watches", imagName), {
  //   brand: watchBrand.value,
  //   model: watchModel.value,
  //   imgUrl: [],
  //   prodYear: watchProdYear.value,
  //   description: descOfWatch.value,
  //   imageName: new Date(),
  // });
  const docRefWithId = await addDoc(collection(db, "watches"), {
    imageName: imagName,
    imgUrl: [],
    brand: watchBrand.value,
    model: watchModel.value,
    prodYear: watchProdYear.value,
    description: descOfWatch.value,
  });

  console.log("Document written with ID: ", docRefWithId.id);

  // const docRef = doc(db, "cities", "yftq9RGp4jWNSyBZ1D6L");

  // const data = {
  //   code: "613",
  // };

  // updateDoc(docRef, data)
  //   .then((docRef) => {
  //     console.log(
  //       "A New Document Field has been added to an existing document"
  //     );
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  async function uploadProcess() {
    let imgtoUpload = [...files];
    console.log([...files]);
    [...files].forEach((el) => {
      let imgName = new Date();
      // set metadata so if the user doesn't chose an image he can't make a listing.
      const metaData = {
        contentType: el.type,
      };
      const storageRef = sRef(storage, "images/" + el.name);
      const uploadTask = uploadBytesResumable(storageRef, el, metaData);
      uploadTask.on(
        "state-changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          alert("not uploaded");
        },
        async function downURL() {
          const docRef = doc(db, "watches", docRefWithId.id);

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            allUrls.push(downloadURL);
            console.log(uploadTask.snapshot.ref);
            let everyImg = {
              imgUrl: [...allUrls],
            };
            // saveURLtoFirestore(allUrls);

            updateDoc(docRef, everyImg)
              .then((docRef) => {
                console.log("a new image is added");
              })
              .catch((error) => {
                console.log("cant add images");
              });
          });
        }
      );
    });
    allUrls = [];
  }

  uploadProcess();
  watchBrand.value = "";
  watchModel.value = "";
  watchProdYear.value = "";
  descOfWatch.value = "";
  // setTimeout(() => {
  //   window.location.href = "./index.html";
  // }, 3000);
  // url = "";
}
let theContainer = document.querySelector("#important-row");

const querySnapshot = await getDocs(collection(db, "watches"));

// querySnapshot.forEach((doc) => {});

setTimeout(() => {
  const theListing = document.querySelectorAll(".col.mt-5");
  console.log(theListing);
}, 2000);

const theCollection = query(collection(db, "watches"));
const makingTheListing = onSnapshot(theCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      console.log(change.doc.data().imgUrl);
      let theUid = change.doc.id;
      theUid = theUid.replace(/ +/g, "");
      console.log(theUid);
      let theCard = document.createElement("div");
      theCard.setAttribute("style", "cursor:pointer");
      theCard.setAttribute("id", `${theUid}`);
      theCard.classList.add("col", "mb-5");
      let thecardForWatch = document.createElement("div");
      thecardForWatch.classList.add("card", "w-100", "h-100");
      let theimgOfWatch = document.createElement("img");
      theimgOfWatch.classList.add("card-img-top");

      let thedescriptionOfWatch = document.createElement("div");
      thedescriptionOfWatch.classList.add("card-body");
      let thenameOfWatch = document.createElement("h5");
      thenameOfWatch.classList.add("card-title");
      thenameOfWatch.setAttribute("id", "nameOfWatch");
      let theageOfWatch = document.createElement("h5");
      let theshortDescWatch = document.createElement("p");
      const theLink = document.createElement("a");
      theLink.classList.add("btn", "btn-danger");
      theLink.textContent = "Погледни го часовникот детално";
      theLink.href = "./theWatch.html" + "?id=" + theUid;
      theshortDescWatch.classList.add("card-text");
      theageOfWatch.classList.add("card-title", "agedWatch");
      const theCardFooter = document.createElement("div");
      theCardFooter.classList.add("card-footer");
      const uploadDate = document.createElement("small");
      const uploadTime = document.createElement("small");
      uploadDate.classList.add("text-muted");
      uploadTime.classList.add("text-muted");
      console.log(change.doc.data().imageName.toDate().toDateString());
      let theDate = change.doc.data().imageName.toDate().toDateString();
      let theTime = change.doc
        .data()
        .imageName.toDate()
        .toLocaleTimeString("en-US");

      uploadDate.textContent = theDate;
      uploadTime.textContent = theTime;
      const theBrake = document.createElement("br");
      theCardFooter.append(theLink, uploadDate, theBrake, uploadTime);
      thedescriptionOfWatch.append(
        thenameOfWatch,
        theageOfWatch,
        theshortDescWatch
      );
      thecardForWatch.append(theimgOfWatch);
      thecardForWatch.append(thedescriptionOfWatch, theCardFooter);
      theCard.append(thecardForWatch);
      theContainer.appendChild(theCard);
      const modelOfWatch =
        change.doc.data().brand + " " + change.doc.data().model;
      let ageOfWatch = change.doc.data().prodYear;
      let descWatch = change.doc.data().description;
      console.log(change.doc.data().imgUrl);

      const srcOfImg = change.doc.data().imgUrl;
      theimgOfWatch.src = srcOfImg;
      thenameOfWatch.innerHTML = modelOfWatch;
      if (ageOfWatch === "") {
        ageOfWatch = "Не се знае!";
      }
      theageOfWatch.innerHTML = "Година на производство: " + ageOfWatch;
      if (descWatch === "") {
        descWatch = "Нема детално објаснување за часовникот!";
      }
      theshortDescWatch.textContent = descWatch;

      // theBestFunc();
    }
    if (change.type === "modified") {
      const theUid = change.doc.id;

      const theCard = document.getElementById(`${theUid}`);
      const img = theCard.querySelector(".card-img-top");
      img.src = change.doc.data().imgUrl;
      console.log("Modified city: ", change.doc.id);
    }
    if (change.type === "removed") {
      console.log("Removed city: ", change.doc.data());
    }
  });
});

const auth = getAuth();
const signUp = document.querySelector("#sign-up");
// const user = auth.currentUser;

// setTimeout(() => {
//   if (auth.currentUser !== null) {
//     console.log(auth.currentUser);
//     signUp.textContent = "Sign Out";
//   }
// }, 3000);
// auth.onAuthStateChanged((user) => {

//   console.log(user);

// });

signUp.addEventListener("click", (e) => {
  e.preventDefault();
  if (auth.currentUser) {
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
  } else {
    console.log("njama user");
    window.location.href = "./signup.html";
  }

  // auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     signUp.textContent = "Sign Out";
  //     signOut(auth)
  //       .then(() => {
  //         console.log("sign-oout succ");
  //         console.log(user);

  //         // Sign-out successful.
  //       })
  //       .catch((error) => {
  //         // An error happened.
  //         console.log("bad hpn");
  //       });
  //   } else {
  //     console.log("njama juseru");
  //   }
  //   return;

  // });

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     // signUp.textContent = "Sign out";
  //     signOut(auth)
  //       .then(() => {
  //         console.log("sign-oout succ");
  //         console.log(user);

  //         // Sign-out successful.
  //       })
  //       .catch((error) => {
  //         // An error happened.
  //       });
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //     signUp.textContent = "Sign In";
  //     window.location.href = "./signup.html";
  //   }
  // });

  // if (user !== null) {
  //   console.log(user);

  //   signUp.textContent = "Sign Out";

  //   if (confirm("Do you want to SIGN-OUT?") === true) {
  //     signOut(auth)
  //       .then(() => {
  //         // Sign-out successful.
  //         console.log("sign out successfull");
  //         signUp.textContent = "Sign In";
  //       })
  //       .catch((error) => {
  //         // An error happened.
  //       });
  //   } else {
  //     return;
  //   }
  // } else if (user === null) {
  //   // window.location.href = "./signup.html";
  //   console.log(user);
  // }
});

onAuthStateChanged(auth, (user) => {
  const userAddingWatch = document.querySelector("#user-add-watch");
  if (user) {
    userAddingWatch.style.display = "block";
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    signUp.textContent = "Sign Out";
    // ...
  } else {
    userAddingWatch.style.display = "none";
    signUp.textContent = "Sign Up";
  }
});
