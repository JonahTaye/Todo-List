import { displayCard } from "./displayModule"
import { StorageManager } from "./storageManager"
import { openForm } from "./forms"

export const todayDisplay = function() {
    const header = document.querySelector(".content > .title")
    header.textContent = "Today"
    const card = document.querySelector(".card")
    const container = document.querySelector(".card-container")

    displayCard()
}
