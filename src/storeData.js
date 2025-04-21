import { storage } from "./storageManager"
import { Todo, Group } from "./todo"
import { displayGroup } from "./displayModule"

export function addTask(form, values) {
    const formwithId = 6

    if (form.length < formwithId) {
        const id = "none"
        values.unshift(id)
        const task = new Todo(...values)
        console.log(task)
        
        storage.setTask(task)
    } else {
        const task = new Todo(...values)
        console.log(task)
    }
}

export function addGroup(values) {
    const group = new Group(...values)
    
    storage.setGroup(group)
    displayGroup()
}