import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { app, db } from "./item.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAmsKYsU_0LQkC2KGFxRvzNV9dcmkWiqP0",
  authDomain: "watchsalesite-f6af0.firebaseapp.com",
  databaseURL: "https://watchsalesite-f6af0-default-rtdb.firebaseio.com",
  projectId: "watchsalesite-f6af0",
  storageBucket: "watchsalesite-f6af0.appspot.com",
  messagingSenderId: "21745374690",
  appId: "1:21745374690:web:fa3faec6184db9f08415bb",
};

export const theBestFunc = () => {
  const theListing = document.querySelectorAll(".col.mt-5");

  theListing.forEach((item) => {
    item.addEventListener("click", async (e) => {
      const docRef = doc(db, "watches", item.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const theDocumentSnap = docSnap.data();
        const theDivContainer = document.createElement("div");
        const colContainer = document.createElement("div");
        colContainer.classList.add("col", "mt-5");
        theDivContainer.classList.add(
          "row",
          "row-cols-2",
          "py-5",
          "justify-content-center",
          "text-center",
          "align-items-center"
        );
        document.body.innerHTML = "";
        const someImg = document.createElement("img");
        someImg.classList.add("card-img-top");
        someImg.src = theDocumentSnap.imgUrl;

        const theName = document.createElement("h2");
        theName.innerHTML = theDocumentSnap.brand + " " + theDocumentSnap.model;

        const ageOfTheWatch = document.createElement("h5");
        ageOfTheWatch.classList.add("card-title");
        if (theDocumentSnap.prodYear === "") {
          theDocumentSnap.prodYear = "Не се знае!";
        }
        ageOfTheWatch.textContent =
          "Година на производство: " + theDocumentSnap.prodYear;

        const theDesc = document.createElement("p");
        theDesc.classList.add("card-text");
        if (theDocumentSnap.description === "") {
          theDocumentSnap.description =
            "Нема детално објаснување за часовникот!";
        }
        theDesc.textContent = theDocumentSnap.description;

        const buttonOne = document.createElement("a");
        buttonOne.classList.add("btn", "btn-danger");
        buttonOne.textContent = "Go to Home Page";
        buttonOne.href = "./index.html";

        colContainer.append(
          someImg,
          theName,
          ageOfTheWatch,
          theDesc,
          buttonOne
        );
        theDivContainer.append(colContainer);

        document.body.setAttribute("style", "overflow-x:hidden");
        document.body.appendChild(theDivContainer);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  });
};

theBestFunc();
