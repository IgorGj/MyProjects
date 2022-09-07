import { auth, collectionQuery } from "./baseSetup.js";
import {
  onSnapshot,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

// const db = getFirestore(app);

let theContainer = document.querySelector("#important-row");

// const querySnapshot = await getDocs(collection(db, "watches"));
// const collectionQuery = query(collection(db, "watches"));

const querySnapshot = await getDocs(collectionQuery);
if (querySnapshot.empty) {
  const modalDialog = document.createElement("div");
  const modalContent = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalBody = document.createElement("div");
  const modalTitle = document.createElement("h5");
  const modalBodyParagraph = document.createElement("p");

  modalDialog.classList.add("modal-dialog");
  modalContent.classList.add("modal-content");
  modalHeader.classList.add("modal-header");
  modalBody.classList.add("modal-body");
  modalTitle.classList.add("modal-title");

  modalTitle.textContent = "Watch Sale Mk";
  modalBodyParagraph.textContent = "There Are No Watches For Sale";
  modalBody.append(modalBodyParagraph);
  modalHeader.append(modalTitle);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  document.body.append(modalDialog);
}

// const auth = getAuth();
const signUp = document.querySelector("#sign-up");

// const theCollection = query(collection(db, "watches"));

const makingTheListing = onSnapshot(collectionQuery, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const user = auth.currentUser;

    if (change.type === "added") {
      // const auth = getAuth();
      const signUp = document.querySelector("#sign-up");
      const user = auth.currentUser;
      let theUid = change.doc.id;
      theUid = theUid.replace(/ +/g, "");
      let theCard = document.createElement("div");
      theCard.setAttribute("id", `${theUid}`);
      theCard.classList.add("col", "mb-5");
      let thecardForWatch = document.createElement("div");
      thecardForWatch.classList.add("card", "w-100", "h-100");
      let theimgOfWatch = document.createElement("img");
      theimgOfWatch.classList.add("card-img-top");
      let theLoader = document.createElement("div");
      theLoader.setAttribute("id", "loader");
      const loaderParent = document.createElement("div");

      let thePrizeOfWatch = document.createElement("i");
      thePrizeOfWatch.style.color = "red";
      thePrizeOfWatch.style.fontSize = "1.5rem";

      thePrizeOfWatch.textContent = `${change.doc.data().prize} ден.`;
      if (change.doc.data().prize === "") {
        thePrizeOfWatch.textContent = `По договор.`;
      }
      loaderParent.setAttribute(
        "style",
        "position:absolute;top:50%; left:50%; transform: translate(-50%,-50%);"
      );
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
      let theDate = change.doc.data().imageName.toDate().toDateString();
      let theTime = change.doc
        .data()
        .imageName.toDate()
        .toLocaleTimeString("en-US");

      uploadDate.textContent = theDate;
      uploadTime.textContent = theTime;
      const theBrake = document.createElement("br");
      theCardFooter.append(
        thePrizeOfWatch,
        theLink,
        uploadDate,
        theBrake,
        uploadTime
      );
      thedescriptionOfWatch.append(
        thenameOfWatch,
        theageOfWatch,
        theshortDescWatch
      );
      theLoader.style.display = "block";

      loaderParent.append(theLoader);

      thecardForWatch.append(loaderParent, theimgOfWatch);
      thecardForWatch.append(thedescriptionOfWatch, theCardFooter);
      theCard.append(thecardForWatch);
      theContainer.appendChild(theCard);
      const modelOfWatch =
        change.doc.data().brand + " " + change.doc.data().model;
      let ageOfWatch = change.doc.data().prodYear;
      let descWatch = change.doc.data().description;

      const srcOfImg = change.doc.data().imgUrl;
      theimgOfWatch.addEventListener("load", () => {
        theLoader.style.display = "none";
      });
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

      if (user !== null) {
        user.providerData.forEach((profile) => {});
      }
    }
    if (change.type === "modified") {
      const theUid = change.doc.id;
      const theCard = document.getElementById(`${theUid}`);
      const img = theCard.querySelector(".card-img-top");

      img.src = change.doc.data().imgUrl;
    }
    if (change.type === "removed") {
    }
  });
});

signUp.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.currentTarget.textContent === "Sign Up") {
    window.location.href = "./signup.html";
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    signUp.textContent = "Sign Out";
  } else {
    signUp.textContent = "Sign Up";
  }
});

window.addEventListener("click", (e) => {
  if (e.target.textContent === "Sign Out") {
    if (confirm("Do You Want To Sign Out?") === true) {
      signOut(auth)
        .then(() => {})
        .catch((error) => {});
    }
  }
  return;
});
