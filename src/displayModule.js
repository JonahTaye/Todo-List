import { storage } from "./storageManager"
import { openForm } from "./forms"
import { changeStatus, deleteGroup, deleteTask, duplicateTask } from "./storeData"
import edit from "./edit.png"
import deleteImg from "./trash.png"
import { format, formatRelative, subDays } from "date-fns"
import { displayCardAll, displayCompletedCard, 
        displayUpcomingCard, todayDisplayCard,
        displayGroupCard  } from "./sidePaneOptions"

export function displayGroup() {
    const options = document.querySelector(".groups.options")
    const groups = storage.getAllGroups()
    const defaultId = 1000000000001
    
    options.innerHTML = ""
    for(let group in groups) {
        let currGroup = groups[group]

        if(currGroup.id === defaultId) continue

        const groupContainer = document.createElement("div")
        const leftCont = document.createElement("div")
        const rightCont = document.createElement("div")
        const name = document.createElement("div")
        const image = document.createElement("img")
        const deleteIcon = document.createElement("img")
        
        groupContainer.dataset.id = currGroup.id
        groupContainer.id = `group_${currGroup.id}`
        groupContainer.classList.add("group-container")
        
        name.textContent = currGroup.name
        name.classList.add("name")
        name.id = `group_${currGroup.id}`
        
        image.src = edit
        image.classList.add("edit")
        image.id = "group-btn"

        deleteIcon.src = deleteImg
        deleteIcon.classList.add("delete-group")
        deleteIcon.id = "delete-group"

        leftCont.classList.add("group-left")
        rightCont.classList.add("group-right")
        
        image.addEventListener("click", (event) => openForm(event, currGroup.id))
        groupContainer.addEventListener("click", clickFunction)
        deleteIcon.addEventListener("click", (event) => deleteGroup(currGroup.id))
        
        leftCont.appendChild(name)
        rightCont.append(deleteIcon, image)
        groupContainer.append(leftCont, rightCont)
        options.appendChild(groupContainer)
    }
}

export function sidePaneDisplay(type) {
    switch(type){
            case "today":
                todayDisplayCard()
                break
            case "upcoming":
                displayUpcomingCard()
                break
            case "completed":
                displayCompletedCard()
                break
            case "all-tasks":
                displayCardAll()
                break
            default:
                const selectedGroup = type.split("_")[1]
                displayGroupCard(selectedGroup)
        } 
}

export function displayCard(tasks) {
    const card = document.querySelector(".card")
    const container = document.querySelector(".card-container")
    const defaultId = 1000000000001

    
    for (let task of tasks) {
        const clone = card.cloneNode(true)
        clone.style.display = "flex"
        clone.dataset.id = task.id
        clone.addEventListener("click", updateTask)
        
        const title = clone.querySelector(".card-title")
        title.textContent = task.title
        const description = clone.querySelector(".description")
        description.textContent = task.description
        
        const date = clone.querySelector(".date")
        date.textContent = readableDate(task.dueDate)
        const checkbox = clone.querySelector("#status")
        
        const group = clone.querySelector(".group-name")
        const taskGroup = storage.getGroup(task.group)
        if(task.group === defaultId) {
            group.textContent = "Inbox"
            group.style.backgroundColor = taskGroup.color
        } else {
            console.log("taskid", task.id)
            group.textContent = taskGroup.name
            group.style.backgroundColor = taskGroup.color
        }


        switch (task.priority) {
            case 1:
                clone.style.borderLeft = "1rem solid rgb(182, 2, 5)"
                break
            case 2:
                clone.style.borderLeft = "1rem solid rgb(243, 61, 64)"
                break
            case 3: 
                clone.style.borderLeft = "1rem solid #ee7272"
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
        
        if(cardId === id) {
            const totalDuration = 800
            const steps = 20
            const interval = totalDuration / steps
            let step = 0

            const startHeight = card.offsetHeight
            const trash = card.querySelector("img#delete")
            const duplicate = card.querySelector("img#duplicate")

            const animation = setInterval(() => {
                step++

                const progress = step / steps
                const ease = 1 - (1 - progress) ** 2

                card.style.opacity = 1 - ease
                card.style.height = `${startHeight * (1 - ease)}px`
                card.style.padding = `${1 - ease}rem`
                card.style.marginBottom = `${0.5 * (1 - ease)}rem`
                card.style.fontSize = `${1 - ease}rem`
                trash.style.height = `${1 - ease}rem`
                duplicate.style.height = `${1 - ease}rem`

                card.style.overflow = "hidden"
                card.style.transition = "none"

                if (step >= steps) {
                clearInterval(animation)
                card.remove()
                }
            }, interval)
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
    } else if(id === "duplicate") {
        duplicateTask(card.dataset.id)
    }
    
}

function clickFunction(event) {
    let name = event.target.id
    let classname = event.target.className
    console.log("classname ", classname)
    if(name != "group-btn" && classname != "delete-group") {
        const options = document.querySelectorAll(".options *")
        const id = name.split("_")[1]

        options.forEach(option => option.classList.remove("active"))
        const clickedOption = document.querySelector(`#${name}`)
        clickedOption.classList.add("active")

        displayGroupCard(id)
    }    
}

function readableDate(date) {
    const dateObj = new Date(date)
    const today = new Date()
    let formatedDate = formatRelative(dateObj, today)
    
    if(formatedDate.includes("/")) {
        formatedDate = format(new Date(date), "MMM dd, yyyy")
    } else {
        formatedDate = formatedDate.split("at")[0]
        formatedDate = formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1)
    }
    return formatedDate
}

