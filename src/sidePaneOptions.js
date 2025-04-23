import { displayCard } from "./displayModule"
import { storage } from "./storageManager"

const header = document.querySelector(".content > .title")
const formTask = document.querySelector("#task-form")

export const todayDisplay = function() {
    header.textContent = "Today"
    formTask.className = ""
    formTask.classList.add("today")

    
    todayDisplayCard()
}

export function displayUpcoming() {
    header.textContent = "Upcoming"
    formTask.className = ""
    formTask.classList.add("upcoming")

    displayUpcomingCard()
}

export function displayCompleted() {
    header.textContent = "Completed"
    formTask.className = ""
    formTask.classList.add("completed")

    displayCompletedCard()
}

export function displayAll() {
    header.textContent = "Inbox"
    formTask.className = ""
    formTask.classList.add("all-tasks")

    
    displayCardAll()
}

export function todayDisplayCard() {
    const container = document.querySelector(".card-container")
    const groups = storage.getAllGroups()
    const tasks = []
    let today = new Date
    today = today.toISOString().split("T")[0]
    
    container.innerHTML = ""
    for(let group in groups) {
        for (let task of groups[group].tasks) {
            if(task.dueDate === today && task.status != true) {
                tasks.push(task)
            }
        }
    }
    tasks.sort((task1, task2) => task1.priority - task2.priority)
    displayCard(tasks)
}

export function displayCardAll() {
    const defaultId = 1000000000001
    const container = document.querySelector(".card-container")
    try {
        const defaultGroup = storage.getGroup(defaultId)
        const tasks = []

        container.innerHTML = ""
        for (let task of defaultGroup.tasks) {
            if(task.status != true) tasks.push(task)
        }

        tasks.sort((task1, task2) => task1.priority - task2.priority)
        displayCard(tasks)
    } catch (error) {
        
    }

}

export function displayCompletedCard() {
    const container = document.querySelector(".card-container")
    const groups = storage.getAllGroups()
    const completed = []

    container.innerHTML = ""
    for(let group in groups) {
        for (let task of groups[group].tasks) {
            if(task.status === true) {
                completed.push(task)
            }
        }
    }

    completed.sort((task1, task2) => task1.priority - task2.priority)
    displayCard(completed)
}

export function displayUpcomingCard() {
    const container = document.querySelector(".card-container")
    const groups = storage.getAllGroups()
    const tasks = []
    let today = new Date()

    
    container.innerHTML = ""
    for(let group in groups) {
        for (let task of groups[group].tasks) {
            let date = new Date(task.dueDate)
            
            if(date > today && task.status != true) {
                tasks.push(task)
            }
        }
    }
    tasks.sort((task1, task2) => task1.priority - task2.priority)
    displayCard(tasks)
}

export function displayGroupCard(id) {
    formTask.className = ""
    formTask.classList.add(`group_${id}`)
    console.log("Group id", id)
    const container = document.querySelector(".card-container")
    try {
        const groupItems = storage.getGroup(parseInt(id))

        let tasks = []

        header.textContent = groupItems.name
        tasks = groupItems.tasks
        
        container.innerHTML = ""
        tasks.sort((task1, task2) => task1.priority - task2.priority)
        
        displayCard(tasks)
    } catch (error) {
        displayAll()
    }
    
    
}