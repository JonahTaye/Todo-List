const groupBtn = document.querySelector("#group-btn")
const mainBtn = document.querySelector("#main-btn")
const container = document.querySelector(".dialog-container")
const taskDialog = document.querySelector(".task-dialog")
const groupDialog = document.querySelector('.group-dialog')
const taskForm = document.querySelector(".task-dialog > form")

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

function addId (id) {
    const inputExists = taskForm.querySelector("#id")

    if(inputExists) taskForm.removeChild(inputExists)
    
    if(id) {
        const inputId = document.createElement("input")
        inputId.value = id
        inputId.id = "id"
        taskForm.prepend(inputId)
    }
}

export function openForm(event, id) {
    console.log("called")
    const name = event.target.id
    container.style.display = "block"

    generateOptions()
    addId(id)

    if (name === "group-btn") {
        console.log("here")
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

    if (name === "cancel") {
        const dialogs = document.querySelectorAll("dialog")
        dialogs.forEach(dialog => {if(dialog.open) dialog.close()})
        container.style.display = "none"
    } else if (name === "add-btn") {
        addTask()
    }
}





