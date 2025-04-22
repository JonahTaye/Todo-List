import { storage } from "./storageManager"
import { openForm } from "./forms"
import { changeStatus, deleteTask } from "./storeData"
import edit from "./edit.png"
import { displayGroupCard } from "./sidePaneOptions"

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

export function removeCard(id) {
    id = parseInt(id)
    const cards = document.querySelectorAll(".card")

    cards.forEach(card => {
        const cardId = parseInt(card.dataset.id)
        console.log(cardId, "id", id)
        if(cardId === id) {
            for (let i = 9; i > -2; i--) {
                let timedelay = 1000 - i*100
                setTimeout(() => {
                    card.style.opacity = `0.${i}`
                    const trash = card.querySelector("img")
                
                    card.style.height = `${i - (card.offsetHeight)}rem`
                    trash.style.height = `0.${i}rem`
                    card.style.padding = `0.${i}rem`
                    card.style.marginBottom = `0.${i}rem`
                    card.style.fontSize = `0.${i}rem`
                    card.style.transition = "opacity ease-out 1s"
                    card.style.transition = "height ease-out 1s"
                    card.style.transition = "font-size ease-out 1s"
                    
                }, timedelay);
            }

            setTimeout(() => {
                card.remove()
            }, 1700);
        }
    })
}

function updateTask(event) {
    const card = event.target.closest(".card")
    const id = event.target.id
    console.log(event.target)
    if (event.target.className != "") {
        openForm(event, card.dataset.id)
    }

    if (id === "status") {
        changeStatus(card.dataset.id)
    } else if(id === "delete") {
        deleteTask(card.dataset.id)
    }
    
}

function clickFunction(event) {
    let name = event.target.id
    if(name != "group-btn") {
        const options = document.querySelectorAll(".options *")
        const id = name.split("_")[1]

        options.forEach(option => option.classList.remove("active"))
        const clickedOption = document.querySelector(`#${name}`)
        clickedOption.classList.add("active")

        displayGroupCard(id)
    }
    console.log("name", name)
    
}

