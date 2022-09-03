import { app } from "./baseSetup.js";
import {
  getFirestore,
  collection,
  query,
  doc,
  onSnapshot,
  getDocs,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;
let theContainer = document.querySelector("#important-row");

const theCollection = query(collection(db, "watches"));
const makingTheListing = onSnapshot(theCollection, (snapshot) => {
  if (!auth.currentUser) {
    const theModalInner = document.getElementById("myModal");
    const theModal = document.querySelector(".modal");
    const closingModal = document.querySelector(".close");

    theModalInner.style.display = "block";

    closingModal.addEventListener("click", () => {
      theModalInner.style.display = "none";
    });

    theModal.addEventListener("click", () => {
      theModalInner.style.display = "none";
    });

    // document.body.classList.add("modal-open");
    // theModal.classList.add("show");
    // theModal.setAttribute("aria-modal", "true");
    // theModal.setAttribute("style", "display:block");
    // document.body.innerHTML += `<div class="modal-backdrop fade show"></div>`;
    //<div class="modal-backdrop fade show"></div>
    return;
  }
  snapshot.docChanges().forEach((change) => {
    if (
      change.doc.data().userId === auth.currentUser.uid &&
      change.type === "added"
    ) {
      let theUid = change.doc.id;
      theUid = theUid.replace(/ +/g, "");
      console.log(theUid);
      let theCard = document.createElement("div");
      theCard.setAttribute("style", "  position: relative;");
      theCard.setAttribute("id", `${theUid}`);
      theCard.classList.add("col", "mb-5");
      let thecardForWatch = document.createElement("div");
      thecardForWatch.classList.add("card", "w-100", "h-100");
      let theimgOfWatch = document.createElement("img");
      theimgOfWatch.classList.add("card-img-top");

      const loaderParent = document.createElement("div");

      loaderParent.setAttribute(
        "style",
        "position:absolute;top:50%; left:50%; transform: translate(-50%,-50%);"
      );

      let theLoader = document.createElement("div");
      theLoader.setAttribute("id", "loader");
      let thedescriptionOfWatch = document.createElement("div");
      thedescriptionOfWatch.classList.add("card-body");
      let thenameOfWatch = document.createElement("h5");
      thenameOfWatch.classList.add("card-title");
      thenameOfWatch.setAttribute("id", "nameOfWatch");
      let theageOfWatch = document.createElement("h5");
      let theshortDescWatch = document.createElement("p");

      let deleteBtn = document.createElement("span");
      deleteBtn.textContent = "delete";
      deleteBtn.classList.add("material-symbols-outlined", "text-danger");
      deleteBtn.setAttribute(
        "style",
        "cursor:pointer;position:absolute; display:none; right:0;top:0; font-size:2rem; font-weight:bolder"
      );

      deleteBtn.addEventListener("click", () => {
        document.querySelector(`#${theUid}`).remove();
        deleteDoc(doc(db, "watches", `${theUid}`));
      });
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
      theLoader.style.display = "block";

      loaderParent.append(theLoader);
      thecardForWatch.append(deleteBtn, loaderParent, theimgOfWatch);
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

      theCard.addEventListener("mouseover", () => {
        deleteBtn.style.display = "block";
      });
      theCard.addEventListener("mouseout", () => {
        deleteBtn.style.display = "none";
      });

      if (ageOfWatch === "") {
        ageOfWatch = "Не се знае!";
      }
      theageOfWatch.innerHTML = "Година на производство: " + ageOfWatch;
      if (descWatch === "") {
        descWatch = "Нема детално објаснување за часовникот!";
      }
      theshortDescWatch.textContent = descWatch;

      if (user !== null) {
        console.log(user.uid);
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.contactInfo);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }
    }

    if (change.type === "removed") {
      console.log("Removed city: ", change.doc.data());
    }
  });
});
const q = query(collection(db, "watches"));
console.log(q);
const querySnapshot = await getDocs(q);
let num = 0;
let BreakException = {};
try {
  querySnapshot.forEach((doc) => {
    if (!auth.currentUser) {
      throw BreakException;
    } else if (auth.currentUser.uid === doc.data().userId) {
      num++;
    }
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
} catch (e) {
  console.log(e);
}

if (num === 0 && auth.currentUser) {
  alert("You don't have any watches posted!");
  window.location.href = "./index.html";
}

const signUp = document.querySelector("#sign-up");

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
