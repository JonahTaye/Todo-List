import { todayDisplay } from "./today";
import { forms } from "./forms";
import "./front-page.css"

const today = document.querySelector("#today")
const allTasks = document.querySelector("#all-tasks")
const upcoming = document.querySelector("#upcoming")
const completed = document.querySelector("#completed")
const container = document.querySelector(".card-container")

const options = document.querySelectorAll(".options *")

function clickFunction(event) {
    let name = event.target.id
    options.forEach(option => option.classList.remove("active"))
    container.innerHTML = ""

    switch(name) {
        case "today":
            todayDisplay()
            today.classList.add("active")
            break
        case "all-tasks":
            allTasks.classList.add("active")
            break
        case "upcoming":
            upcoming.classList.add("active")
            break
        case "completed":
            completed.classList.add("active")
            break
    }
}

forms()
console.log("back")

options.forEach(option => option.addEventListener("click", clickFunction))
