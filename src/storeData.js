import { storage } from "./storageManager"
import { Todo, Group } from "./todo"
import { displayCard, displayGroup, removeCard, sidePaneDisplay } from "./displayModule"
import { displayAll } from "./sidePaneOptions"

export function addTask(form, values) {
    const formwithId = 6
    
    if (form.length < formwithId) {
        const id = "none"
        values.unshift(id)
        
        const task = new Todo(...values)
        storage.setTask(task)
    } else {
        const task = new Todo(...values)
        storage.updateTask(task)
    }
}

export function addGroup(form, values) {
    const formwithId = 2
    
    if(form.length < formwithId) {
        const id = "none"
        values.unshift(id)
        const group = new Group(...values)
        storage.setGroup(group)
    } else {
        const newGroup = new Group(...values)
        storage.updateGroup(newGroup)
    }
    displayGroup()
}

export function duplicateTask(id) {
    const oldTask = storage.getTask(parseInt(id))
    const formName = document.querySelector("#task-form").className
    console.log("duplicate", oldTask.title.charAt(-1))
    if(oldTask.title.slice(-1) === "I") {
        oldTask.title += "I"
    } else oldTask.title += " I"
    console.log("oldTask", oldTask.title)
    const newTask = new Todo(
        "none",
        oldTask.title,
        oldTask.description,
        oldTask.dueDate,
        oldTask.priority,
        oldTask.group
    )

    storage.setTask(newTask)
    sidePaneDisplay(formName)
}

export function changeStatus(id) {
    let task = storage.getTask(parseInt(id))
    task.status = task.status === true ? false : true
    storage.updateTask(task)
    removeCard(id)
}

export function deleteTask(id) {
    storage.deleteTask(parseInt(id))
    removeCard(id)
}

export function deleteGroup(id) {
    storage.deleteGroup(id)
    displayGroup()
    displayAll()
}