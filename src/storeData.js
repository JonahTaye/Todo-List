import { storage } from "./storageManager"
import { Todo, Group } from "./todo"
import { displayCard, displayGroup, removeCard } from "./displayModule"

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