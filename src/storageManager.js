import { Group } from "./todo"

export const storage = function() {
    const storedData = {...localStorage}

    const getTask = function(id) {
        const key = id
        for (let data in storedData) {
            const group = JSON.parse(storedData[data])
            for (let task of group.tasks) {
                if(task.id === key) return task
            }
        }
    }

    const getGroup = function(id) {
        const key = id
        return JSON.parse(storedData[key])
    }

    const updateTask = function(newTask) {
        for (let data in storedData) {
            const group = JSON.parse(storedData[data])
            
            for (let oldTask of group.tasks) {
                if(oldTask.id === newTask.id) {
                    deleteTask(oldTask.id)
                    setTask(newTask)
                }
            }
        }
    }
    const setTask = function(newTask) {
        const key = newTask.group
        const group = JSON.parse(storedData[key])
        const exists = group.tasks.some(oldTask => oldTask.id === newTask.id)
        
        if (exists) return
        else {
            group.tasks.push(newTask)
            localStorage.setItem(key, JSON.stringify(group))
        }
    }

    const setGroup = function(group) {
        const key = group.id
        localStorage.setItem(key, JSON.stringify(group))
    }

    const deleteGroup = function(id) {
        const key = id
        localStorage.removeItem(key)
    }

    const deleteTask = function(id) {
        const key = id
        
        for (let data in storedData) {
            const group = JSON.parse(storedData[data])
            
            for (let task of group.tasks) {
                if(task.id === key) {
                    const index = group.tasks.indexOf(task)
                    group.tasks.splice(index, 1)
                    
                    localStorage.setItem(group.id, JSON.stringify(group))
                }
            }
        }

    }

    const initialGroup = function() {
        const defaultGroup = new Group(1000000000001, "Default")
        localStorage.setItem(defaultGroup.id, JSON.stringify(defaultGroup))
    }

    return {getTask, getGroup, 
            setTask, setGroup, 
            deleteGroup, deleteTask, 
            updateTask, }
}()