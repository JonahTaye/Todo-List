import { Group } from "./todo"

export const storage = function() {
    const getStoredData = function() {
        const storedData = {...localStorage}
        return storedData
    }

    const getTask = function(id) {
        const storedData = getStoredData()
        const key = id
        for (let data in storedData) {
            const group = JSON.parse(storedData[data])
            for (let task of group.tasks) {
                if(task.id === key) return task
            }
        }
    }

    const getGroup = function(id) {
        let storedData = getStoredData()
        const key = id
        return JSON.parse(storedData[key])
    }

    const getAllGroups = function() {
        const groups = getStoredData()
        const allGroups = {}
        for( let group in groups) {
            allGroups[group] = JSON.parse(groups[group])
        }

        return allGroups
    }

    const updateTask = function(newTask) {
        const storedData = getStoredData()
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

    const updateGroup = function(newGroup) {
        const storedData = getStoredData()
        for (let data in storedData) {
            const oldGroup = JSON.parse(storedData[data])
            if (oldGroup.id === newGroup.id) {
                newGroup.tasks = oldGroup.tasks
                deleteGroup(oldGroup.id)
                setGroup(newGroup)
            }
        }
    }

    const setTask = function(newTask) {
        const key = newTask.group
        const group = getGroup(key)
        group.tasks.push(newTask)
        localStorage.setItem(key, JSON.stringify(group))
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
        const storedData = getStoredData()
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
        const storedData = getStoredData()

        if (Object.keys(storedData).length == 0) {
            const defaultId = 1000000000001
            const defaultName = "Default"
            const defaultGroup = new Group(defaultId, defaultName)
            
            localStorage.setItem(defaultId, JSON.stringify(defaultGroup))
            return defaultId
        }
    }

    return {getTask, getGroup, 
            setTask, setGroup, 
            deleteGroup, deleteTask, 
            updateTask, updateGroup,
            getAllGroups, initialGroup}
}()