import { auth, db, collectionQuery } from "./baseSetup.js";
import {
  onSnapshot,
  getDocs,
  collection,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

// const db = getFirestore(app);

let theContainer = document.querySelector("#important-row");

// const querySnapshot = await getDocs(collection(db, "watches"));
// const collectionQuery = query(collection(db, "watches"));
const theFilter = document.getElementById("the-filter");


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
} else {
  theFilter.style.display = "flex";
}

// const auth = getAuth();
const signUp = document.querySelector("#sign-up");
const filteringTheWatches = (_label) => {
  // const auth = getAuth();
  const signUp = document.querySelector("#sign-up");
  const user = auth.currentUser;
  let theUid = _label.doc.id;
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

  thePrizeOfWatch.textContent = `${_label.doc.data().prize} ден.`;
  if (_label.doc.data().prize === "") {
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
  let viewsOfThePost = document.createElement("p");
  viewsOfThePost.classList.add("text-info", "font-weight-bold", "font-italic");

  viewsOfThePost.innerHTML = `Постот има ${
    _label.doc.data().howManyViews
  } ${(_label.doc.data().howManyViews = 1 ? "преглед" : "прегледи")}.`;
  if (_label.doc.data().howManyViews === null) {
    viewsOfThePost.innerHTML = `Постот нема прегледи.`;
  }
  uploadDate.classList.add("text-muted");
  uploadTime.classList.add("text-muted");
  let theDate = _label.doc.data().imageName.toDate().toDateString();

  let theTime = _label.doc
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
    uploadTime,
    viewsOfThePost
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
  const modelOfWatch = _label.doc.data().brand + " " + _label.doc.data().model;
  let ageOfWatch = _label.doc.data().prodYear;
  let descWatch = _label.doc.data().description;

  const srcOfImg = _label.doc.data().imgUrl;
  theimgOfWatch.addEventListener("load", () => {
    theLoader.style.display = "none";
  });
  theimgOfWatch.src = srcOfImg;
  thenameOfWatch.innerHTML = modelOfWatch;
  thenameOfWatch.style.textTransform = "capitalize";
  if (ageOfWatch === "") {
    ageOfWatch = "Не се знае!";
  }
  theageOfWatch.innerHTML = "Година на производство: " + ageOfWatch;
  if (descWatch === "") {
    descWatch = "Нема детално објаснување за часовникот!";
  }
  theshortDescWatch.textContent = descWatch;
};
// const theCollection = query(collection(db, "watches"));

const makingTheListing = onSnapshot(collectionQuery, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const user = auth.currentUser;

    if (change.type === "added") {
      filteringTheWatches(change);
    }
    if (change.type === "modified") {
      const theUid = change.doc.id;
      const theCard = document.getElementById(`${theUid}`);
      const img = theCard.querySelector(".card-img-top");

      img.src = change.doc.data().imgUrl;
    }
    if (change.type === "removed") {
      console.log("removed");
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

const searchBtn = document.querySelector("#search-btn");

const creatingPostWithFilter = (_somecollection) => {
  onSnapshot(_somecollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log(change);
      filteringTheWatches(change);
    });
  });
};
const searchInfo = document.getElementById("search-info");
let searchByBrand = document.getElementById("search-by-make");
searchByBrand.addEventListener("focus", () => {
  searchInfo.style.display = "flex ";
});
searchByBrand.addEventListener("blur", () => {
  searchInfo.style.display = "none ";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("searcham");
  let searchByPrice = document.getElementById("search-by-price");

  let theBrand = searchByBrand.value.toLowerCase();
  console.log(searchByPrice.value);
  const collections = collection(db, "watches");
  const collectionMostViewed = query(
    collections,
    orderBy("howManyViews", "desc")
  );
  const collectionDescendingOrder = query(
    collections,
    orderBy("prize", "desc")
  );
  const collectionAscendingOrder = query(collections, orderBy("prize", "asc"));
  const collectionNewestFirstOrder = query(
    collections,
    orderBy("imageName", "desc")
  );
  const filterBySearchedBrand = query(
    collections,
    where("brand", "==", `${theBrand}`)
  );
  const searchedBrandAndViewsDescending = query(
    filterBySearchedBrand,
    orderBy("howManyViews", "desc")
  );
  const searchedBrandAndPriceAscending = query(
    filterBySearchedBrand,
    orderBy("prize", "asc")
  );
  const searchedBrandAndPriceDescending = query(
    filterBySearchedBrand,
    orderBy("prize", "desc")
  );
  const searchedBrandAndDateOfPosting = query(
    filterBySearchedBrand,
    orderBy("imageName", "desc")
  );
  console.log(collectionDescendingOrder);
  theContainer.innerHTML = "";
  if (theBrand === "" && searchByPrice.value === "nothing") {
    creatingPostWithFilter(collectionQuery);
  } else if (theBrand !== "" && searchByPrice.value === "nothing") {
    creatingPostWithFilter(filterBySearchedBrand);
  } else if (theBrand === "" && searchByPrice.value === "Most expensive") {
    creatingPostWithFilter(collectionDescendingOrder);
  } else if (theBrand === "" && searchByPrice.value === "Cheepest") {
    creatingPostWithFilter(collectionAscendingOrder);
  } else if (theBrand === "" && searchByPrice.value === "Newest") {
    creatingPostWithFilter(collectionNewestFirstOrder);
  } else if (theBrand !== "" && searchByPrice.value === "Cheepest") {
    creatingPostWithFilter(searchedBrandAndPriceAscending);
  } else if (theBrand !== "" && searchByPrice.value === "Most expensive") {
    creatingPostWithFilter(searchedBrandAndPriceDescending);
  } else if (theBrand !== "" && searchByPrice.value === "Newest") {
    creatingPostWithFilter(searchedBrandAndDateOfPosting);
  } else if (theBrand === "" && searchByPrice.value === "Most viewed") {
    creatingPostWithFilter(collectionMostViewed);
  } else if (theBrand !== "" && searchByPrice.value === "Most viewed") {
    creatingPostWithFilter(searchedBrandAndViewsDescending);
  }
});
