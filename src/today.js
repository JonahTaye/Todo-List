import { Todo, Group } from "./todo"
import { StorageManager } from "./storageManager"
import { openForm } from "./forms"

export const todayDisplay = function() {
    const header = document.querySelector(".content > .title")
    header.textContent = "Today"
    const card = document.querySelector(".card")
    const container = document.querySelector(".card-container")

    displayCard()
}

function displayCard() {
    const card = document.querySelector(".card")
    const container = document.querySelector(".card-container")

    for (let i = 0; i < 10; i++) {
        const clone = card.cloneNode(true)
        clone.style.display = "flex"
        clone.addEventListener("click", updateTask)
        clone.querySelector(".title").textContent += " " + i
        container.appendChild(clone)
    }
}

function updateTask(event) {
    console.log(event.target)
    if (event.target.className != "") {
        openForm(event, "coool")
    }
    
}