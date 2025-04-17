export class Todo {
    constructor( id, title, description, dueDate, priority, group ) {
        this.id = id
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.status = false
        this.group = group ?? "Default"
    }

    set id(value) {
        if(value === "none") this._id = Date.now()
        else this._id = value
    }

    changeContent(task) {
        this.title = task.title
        this.description = task.description
        this.priority = task.priority
        this.dueDate = task.dueDate
        this.status = task.status
        this.group = task.group
    }

    changeStatus() {
        this.status = true
    }
}

export class Group {
    constructor( id, name, tasks ) {
        this.id = id
        this.name = name
        this.tasks = tasks ?? []
    }

    set id(value) {
        if(value === "none") this._id = Date.now()
        else this._id = value 
    }

    changeName() {
        this.name = newName
    }
}
