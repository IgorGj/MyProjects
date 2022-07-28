// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";

// import {
//   getDatabase,
//   ref,
//   set,
//   child,
//   update,
//   remove,
// } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

// window.addEventListener("load", () => {
//   const db = getDatabase();

//   const dbRef = ref(db);

//   get(child(dbRef, "TheWatch/" + watchModel.value))
//     .getHeaderNames((snapshot) => {
//       if (snapshot.exists()) {
//         watchAge.value = snapshot.val().watchAge;
//         shortDescWatch.value = snapshot.val().shortDesc;

//         //         watchModel: watchModel.value,
//         // watchAge: watchAge.value,
//         // shortDesc: shortDescWatch.value,
//       } else {
//         alert("no data found");
//       }
//     })
//     .catch((error) => {
//       alert("eror", error);
//     });
//   // const mark = document.getElementById("mark");
//   // const model = document.getElementById("model");
//   // const year = document.getElementById("year");
//   // const describe = document.getElementById("describe");
//   // const watch = document.getElementById("watch");

//   // const description = localStorage.getItem("somePara");
//   // const images = localStorage.getItem("someImg");
//   // const header = localStorage.getItem("someHeader");
//   // const oldWatch = localStorage.getItem("agedWatch");

//   // mark.innerHTML += header;
//   // describe.innerHTML += description;
//   // watch.src = images;
//   // year.innerHTML += oldWatch;
// });

// const getData = () => {};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  get,
  set,
  onChildAdded,
  push,
  child,
  update,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmsKYsU_0LQkC2KGFxRvzNV9dcmkWiqP0",
  authDomain: "watchsalesite-f6af0.firebaseapp.com",
  projectId: "watchsalesite-f6af0",
  storageBucket: "watchsalesite-f6af0.appspot.com",
  messagingSenderId: "21745374690",
  appId: "1:21745374690:web:fa3faec6184db9f08415bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
const dbRef = ref(db);
const nameOfWatch = document.getElementById("watch-brand");
const watchModel = document.getElementById("watch-model");
const watchAge = document.getElementById("watch-age");
const shortDescWatch = document.getElementById("desc-of-watch");

// const mark = document.getElementById("mark");
// const model = document.getElementById("model");
// const year = document.getElementById("year");
// const describe = document.getElementById("describe");
// const watch = document.getElementById("watch");
let firebaseRef = ref(db, "TheWatch/");
console.log(dbRef);
const InsertData = () => {
  // const newWatches = push(dbRef);
  // newWatches
  //   .set({
  //     watchModel: watchModel.value,
  //     watchAge: watchAge.value,
  //     shortDesc: shortDescWatch.value,
  //   })
  //   .then(() => {
  //     console.log("success upload data");
  //   })
  //   .catch((error) => {
  //     alert("unsuc,error", error);
  //   });
  // console.log(newWatches);

  set(ref(db, "TheWatch/" + nameOfWatch.value), {
    watchModel: watchModel.value,
    watchAge: watchAge.value,
    shortDesc: shortDescWatch.value,
  })
    .then(() => {
      console.log("success upload data");
    })
    .catch((error) => {
      alert("unsuc,error", error);
    });
};
let theContainer = document.querySelector("#important-row");

// console.log(firebaseRef);
onChildAdded(firebaseRef, (snapshot) => {
  console.log("joj", snapshot);
  let theCard = document.createElement("div");
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

  const data = snapshot.val();
  const childKey = snapshot.key;
  console.log(childKey);
  const modelOfWatch = snapshot.val().watchModel;
  const ageOfWatch = snapshot.val().watchAge;
  const descWatch = snapshot.val().shortDesc;

  thenameOfWatch.innerHTML = childKey + " " + modelOfWatch;
  theageOfWatch.innerHTML += "Година на производство " + ageOfWatch;
  theshortDescWatch.innerHTML += descWatch;
});
// onValue(firebaseRef, (snapshot) => {
//   console.log(snapshot);
//   snapshot.forEach((childSnapshot) => {
//     // let theCard = document.createElement("div");
//     // theCard.classList.add("col", "mt-5");
//     // let thecardForWatch = document.createElement("div");
//     // thecardForWatch.classList.add("card", "w-100");
//     // let theimgOfWatch = document.createElement("img");
//     // theimgOfWatch.classList.add("card-img-top");
//     // let thedescriptionOfWatch = document.createElement("div");
//     // thedescriptionOfWatch.classList.add("card-body");
//     // let thenameOfWatch = document.createElement("h5");
//     // thenameOfWatch.classList.add("card-title");
//     // thenameOfWatch.setAttribute("id", "nameOfWatch");
//     // let theageOfWatch = document.createElement("h5");
//     // let theshortDescWatch = document.createElement("p");
//     // theageOfWatch.classList.add("card-title", "agedWatch");
//     // thedescriptionOfWatch.append(
//     //   thenameOfWatch,
//     //   theageOfWatch,
//     //   theshortDescWatch
//     // );
//     // thecardForWatch.appendChild(theimgOfWatch);
//     // thecardForWatch.appendChild(thedescriptionOfWatch);
//     // theCard.appendChild(thecardForWatch);
//     // theContainer.appendChild(theCard);
//     // const data = childSnapshot.val();
//     // const childKey = childSnapshot.key;
//     // console.log(childKey);
//     // const modelOfWatch = childSnapshot.val().watchModel;
//     // const ageOfWatch = childSnapshot.val().watchAge;
//     // const descWatch = childSnapshot.val().shortDesc;
//     // thenameOfWatch.innerHTML = childKey + " " + modelOfWatch;
//     // theageOfWatch.innerHTML += "Година на производство " + ageOfWatch;
//     // theshortDescWatch.innerHTML += descWatch;
//     // const someParag = document.createElement("p");
//     // someParag.innerHTML = modelOfWatch;
//     // document.body.append(someParag);
//     // childSnapshot.forEach((snapshot) => {
//     //   const arr = snapshot.val();
//     //   console.log(arr);
//     // });
//     // ...
//   });
//   // const data = snapshot.val();
//   // const newArr = Object.entries(data);
//   // console.log(newArr);

//   // model.innerHTML = newArr[0][0];
//   // for (const [key, value] of Object.entries(data)) {
//   //   // console.log(`${key}: ${Object.entries(value)}`);

//   //   const arr = Object.entries(value);
//   //   const arr2 = Array.from(arr);
//   //   console.log(arr2[0]);

//   //   console.log(arr);
//   //   return key, value;
//   // }
// });

// const getData = () => {
//   get(child(dbRef, "TheWatch/" + nameOfWatch.value))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         watchModel.value = snapshot.val().watchModel;
//         watchAge.value = snapshot.val().watchAge;
//         shortDescWatch.value = snapshot.val().shortDesc;
//         console.log("joj");
//         //         watchModel: watchModel.value,
//         // watchAge: watchAge.value,
//         // shortDesc: shortDescWatch.value,
//       } else {
//         alert("no data found");
//       }
//     })
//     .catch((error) => {
//       alert("eror", error);
//     });
//   const mark = document.getElementById("mark");
//   const model = document.getElementById("model");
//   const year = document.getElementById("year");
//   const describe = document.getElementById("describe");
//   const watch = document.getElementById("watch");
//   mark.innerHTML = "joj";
//   console.log("joj");
// };
// const allThemAs = document.querySelectorAll("a");
// allThemAs.forEach((el) => {
//   el.href = "./item.html";
// });

// window.addEventListener("hashchange", getData);
const addingwatch = document.getElementById("add-watch");
addingwatch.addEventListener("click", InsertData);
