import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
let theId = params.get("id");
theId = theId.replace(/ /g, "");
console.log(theId.replace(/ /g, ""));
console.log(theId);
const docRef = doc(db, "watches", theId);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
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
      watchImg.classList.add("d-block", "w-100");
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
