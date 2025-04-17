export class Todo {
    constructor({ id, title, description, dueDate, priority, group }) {
        this.id = id ?? Date.now()
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.status = false
        this.group = group ?? "Default"
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
    constructor({ id, name, tasks }) {
        this.id = id ?? Date.now()
        this.name = name
        this.tasks = tasks ?? []
    }

    changeName() {
        this.name = newName
    }
}
