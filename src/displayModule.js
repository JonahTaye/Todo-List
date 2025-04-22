import { storage } from "./storageManager"
import { openForm } from "./forms"
import { changeStatus } from "./storeData"
import edit from "./edit.png"

export function displayGroup() {
    const options = document.querySelector(".groups.options")
    const groups = storage.getAllGroups()
    const defaultId = 1000000000001
    
    options.innerHTML = ""
    for(let group in groups) {
        let currGroup = groups[group]

        if(currGroup.id === defaultId) continue

        const groupContainer = document.createElement("div")
        const name = document.createElement("div")
        const image = document.createElement("img")
        
        groupContainer.dataset.id = currGroup.id
        groupContainer.id = `group_${currGroup.id}`
        groupContainer.classList.add("group-container")
        
        name.textContent = currGroup.name
        name.classList.add("name")
        name.id = `group_${currGroup.id}`
        
        image.src = edit
        image.classList.add("edit")
        image.id = "group-btn"
        
        image.addEventListener("click", (event) => openForm(event, currGroup.id))
        groupContainer.addEventListener("click", clickFunction)
        
        groupContainer.append(name, image)
        options.appendChild(groupContainer)
    }
}

export function displayCard(tasks) {
    const card = document.querySelector(".card")
    const container = document.querySelector(".card-container")
    
    for (let task of tasks) {
        const clone = card.cloneNode(true)
        clone.style.display = "flex"
        clone.dataset.id = task.id
        clone.addEventListener("click", updateTask)
        
        const title = clone.querySelector(".title")
        title.textContent = task.title
        const description = clone.querySelector(".description")
        description.textContent = task.description
        const date = clone.querySelector(".date")
        date.textContent = task.dueDate
        const checkbox = clone.querySelector("#status")

        switch (task.priority) {
            case 1:
                clone.style.borderLeft = "1rem solid red"
                break
            case 2:
                clone.style.borderLeft = "1rem solid yellow"
                break
            case 3: 
                clone.style.borderLeft = "1rem solid green"
                break
        }

        container.appendChild(clone)
    }
}

function updateTask(event) {
    const card = event.target.closest(".card")
    
    if (event.target.className != "") {
        openForm(event, card.dataset.id)
    }

    if (event.target.id === "status") {
        changeStatus(card.dataset.id)
    }
    
}

function clickFunction(event) {
    let name = event.target.id
    
    if(name != "group-btn") {
        const options = document.querySelectorAll(".options *")

        options.forEach(option => option.classList.remove("active"))
        const clickedOption = document.querySelector(`#${name}`)
        clickedOption.classList.add("active")
    }
}