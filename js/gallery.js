"use strict";

function showRandomImageAtStart() {
    const links = document.querySelectorAll("#thumbnails a");
    const randomIndex = getRandomInt(0, links.length);
    const randomLink = links[randomIndex];
    const randomImageUrl = randomLink.href;
    const randomImageDescription = randomLink.querySelector("img").alt;

    switchFullImage(randomImageUrl, randomImageDescription);

    const cardBody = randomLink.nextElementSibling;
    cardBody.classList.add("bg-dark", "text-white");
}


function prepareLinks()  {
    const links = document.querySelectorAll("#thumbnails a");

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const currentHighlighted = document.querySelector(".bg-dark.text-white");
            if (currentHighlighted) {
                currentHighlighted.classList.remove("bg-dark", "text-white");
            }

            const imageUrl = link.href;
            const imageDescription = link.querySelector("img").alt;

            switchFullImage(imageUrl, imageDescription);

            const cardBody = link.nextElementSibling;
            cardBody.classList.add("bg-dark", "text-white");

            const key = imageUrl;
            loadNotes(key);
        });
    });
}


function storeNotes()  {
    const notesField = document.querySelector("#notes");
    notesField.addEventListener("blur", () => {
        const key = document.querySelector("#fullImage img").src;
        const notes = notesField.innerHTML.trim();
        if (notes === "") {
            localStorage.removeItem(key);
            notesField.innerHTML = "Enter your Notes here!";
        } else {
            localStorage.setItem(key, notes);
        }
    });
}




function switchFullImage(imageUrl, imageDescription) {
    const fullImage = document.querySelector("#fullImage img");
    fullImage.src = imageUrl;
    fullImage.alt = imageDescription;

    const figcaption = document.querySelector("#fullImage figcaption");
    figcaption.textContent = imageDescription;
}

function loadNotes(key) {
    const notesField = document.querySelector("#notes");
    const storedNotes = localStorage.getItem(key);

    if (storedNotes) {
        notesField.innerHTML = storedNotes;
    } else {
        notesField.innerHTML = "Enter your notes here!";
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


showRandomImageAtStart();
storeNotes();
prepareLinks();
