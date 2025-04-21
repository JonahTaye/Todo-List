import { storage } from "./storageManager"
import { openForm } from "./forms"
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

function clickFunction(event) {
    let name = event.target.id
    console.log(name)
    if(name != "group-btn") {
        const options = document.querySelectorAll(".options *")

        options.forEach(option => option.classList.remove("active"))
        const clickedOption = document.querySelector(`#${name}`)
        clickedOption.classList.add("active")
    }
    
}