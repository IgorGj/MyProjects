const theBestFunc = () => {
  const theListing = document.querySelectorAll(".col.mt-5");
  console.log(theListing);
  theListing.forEach((item) => {
    item.addEventListener("click", (e) => {
      const theWatchImg = e.currentTarget.querySelectorAll(".card-img-top");
      const theWatchName = e.currentTarget.querySelectorAll(".card-title");
      const theWatchSeconName = e.currentTarget.querySelectorAll(
        ".card-title.agedWatch"
      );
      const theWatchDesc = e.currentTarget.querySelectorAll(".card-text");

      // window.location.assign("./listing.html");
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
      // theDivContainer.classList.add("")
      document.body.innerHTML = "";
      theWatchImg.forEach((item) => {
        const someImg = document.createElement("img");
        someImg.classList.add("card-img-top");
        someImg.src = item.src;
        colContainer.appendChild(someImg);
      });

      theWatchName.forEach((item) => {
        const theName = document.createElement("h2");
        console.log(item.innerHTML);
        theName.innerHTML = item.innerHTML;
        colContainer.appendChild(theName);
      });
      // theWatchSeconName.forEach((item) => {
      //   const theName = document.createElement("h4");
      //   console.log(item.innerHTML);
      //   theName.innerHTML = item.innerHTML;
      //   colContainer.appendChild(theName);
      // });
      theWatchDesc.forEach((item) => {
        const theDesc = document.createElement("p");
        theDesc.classList.add("card-text");
        theDesc.textContent = item.textContent;
        colContainer.appendChild(theDesc);
      });

      const buttonOne = document.createElement("a");
      buttonOne.classList.add("btn", "btn-danger");
      buttonOne.textContent = "Go to Home Page";
      buttonOne.href = "./index.html";
      colContainer.appendChild(buttonOne);
      // const somethingElse = document.createElement("img");
      // somethingElse.innerHTML = something;
      theDivContainer.append(colContainer);
      document.body.setAttribute("style", "overflow-x:hidden");
      document.body.appendChild(theDivContainer);

      // document.body.appendChild(somethingElse);
    });
  });
};

theBestFunc();
