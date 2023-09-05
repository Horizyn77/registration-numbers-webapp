const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector("h3 span");
const overlay = document.querySelector(".overlay");
const errorOrInfoDisplay = document.querySelector(".errorOrInfoDisplay");
const regNumsList = document.querySelector("ul");

errorOrInfoDisplay.style.display = "none";

if (errorOrInfoDisplay.innerHTML.includes("</i>")) {
    errorOrInfoDisplay.style.display = "block";
    setTimeout(() => {
        errorOrInfoDisplay.style.display = "none";
    }, 3000)
}

function modalLoad() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

errorOrInfoDisplay.addEventListener("click", (e) => {
    if (e.target.matches("#aboutLink")) {
        modalLoad();
    }
})

if (!localStorage["firstPageLoad"]) {
    window.addEventListener("load", () => modalLoad())
    localStorage["firstPageLoad"] = "true";
}

modalCloseBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden")
})
overlay.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden")
})

function getRegNumForDelete(e) {
    const elementText = e.target.parentElement.childNodes[0].nodeValue;

    if (e.target.tagName === "SPAN") {
        fetch("/delete", {
            method: "POST",
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({elementText})
        }).then(res => {if (res.ok) {window.location.href = "/"}})
    }
}

regNumsList.addEventListener("click", getRegNumForDelete)

