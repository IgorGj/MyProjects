import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
  addDoc,
  getDocs,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import {
  getFirestore,
  collection,
  query,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import { theBestFunc } from "./listing.js";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";

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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const imgOfWatch = document.getElementById("img-of-watch");

let files = [];
let reader = new FileReader();

imgOfWatch.onchange = (e) => {
  files = e.target.files;

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
addingWatches.addEventListener("click", uploadProcess);

async function uploadProcess() {
  let imgtoUpload = files[0];
  let imgName = new Date();
  // set metadata so if the user doesn't chose an image he can't make a listing.
  const metaData = {
    contentType: imgtoUpload.type,
  };

  const storage = getStorage();
  const storageRef = sRef(storage, "images/" + imgName);
  const uploadTask = uploadBytesResumable(storageRef, imgtoUpload, metaData);
  uploadTask.on(
    "state-changed",
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    },
    (error) => {
      alert("not uploaded");
    },
    function downURL() {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        saveURLtoFirestore(downloadURL);
      });
    }
  );
}

async function saveURLtoFirestore(url) {
  let imgName = new Date();
  const watchBrand = document.getElementById("watch-brand");
  const watchModel = document.getElementById("watch-model");
  const watchProdYear = document.getElementById("watch-age");
  const descOfWatch = document.getElementById("desc-of-watch");

  await addDoc(collection(db, "watches"), {
    imageName: imgName,
    imgUrl: url,
    brand: watchBrand.value,
    model: watchModel.value,
    prodYear: watchProdYear.value,
    description: descOfWatch.value,
  });
  watchBrand.value = "";
  watchModel.value = "";
  watchProdYear.value = "";
  descOfWatch.value = "";
  // url = "";
}

// const querySnapshot = await getDocs(collection(db, "watches"));
let theContainer = document.querySelector("#important-row");

const theCollection = query(collection(db, "watches"));
const makingTheListing = onSnapshot(theCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const theUid = change.doc.id;

      let theCard = document.createElement("div");
      theCard.setAttribute("style", "cursor:pointer");
      theCard.setAttribute("id", `${theUid}`);
      theCard.classList.add("col", "mt-5");
      let thecardForWatch = document.createElement("div");
      thecardForWatch.classList.add("card", "w-100");
      let theimgOfWatch = document.createElement("img");
      theimgOfWatch.classList.add("card-img-top");
      let thedescriptionOfWatch = document.createElement("div");
      thedescriptionOfWatch.classList.add("card-body");
      let thenameOfWatch = document.createElement("h5");
      thenameOfWatch.classList.add("card-title");
      thenameOfWatch.setAttribute("id", "nameOfWatch");
      let theageOfWatch = document.createElement("h5");
      let theshortDescWatch = document.createElement("p");
      theshortDescWatch.classList.add("card-text");
      theageOfWatch.classList.add("card-title", "agedWatch");
      thedescriptionOfWatch.append(
        thenameOfWatch,
        theageOfWatch,
        theshortDescWatch
      );
      thecardForWatch.appendChild(theimgOfWatch);
      thecardForWatch.appendChild(thedescriptionOfWatch);
      theCard.appendChild(thecardForWatch);
      theContainer.appendChild(theCard);
      const modelOfWatch =
        change.doc.data().brand + " " + change.doc.data().model;
      let ageOfWatch = change.doc.data().prodYear;
      const descWatch = change.doc.data().description;
      const srcOfImg = change.doc.data().imgUrl;
      theshortDescWatch.textContent = descWatch;
      theimgOfWatch.src = srcOfImg;
      thenameOfWatch.innerHTML = modelOfWatch;
      if (ageOfWatch === "") {
        ageOfWatch = "Не се знае!";
      }
      theageOfWatch.innerHTML = "Година на производство: " + ageOfWatch;
      theBestFunc();
    }
    if (change.type === "modified") {
      console.log("Modified city: ", change.doc.data());
    }
    if (change.type === "removed") {
      console.log("Removed city: ", change.doc.data());
    }
  });
});
