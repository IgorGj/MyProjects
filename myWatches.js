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
  deleteObject,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";

let allUrls = [];
async function saveURLtoFirestore(
  _watchBrand,
  _watchModel,
  _watchProdYear,
  _descOfWatch,
  _watchPrize,
  _files,
  _someName
) {
  // let imagName = new Date().toGMTString();
  let imagName = new Date();
  // imagName = imagName.replace(/ +/g, "");

  // const watchBrand = document.getElementById("watch-brand");
  // const watchModel = document.getElementById("watch-model");
  // const watchProdYear = document.getElementById("watch-age");
  // const descOfWatch = document.getElementById("desc-of-watch");

  const docRefWithId = await addDoc(collection(db, "watches"), {
    userId: auth.currentUser.uid,
    imageName: imagName,
    imgUrl: [],
    brand: _watchBrand.value.toLowerCase(),
    model: _watchModel.value,
    prodYear: _watchProdYear.value,
    description: _descOfWatch.value,
    prize: _watchPrize.value,
    someName: _someName,
    howManyViews: null,
  });

  async function uploadProcess() {
    let imgtoUpload = [..._files];
    [..._files].forEach((el) => {
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
        },
        (error) => {
          alert("not uploaded");
        },
        async function downURL() {
          const docRef = doc(db, "watches", docRefWithId.id);
          // const docRef = doc(db, "watches", user.uid);

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            allUrls.push(downloadURL);
            let everyImg = {
              imgUrl: [...allUrls],
            };
            // saveURLtoFirestore(allUrls);

            updateDoc(docRef, everyImg)
              .then((docRef) => {})
              .catch((error) => {});
          });
        }
      );
    });
    allUrls = [];
  }

  uploadProcess();
  _watchBrand.value = "";
  _watchModel.value = "";
  _watchProdYear.value = "";
  _watchPrize.value = "";
  _descOfWatch.value = "";
}

const checkIfInputFieldIsEmpty = (_theInputField, _formGroup, _modalHeader) => {
  if (_theInputField.value === "") {
    _theInputField.style.borderColor = "red";
    _theInputField.classList.remove("mb-5");
    _modalHeader.textContent = "Сите Полиња се Задолжителни!";
    _modalHeader.style.color = "red";
    const smallParagraph = document.createElement("small");
    smallParagraph.textContent = "Оваа информација е задолжителна!";
    smallParagraph.classList.add("d-block", "text-danger", "mb-5");
    const theNextSibling = _theInputField.nextSibling;
    console.log(theNextSibling);
    _formGroup.insertBefore(smallParagraph, theNextSibling);
    _theInputField.addEventListener("keyup", () => {
      console.log("joj");
      smallParagraph.remove();
      _theInputField.classList.add("mb-5");
      _theInputField.style.borderColor = "green";
    });
  } else {
    _theInputField.style.borderColor = "green";
  }
};
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
  const watchPrize = document.createElement("input");
  const inputWatchImage = document.createElement("input");
  const descOfWatch = document.createElement("textarea");

  watchBrand.classList.add("form-control", "form-control-lg", "mb-5");
  watchBrand.setAttribute("type", "text");
  watchBrand.setAttribute("placeholder", "Бренд на часовникот");

  watchModel.classList.add("form-control", "form-control-lg", "mb-5");
  watchModel.setAttribute("type", "text");
  watchModel.setAttribute("placeholder", "Модел на часовникот");

  watchProdYear.classList.add("form-control", "form-control-lg", "mb-5");
  watchProdYear.setAttribute("type", "number");
  watchProdYear.setAttribute("placeholder", "Година на производство");

  watchPrize.classList.add("form-control", "form-control-lg", "mb-5");
  watchPrize.setAttribute("type", "number");
  watchPrize.setAttribute("placeholder", "Цена на часовникот");

  inputWatchImage.classList.add("form-control-file");
  inputWatchImage.setAttribute("type", "file");
  inputWatchImage.setAttribute("multiple", "");

  descOfWatch.classList.add("form-control", "mb-5");
  descOfWatch.setAttribute("rows", "3");
  descOfWatch.setAttribute("placeholder", "Опис на часовникот");

  const modalTitle = document.createElement("h5");
  modalTitle.setAttribute("id", "second-modal-title");
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
    watchPrize,
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
  let namingOfImages = [];
  let reader = new FileReader();
  inputWatchImage.onchange = (e) => {
    files = e.target.files;
    console.log(files);
    let namesOfImages = Object.values(files);
    console.log(namesOfImages);
    namesOfImages.forEach((el) => {
      namingOfImages.push(el.name);
    });
    console.log(namingOfImages);

    // let extention = GetFileExt(files[0]);
    // let theName = GetFileName(files[0]);
    reader.readAsDataURL(files[0]);
  };
  addTheWatchBtn.addEventListener("click", () => {
    if (
      watchBrand.value === "" ||
      watchModel.value === "" ||
      watchProdYear.value === "" ||
      descOfWatch.value === "" ||
      watchPrize.value === ""
    ) {
      checkIfInputFieldIsEmpty(watchBrand, formGroup, modalTitle);
      checkIfInputFieldIsEmpty(watchModel, formGroup, modalTitle);
      checkIfInputFieldIsEmpty(watchProdYear, formGroup, modalTitle);
      checkIfInputFieldIsEmpty(descOfWatch, formGroup, modalTitle);
      checkIfInputFieldIsEmpty(watchPrize, formGroup, modalTitle);
    } else {
      saveURLtoFirestore(
        watchBrand,
        watchModel,
        watchProdYear,
        descOfWatch,
        watchPrize,
        files,
        namingOfImages
      );
      modalDialog.remove();
    }
  });
};

let creatingWatch = (parametar) => {
  if (!parametar.doc.id) {
  }
  let theUid = parametar.doc.id;
  theUid = theUid.replace(/ +/g, "");
  let theCard = document.createElement("div");
  theCard.setAttribute("style", "  position: relative;");
  theCard.setAttribute("id", `${theUid}`);
  theCard.classList.add("col", "mb-5");
  let thecardForWatch = document.createElement("div");
  thecardForWatch.classList.add("card", "w-100", "h-100");

  let thePrizeOfWatch = document.createElement("i");
  thePrizeOfWatch.style.color = "red";
  thePrizeOfWatch.style.fontSize = "1.5rem";
  parametar.doc.data().prize === ""
    ? (thePrizeOfWatch.textContent = ` По договор.`)
    : (thePrizeOfWatch.textContent = `${parametar.doc.data().prize} ден.`);

  let viewsOfThePost = document.createElement("p");
  viewsOfThePost.classList.add("text-info", "font-weight-bold", "font-italic");

  viewsOfThePost.innerHTML = `Постот има ${
    parametar.doc.data().howManyViews
  } прегледи.`;
  if (parametar.doc.data().howManyViews === null) {
    viewsOfThePost.innerHTML = `Постот нема прегледи.`;
  }

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
    console.log(parametar.doc.data().someName);
    let imagesForDeleting = parametar.doc.data().someName;
    imagesForDeleting.forEach((el) => {
      const desertRef = sRef(storage, `images/${el}`);
      deleteObject(desertRef)
        .then(() => {
          console.log("deleted");
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    });
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
  let theDate = parametar.doc.data().imageName.toDate().toDateString();
  let theTime = parametar.doc
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
  thenameOfWatch.style.textTransform = "capitalize";
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
let filesSecond = [];
let namingOfImagesSecond = [];
let reader = new FileReader();
imgOfWatch.onchange = (e) => {
  filesSecond = e.target.files;
  // let extention = GetFileExt(files[0]);
  // let theName = GetFileName(files[0]);
  let namesOfImagesSecond = Object.values(filesSecond);
  console.log(namesOfImagesSecond);
  namesOfImagesSecond.forEach((el) => {
    namingOfImagesSecond.push(el.name);
  });
  console.log(namesOfImagesSecond);

  reader.readAsDataURL(filesSecond[0]);
};

let theContainer = document.querySelector("#important-row");

const addingWatches = document.getElementById("add-watch");
addingWatches.addEventListener("click", (e) => {
  const watchBrand = document.getElementById("watch-brand");
  const watchModel = document.getElementById("watch-model");
  const watchProdYear = document.getElementById("watch-age");
  const descOfWatch = document.getElementById("desc-of-watch");
  const watchPrize = document.getElementById("watch-prize");
  const theFormGroup = document.getElementById("watch-form");
  const modalTitle = document.querySelector(".modal-title");
  if (
    watchBrand.value === "" ||
    watchModel.value === "" ||
    watchProdYear.value === "" ||
    descOfWatch.value === "" ||
    watchPrize.value === ""
  ) {
    addingWatches.setAttribute("data-dismiss", "");
    checkIfInputFieldIsEmpty(watchBrand, theFormGroup, modalTitle);
    checkIfInputFieldIsEmpty(watchModel, theFormGroup, modalTitle);
    checkIfInputFieldIsEmpty(watchProdYear, theFormGroup, modalTitle);
    checkIfInputFieldIsEmpty(descOfWatch, theFormGroup, modalTitle);
    checkIfInputFieldIsEmpty(watchPrize, theFormGroup, modalTitle);
    return;
  } else {
    addingWatches.setAttribute("data-dismiss", "modal");
    saveURLtoFirestore(
      watchBrand,
      watchModel,
      watchProdYear,
      descOfWatch,
      watchPrize,
      filesSecond,
      namingOfImagesSecond
    );
  }
});

// const collectionQuery = query(collection(db, "watches"));
const makingTheListing = onSnapshot(collectionQuery, (snapshot) => {
  if (!auth.currentUser) {
    const theModalInner = document.getElementById("myModal");
    // const theModal = document.querySelector(".my-modal");
    // const closingModal = document.querySelector(".close");

    theModalInner.style.display = "block";

    // closingModal.addEventListener("click", () => {
    //   theModalInner.style.display = "none";
    // });

    // theModal.addEventListener("click", () => {
    //   theModalInner.style.display = "none";
    // });
    return;
  }
  snapshot.docChanges().forEach(async (change) => {
    if (
      change.doc.data().userId === auth.currentUser.uid &&
      change.type === "added"
    ) {
      creatingWatch(change);
      const userAddWatchBtn = document.querySelector("#user-add-watch");
      userAddWatchBtn.style.display = "block";
    }

    if (change.type === "modified") {
      const theUid = change.doc.id;
      const theCard = document.getElementById(`${theUid}`);
      const img = theCard.querySelector(".card-img-top");

      img.src = change.doc.data().imgUrl;
    }

    if (change.type === "removed") {
      const q = query(
        collection(db, "watches"),
        where("userId", "==", `${auth.currentUser.uid}`)
      );
      const querySnapshot = await getDocs(q);

      // const userAddWatchBtn = document.querySelector("#user-add-watch");
      // querySnapshot.empty
      //   ? (userAddWatchBtn.style.display = "none") && creatingModal()
      //   : null;
      if (querySnapshot.empty) {
        creatingModal();
        const userAddWatchBtn = document.querySelector("#user-add-watch");
        userAddWatchBtn.style.display = "none";
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
} catch (e) {}

const signUp = document.querySelector("#sign-up");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    signUp.textContent = "Sign Out";

    const q = query(
      collection(db, "watches"),
      where("userId", "==", `${user.uid}`)
    );
    const querySnapshot = await getDocs(q);
    // querySnapshot.empty
    //   ? (document.querySelector("#user-add-watch").style.display = "none") &&
    //     creatingModal()
    //   : (document.querySelector("#user-add-watch").style.display = "block");
    if (querySnapshot.empty) {
      creatingModal();
      document.querySelector("#user-add-watch").style.display = "none";
      // document.querySelector("#user-add-watch").parentElement.remove();
    } else {
      document.querySelector("#user-add-watch").style.display = "block";
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
          window.location.href = "./index.html";
        })
        .catch((error) => {});
    } else {
      return;
    }
  }
  return;
});
