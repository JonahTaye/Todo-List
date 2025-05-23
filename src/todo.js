export class Todo {
    constructor( id, title, description, dueDate, priority, group ) {
        this.taskId = id
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.status = false
        this.group = group ?? "Default"
    }

    set taskId(value) {
        if(value === "none") this.id = Date.now()
        else this.id = value
    }

    get taskId() {
        return this.id
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
        this.groupId = id
        this.name = name
        this.color = this.generateColor()
        this.tasks = tasks ?? []
    }

    set groupId(value) {
        if(value === "none") this.id = Date.now()
        else this.id = value 
    }

    get groupId() {
        return this.id
    }

    generateColor() {
        const colors = ["#8B0000", "#B22222", "#CD5C5C", "#E9967A", "#FA8072"]
        return colors[Math.floor(Math.random() * colors.length)];
    }

    changeName() {
        this.name = newName
    }
}
