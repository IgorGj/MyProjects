// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
let addWatch = document.getElementById("add-watch");

let theContainer = document.querySelector("#important-row");

let someArray = Array.from(theContainer);
someArray.push("igor");
let newArray = [...someArray];
console.log(newArray);
const creatingWatch = () => {
  let inputForNameOfWatch = document.getElementById("watch-brand");
  let inputForModelOfWatch = document.getElementById("watch-model");
  let inputForAgeOfWatch = document.getElementById("watch-age");
  let inputForDescOfWatch = document.getElementById("desc-of-watch");

  let column = document.createElement("div");
  column.classList.add("col", "mt-5");
  let cardForWatch = document.createElement("div");
  cardForWatch.classList.add("card", "w-100");
  let imgOfWatch = document.createElement("img");
  imgOfWatch.classList.add("card-img-top");
  let descriptionOfWatch = document.createElement("div");
  descriptionOfWatch.classList.add("card-body");
  let nameOfWatch = document.createElement("h5");
  nameOfWatch.classList.add("card-title");
  nameOfWatch.setAttribute("id", "nameOfWatch");
  let ageOfWatch = document.createElement("h5");
  ageOfWatch.classList.add("card-title", "agedWatch");

  ageOfWatch.innerHTML += "Година на производство " + inputForAgeOfWatch.value;
  imgOfWatch.style.height = "300px";
  // imgOfWatch.src = selectionResult;
  nameOfWatch.innerHTML +=
    inputForNameOfWatch.value + " " + inputForModelOfWatch.value;
  let shortDescWatch = document.createElement("p");
  shortDescWatch.classList.add("card-text");
  shortDescWatch.innerHTML += inputForDescOfWatch.value;
  let routeToWatch = document.createElement("a");
  routeToWatch.innerHTML = "Види го огласот";
  routeToWatch.href = "./item.html";
  routeToWatch.classList.add("btn", "btn-primary");
  descriptionOfWatch.append(
    nameOfWatch,
    ageOfWatch,
    shortDescWatch,
    routeToWatch
  );
  cardForWatch.appendChild(imgOfWatch);
  cardForWatch.appendChild(descriptionOfWatch);
  column.appendChild(cardForWatch);
  theContainer.appendChild(column);
  return column;
};
addWatch.addEventListener("click", () => {
  // theContainer.appendChild(creatingWatch());
  newArray.push(creatingWatch());
  const allListingsAfterAdd = document.querySelectorAll(".col");
  // allListingsAfterAdd.forEach((el) => {
  //   el.addEventListener("click", somethingDiff);
  // });
  console.log(allListingsAfterAdd);
});
let inputForImgOfWatch = document.getElementById("img-of-watch");

// Your web app's Firebase configuration

// let selectionResult = null;
// inputForImgOfWatch.addEventListener(
//   "change",
//   (e) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const img = new Image();
//       img.src = selectionResult = reader.result;
//     };

//     reader.readAsDataURL(inputForImgOfWatch.files[0]);
//   },
//   false
// );

// const somethingDiff = (event) => {
//   const somePara = event.currentTarget.querySelector("p").innerHTML;
//   const someImg = event.currentTarget.querySelector("img").src;
//   const someHeader = event.currentTarget.querySelector("h5").innerHTML;
//   const agedWatch = event.currentTarget.querySelector(".agedWatch").innerHTML;
//   localStorage.setItem("somePara", somePara);
//   localStorage.setItem("someImg", someImg);
//   localStorage.setItem("someHeader", someHeader);
//   localStorage.setItem("agedWatch", agedWatch);
// };

// const allListingsBeforeAdd = document.querySelectorAll(".col");
// allListingsBeforeAdd.forEach((el) => {
//   el.addEventListener("click", somethingDiff);
// });

// const allThemAs = document.querySelectorAll("a");
// allThemAs.forEach((el) => {
//   el.href = "./item.html";
// });
