import { addGroup, addTask } from "./storeData"
import { storage } from "./storageManager"
import { displayCardAll, displayCompletedCard, displayUpcomingCard, todayDisplayCard } from "./today"

const groupBtn = document.querySelector("#group-btn")
const mainBtn = document.querySelector("#main-btn")
const container = document.querySelector(".dialog-container")
const taskDialog = document.querySelector(".task-dialog")
const groupDialog = document.querySelector('.group-dialog')
const taskForm = document.querySelector("#task-form")
const groupForm = document.querySelector("#group-form")

export const forms = function () {
    const formsList = document.querySelectorAll("form")
    const cancel = document.querySelector(".cancel")
    const hasId = null

    formsList.forEach(form => form.addEventListener("submit", submitForm))
    groupBtn.addEventListener("click", (event) => openForm(event, hasId))
    mainBtn.addEventListener("click", (event) => openForm(event, hasId))
    container.addEventListener("click", closeForm)
    cancel.addEventListener("click", closeForm)
}

function generateOptions() {
    const groups = storage.getAllGroups()
    const select = document.querySelector("#group")
    const defaultId = 1000000000001
    
    select.innerHTML = ""
    for (let group in groups) {

        let currGroup = groups[group]
        const option = document.createElement("option")
        
        if(currGroup.id === defaultId) {
            option.textContent = "Today"
            option.selected = true
        }
        else option.textContent = currGroup.name
        
        option.value = currGroup.id
        select.appendChild(option)
    }
}

function addId (event, id) {
    const inputExists = taskForm.querySelector("#id")
    const groupExists = groupForm.querySelector("#id")
    

    if(inputExists) {
        taskForm.removeChild(inputExists)
    } else if(groupExists) {
        groupForm.removeChild(groupExists)
    }
    
    if(id) {
        const inputId = document.createElement("input")
        inputId.value = id
        inputId.id = "id"
        inputId.style.display = "none"
        
        if(event.target.id === "group-btn") {
            groupForm.prepend(inputId)
            loadGroup()
        } else {
            taskForm.prepend(inputId)
            loadTask()
        }
    }

    editForm(id)
}

function editForm(id) {
    const forms = document.querySelectorAll("form")
    forms.forEach(form => {
        const button = form.querySelector(".add-btn") 
        if(id) button.textContent = "Edit"
        else button.textContent = "Add"
    })  
}

export function openForm(event, id) {
    const name = event.target.id
    container.style.display = "block"
    
    generateOptions()
    addId(event, id)

    if (name === "group-btn") {
        groupDialog.showModal()
    } else {
        taskDialog.showModal()
    }
}

export function closeForm(event) {
    const closeWhen = ["task-dialog", "group-dialog", "cancel", "close-submit"]
    let name = ""
    
    try {
        name = event.target.className
    } catch (error) {
        name = "close-submit"
    }

    if(closeWhen.includes(name)) {
        const dialogs = document.querySelectorAll("dialog")
        container.style.display = "none"
        
        dialogs.forEach(dialog => {
            if(dialog.open) {
                const form = dialog.querySelector("form")
                form.reset()
                dialog.close()        
            }
        })
    }
}

function submitForm(event) {
    event.preventDefault()
    const formType = event.submitter.id
    const formName = document.querySelector("form").className
    save(formType, formName)
    closeForm(null)
}

function save(formType, formName) {
    let form = []
    let values = []
    if(formType === "task") {
        const inputs = taskForm.querySelectorAll("input")
        const selects = taskForm.querySelectorAll("select")
        form = [...inputs, ...selects]
        console.log(inputs)
        for (let input of inputs) {
            console.log("form values ", input.value)
        }
        form.forEach(v => {
            console.log("value", v.value)
            if(!isNaN(v.value)) {
                const convertValue = parseInt(v.value)
                values.push(convertValue)
            } else values.push(v.value)
        })
        addTask(form, values)
    } else {
        const input = groupForm.querySelectorAll("input")
        
        input.forEach(v => {
            if(!isNaN(v.value)) {
                const convertValue = parseInt(v.value)
                values.push(convertValue)
            } else values.push(v.value)
        })
        
        addGroup(input, values)
    }

    switch(formName){
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
    } 

}

function loadGroup() {
    const id = groupForm.querySelector("#id").value
    const group = storage.getGroup(parseInt(id))
    const input = groupForm.querySelector("#name")

    input.value = group.name
}

function loadTask() {
    const id = taskForm.querySelector("#id").value
    const task = storage.getTask(parseInt(id))
    const inputs = taskForm.querySelectorAll("input")
    const selects = taskForm.querySelectorAll("select")
    console.log("loadtask called")
    let inputIndex = 0
    let selectIndex = 0 
    for(let value in task) {
        if(inputIndex > 3 && value != "status") {
            selects[selectIndex].value = task[value]
            selectIndex++
        } else if (inputIndex <= 3) {
            inputs[inputIndex].value = task[value]
            inputIndex++
        }

    }

}



