import { addGroup, addTask } from "./storeData"

const groupBtn = document.querySelector("#group-btn")
const mainBtn = document.querySelector("#main-btn")
const container = document.querySelector(".dialog-container")
const taskDialog = document.querySelector(".task-dialog")
const groupDialog = document.querySelector('.group-dialog')
const taskForm = document.querySelector("#task-form")
const groupForm = document.querySelector("#group-form")

export const forms = function () {
    const formsList = document.querySelectorAll("form")
    const hasId = null

    formsList.forEach(form => form.addEventListener("submit", submitForm))
    groupBtn.addEventListener("click", (event) => openForm(event, hasId))
    mainBtn.addEventListener("click", (event) => openForm(event, hasId))
    container.addEventListener("click", closeForm)
}

function generateOptions() {
    const lists = ["Get to Work", "Learn New Things", "Today"]
    const select = document.querySelector("#group")
    
    for (let list in lists) {
        const option = document.createElement("option")
        option.textContent = lists[list]
        option.value = list
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
        
        if(event.target.id === "group-btn") groupForm.prepend(inputId)
        else taskForm.prepend(inputId)
       
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
    const name = event.target.tagName
    if (name == "DIALOG") {
        const openDialog = event.target.className
        const dialog = document.querySelector(`.${openDialog}`)
        container.style.display = "none"
        dialog.close()
    }
    
}

function submitForm(event) {
    event.preventDefault()
    const name = event.submitter.className
    const formType = event.submitter.id
    const dialogs = document.querySelectorAll("dialog")

    if (name === "add-btn") {
        save(formType)
    }

   
    dialogs.forEach(dialog => {if(dialog.open) dialog.close()})
    container.style.display = "none"
}

function save(formType) {
    let form = []
    let values = []

    if(formType === "task") {
        const inputs = taskForm.querySelectorAll("input")
        const selects = taskForm.querySelectorAll("select")
        form = [...inputs, ...selects]
        form.forEach(v => values.push(v.value))
        addTask(form, values)
    } else {
        const input = groupForm.querySelector("input")
        values = ["none", input.value]
        addGroup(values)
    }

}



