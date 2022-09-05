import { app, storage, db, auth, user, collectionQuery } from "./baseSetup.js";
import {
  collection,
  query,
  doc,
  onSnapshot,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  where,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";

let creatingModal = () => {
  const modalDialog = document.createElement("div");
  const modalContent = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalBody = document.createElement("div");
  const modalFooter = document.createElement("div");
  const formGroup = document.createElement("div");

  modalDialog.classList.add("modal-dialog");
  modalContent.classList.add("modal-content");
  modalHeader.classList.add("modal-header");
  modalBody.classList.add("modal-body");
  modalFooter.classList.add("modal-footer");
  formGroup.classList.add("form-group");

  const theForm = document.createElement("form");
  const watchBrand = document.createElement("input");
  const watchModel = document.createElement("input");
  const watchProdYear = document.createElement("input");
  const inputWatchImage = document.createElement("input");
  const descOfWatch = document.createElement("textarea");

  // const watchBrand = document.getElementById("watch-brand");
  // const watchModel = document.getElementById("watch-model");
  // const watchProdYear = document.getElementById("watch-age");
  // const descOfWatch = document.getElementById("desc-of-watch");
  watchBrand.classList.add("form-control", "form-control-lg", "mb-5");
  watchBrand.setAttribute("type", "text");
  watchBrand.setAttribute("placeholder", "Бренд на часовникот");

  watchModel.classList.add("form-control", "form-control-lg", "mb-5");
  watchModel.setAttribute("type", "text");
  watchModel.setAttribute("placeholder", "Модел на часовникот");

  watchProdYear.classList.add("form-control", "form-control-lg", "mb-5");
  watchProdYear.setAttribute("type", "number");
  watchProdYear.setAttribute("placeholder", "Година на производство");

  inputWatchImage.classList.add("form-control-file");
  inputWatchImage.setAttribute("type", "file");

  descOfWatch.classList.add("form-control", "mb-5");
  descOfWatch.setAttribute("rows", "3");
  descOfWatch.setAttribute("placeholder", "Опис на часовникот");

  const modalTitle = document.createElement("h5");
  modalTitle.classList.add("modal-title");
  modalTitle.textContent = "Продаваш часовник?";

  const addTheWatchBtn = document.createElement("button");
  addTheWatchBtn.classList.add("btn", "btn-info");
  addTheWatchBtn.textContent = "Add the Watch";

  modalHeader.append(modalTitle);
  formGroup.append(
    watchBrand,
    watchModel,
    watchProdYear,
    descOfWatch,
    inputWatchImage
  );
  theForm.append(formGroup);
  modalBody.append(theForm);
  modalFooter.append(addTheWatchBtn);
  modalContent.append(modalHeader, modalBody, modalFooter);
  modalDialog.append(modalContent);
  document.body.append(modalDialog);
  let files = [];
  let reader = new FileReader();
  inputWatchImage.onchange = (e) => {
    files = e.target.files;
    console.log([...e.target.files]);
    // let extention = GetFileExt(files[0]);
    // let theName = GetFileName(files[0]);
    reader.readAsDataURL(files[0]);
  };

  let allUrls = [];
  async function saveURLtoFirestore() {
    // let imagName = new Date().toGMTString();
    let imagName = new Date();
    // imagName = imagName.replace(/ +/g, "");
    console.log(imagName);

    const watchBrand = document.getElementById("watch-brand");
    const watchModel = document.getElementById("watch-model");
    const watchProdYear = document.getElementById("watch-age");
    const descOfWatch = document.getElementById("desc-of-watch");

    const docRefWithId = await addDoc(collection(db, "watches"), {
      userId: auth.currentUser.uid,
      imageName: imagName,
      imgUrl: [],
      brand: watchBrand.value,
      model: watchModel.value,
      prodYear: watchProdYear.value,
      description: descOfWatch.value,
    });

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
            // const docRef = doc(db, "watches", user.uid);

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
  }
  addTheWatchBtn.addEventListener("click", saveURLtoFirestore);
  addTheWatchBtn.addEventListener("click", () => {
    modalDialog.remove();
  });
};

let creatingWatch = (parametar) => {
  if (!parametar.doc.id) {
    console.log("njama parametar.doc.id");
  }
  let theUid = parametar.doc.id;
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
    document.getElementById(`${theUid}`).remove();
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
  console.log(parametar.doc.data().imageName.toDate().toDateString());
  let theDate = parametar.doc.data().imageName.toDate().toDateString();
  let theTime = parametar.doc
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
    parametar.doc.data().brand + " " + parametar.doc.data().model;
  let ageOfWatch = parametar.doc.data().prodYear;
  let descWatch = parametar.doc.data().description;

  const srcOfImg = parametar.doc.data().imgUrl;
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
};

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

let theContainer = document.querySelector("#important-row");

const addingWatches = document.getElementById("add-watch");
addingWatches.addEventListener("click", () => {
  async function saveURLtoFirestore() {
    // let imagName = new Date().toGMTString();
    let imagName = new Date();
    // imagName = imagName.replace(/ +/g, "");

    const watchBrand = document.getElementById("watch-brand");
    const watchModel = document.getElementById("watch-model");
    const watchProdYear = document.getElementById("watch-age");
    const descOfWatch = document.getElementById("desc-of-watch");

    // const auth = getAuth();
    // const user = auth.currentUser;
    // await setDoc(doc(db, "watches", imagName), {
    //   brand: watchBrand.value,
    //   model: watchModel.value,
    //   imgUrl: [],
    //   prodYear: watchProdYear.value,
    //   description: descOfWatch.value,
    //   imageName: new Date(),
    // });
    const docRefWithId = await addDoc(collection(db, "watches"), {
      userId: auth.currentUser.uid,
      imageName: imagName,
      imgUrl: [],
      brand: watchBrand.value,
      model: watchModel.value,
      prodYear: watchProdYear.value,
      description: descOfWatch.value,
    });

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
            // const docRef = doc(db, "watches", user.uid);

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

    // url = "";
  }
  saveURLtoFirestore();
});
let allUrls = [];

// async function saveURLtoFirestore(url) {
//   // let imagName = new Date().toGMTString();
//   let imagName = new Date();
//   // imagName = imagName.replace(/ +/g, "");
//   console.log(imagName);

//   const watchBrand = document.getElementById("watch-brand");
//   const watchModel = document.getElementById("watch-model");
//   const watchProdYear = document.getElementById("watch-age");
//   const descOfWatch = document.getElementById("desc-of-watch");

//   const auth = getAuth();
//   const user = auth.currentUser;
//   // await setDoc(doc(db, "watches", imagName), {
//   //   brand: watchBrand.value,
//   //   model: watchModel.value,
//   //   imgUrl: [],
//   //   prodYear: watchProdYear.value,
//   //   description: descOfWatch.value,
//   //   imageName: new Date(),
//   // });
//   const docRefWithId = await addDoc(collection(db, "watches"), {
//     userId: user.uid,
//     imageName: imagName,
//     imgUrl: [],
//     brand: watchBrand.value,
//     model: watchModel.value,
//     prodYear: watchProdYear.value,
//     description: descOfWatch.value,
//   });

//   async function uploadProcess() {
//     let imgtoUpload = [...files];
//     console.log([...files]);
//     [...files].forEach((el) => {
//       let imgName = new Date();
//       // set metadata so if the user doesn't chose an image he can't make a listing.
//       const metaData = {
//         contentType: el.type,
//       };
//       const storageRef = sRef(storage, "images/" + el.name);
//       const uploadTask = uploadBytesResumable(storageRef, el, metaData);
//       uploadTask.on(
//         "state-changed",
//         (snapshot) => {
//           let progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(progress);
//         },
//         (error) => {
//           alert("not uploaded");
//         },
//         async function downURL() {
//           const docRef = doc(db, "watches", docRefWithId.id);
//           // const docRef = doc(db, "watches", user.uid);

//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             allUrls.push(downloadURL);
//             console.log(uploadTask.snapshot.ref);
//             let everyImg = {
//               imgUrl: [...allUrls],
//             };
//             // saveURLtoFirestore(allUrls);

//             updateDoc(docRef, everyImg)
//               .then((docRef) => {
//                 console.log("a new image is added");
//               })
//               .catch((error) => {
//                 console.log("cant add images");
//               });
//           });
//         }
//       );
//     });
//     allUrls = [];
//   }

//   uploadProcess();
//   watchBrand.value = "";
//   watchModel.value = "";
//   watchProdYear.value = "";
//   descOfWatch.value = "";

//   // url = "";
// }
// addingWatches.addEventListener("click", saveURLtoFirestore);

// const collectionQuery = query(collection(db, "watches"));
const makingTheListing = onSnapshot(collectionQuery, (snapshot) => {
  if (!auth.currentUser) {
    const theModalInner = document.getElementById("myModal");
    const theModal = document.querySelector(".my-modal");
    const closingModal = document.querySelector(".close");

    theModalInner.style.display = "block";

    closingModal.addEventListener("click", () => {
      theModalInner.style.display = "none";
    });

    theModal.addEventListener("click", () => {
      theModalInner.style.display = "none";
    });
    return;
  }
  snapshot.docChanges().forEach(async (change) => {
    if (
      change.doc.data().userId === auth.currentUser.uid &&
      change.type === "added"
    ) {
      creatingWatch(change);
      console.log(document.querySelector(".modal-dialog"));
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
      const q = query(
        collection(db, "watches"),
        where("userId", "==", `${auth.currentUser.uid}`)
      );
      console.log(q);
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      if (querySnapshot.empty) {
        creatingModal();
        document.querySelector("#user-add-watch").parentElement.remove();
      }
    }
  });
});

let num = 0;
let BreakException = {};
try {
  querySnapshot.forEach((doc) => {
    if (!auth.currentUser) {
      throw BreakException;
    } else if (auth.currentUser.uid === doc.data().userId) {
      num++;
    }
  });
} catch (e) {
  console.log(e);
}

const signUp = document.querySelector("#sign-up");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    signUp.textContent = "Sign Out";

    const q = query(
      collection(db, "watches"),
      where("userId", "==", `${user.uid}`)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      creatingModal();
      document.querySelector("#user-add-watch").parentElement.remove();
    }
  } else {
    signUp.textContent = "Sign Up";
    document.querySelector("#user-add-watch").parentElement.remove();
  }
});

window.addEventListener("click", (e) => {
  if (e.target.textContent === "Sign Out") {
    e.preventDefault();
    if (confirm("Do You Want To Sign Out?") === true) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          console.log("bad hpn");
        });
    } else {
      return;
    }
  }
  return;
});
