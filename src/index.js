import { displayAll, displayCompleted, displayUpcoming, todayDisplay } from "./sidePaneOptions";
import { forms } from "./forms";
import { displayGroup } from "./displayModule";
import { storage } from "./storageManager";
import "./front-page.css"

const today = document.querySelector("#today")
const allTasks = document.querySelector("#all-tasks")
const upcoming = document.querySelector("#upcoming")
const completed = document.querySelector("#completed")
const container = document.querySelector(".card-container")

const options = document.querySelectorAll(".options *")

function clickFunction(event) {
    const allOptions = document.querySelectorAll(".options *")
    let name = event.target.id
    
    allOptions.forEach(option => option.classList.remove("active"))
    const clickedOption = document.querySelector(`#${name}`)
    clickedOption.classList.add("active")
    
    container.innerHTML = ""

    switch(name) {
        case "today":
            todayDisplay()
            break
        case "all-tasks":
            displayAll()
            break
        case "upcoming":
            displayUpcoming()
            break
        case "completed":
            displayCompleted()
            break
    }
}

displayAll()
forms()
storage.initialGroup()
displayGroup()

options.forEach(option => option.addEventListener("click", clickFunction))
