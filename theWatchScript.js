import { db, auth, user, database } from "./baseSetup.js";
import {
  ref,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

const params = new URLSearchParams(window.location.search);
let theId = params.get("id");
theId = theId.replace(/ /g, "");
console.log(theId.replace(/ /g, ""));
console.log(theId);
const docRef = doc(db, "watches", theId);
const docSnap = await getDoc(docRef);
let databaseNeededId =
  docSnap._document.data.value.mapValue.fields.userId.stringValue;
const databaseRef = ref(database, `users/${databaseNeededId}`);
get(databaseRef)
  .then(async (snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val().displayName);
      const contactNum = document.getElementById("contact-num");

      const fullName = document.getElementById("full-name");

      fullName.textContent = `Постирано од: ${snapshot
        .val()
        .fullName.toUpperCase()}`;
      contactNum.textContent = `Контакт број: ${snapshot.val().contactNum}`;
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
if (docSnap.exists()) {
  let number = 0;
  let views = {
    howManyViews: number++,
  };
  let theViews = docSnap.data().howManyViews;
  console.log(theViews);
  await updateDoc(docRef, {
    howManyViews: ++theViews,
  });

  // updateDoc(docSnap, views)
  //   .then((docSnap) => {})
  //   .catch((docSnap) => {});
  console.log(docSnap._document.data.value.mapValue.fields.userId.stringValue);
  console.log(docSnap);
  const theDocumentSnap = docSnap.data();
  const theWatchMark = document.getElementById("mark");
  const theWatchAge = document.getElementById("year");
  const theWatchDescription = document.getElementById("describe");

  const theCarrousel = document.querySelector(".carousel-inner");
  const carouselIndicators = document.querySelector(".carousel-indicators");
  const activeImg = document.querySelector("#active-img");
  let images = docSnap.data().imgUrl;
  let num = 0;
  images.forEach((el, index) => {
    console.log(index);
    if (index === 0) {
      activeImg.src = el;
    } else {
      let indicators = document.createElement("li");
      indicators.setAttribute("data-target", "#carouselExampleIndicators");
      indicators.setAttribute("data-slide-to", `${num++}`);
      let carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      console.log(el);
      let watchImg = document.createElement("img");
      watchImg.classList.add("d-block", "w-100", "rounded-circle");
      watchImg.src = el;
      carouselIndicators.append(indicators);
      carouselItem.append(watchImg);
      theCarrousel.append(carouselItem);
    }
  });
  console.log(docSnap.data().imgUrl);

  theWatchMark.textContent =
    theDocumentSnap.brand === ""
      ? "Марката и Моделот не се познати"
      : theDocumentSnap.brand + " " + theDocumentSnap.model;

  if (theDocumentSnap.prodYear === "") {
    theDocumentSnap.prodYear = "Не се знае!";
  }
  if (theDocumentSnap.description === "") {
    theDocumentSnap.description = "Нема детално објаснување за часовникот!";
  }
  theWatchAge.textContent =
    "Година на производство: " + theDocumentSnap.prodYear;
  theWatchDescription.textContent = theDocumentSnap.description;
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
          //Sign Out Successful
        })
        .catch((error) => {
          // An error happened.
          console.log("bad hpn");
        });
    }
  }
  return;
});
