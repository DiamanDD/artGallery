import {imgSources} from "../img/index.js"

const imgArr = Object.values(imgSources)
const cards = document.getElementsByClassName("imgCart")
let globalIndexImage = undefined
const closeModal = overlay => {
    overlay.remove()
    globalIndexImage = undefined
};

const setNextImage = (event, image) => {
    if (event.target.id === "next") {
        globalIndexImage = globalIndexImage + 1
        if (globalIndexImage === imgArr.length) {
            globalIndexImage = 0
        }
        image.src = imgArr[globalIndexImage]

    } else if (event.target.id === "prev") {
        globalIndexImage = globalIndexImage - 1
        if (globalIndexImage < 0) {
            globalIndexImage = imgArr.length - 1
        }
        image.src = imgArr[globalIndexImage]
    }

}
const createOverlay = () => {
    //создаем задний фон для модалки
    const overlay = document.createElement("div")
    overlay.classList.add("modalOverlay")
    return overlay
}


const createModalWindow = (overlay) => {
    //создаем тело модалки
    const modalBody = document.createElement("div")
    modalBody.classList.add("modalBody")

    //создаем кнопку закрытия
    const closeButton = document.createElement("button")
    closeButton.classList.add("closeButton")
    closeButton.id = "closeModalWindowButton"
    closeButton.innerText = "X"
    closeButton.addEventListener("click", () => {
        closeModal(overlay)
    })
    modalBody.append(closeButton)
    return modalBody
}

const addImageInModalBody = (event, modalBody) => {
    const image = document.createElement("img")
    image.src = event.target.src
    image.classList.add("modalBodyImg")
    document.getElementsByClassName("modalBodyImg")[0]?.remove()
    modalBody.append(image)
    return image
}

const openModalWindow = (openEvent, index) => {
    //устанавливаем глобальное значение для перелистывания галереи
    globalIndexImage = index
    const overlay = createOverlay()

    const modalBody = createModalWindow(overlay)

    addImageInModalBody(openEvent, modalBody)

    //Добавляем кнопку перелистывания next
    const nextImageButton = document.createElement("div")
    nextImageButton.id = "next"
    nextImageButton.innerHTML = "&#707;"
    nextImageButton.classList.add("nextImage")
    nextImageButton.addEventListener("click", (event) => setNextImage(event, addImageInModalBody(openEvent, modalBody), index))
    modalBody.append(nextImageButton)

    //Добавляем кнопку перелистывания prev

    const prevImageButton = document.createElement("div")
    prevImageButton.id = "prev"
    prevImageButton.classList.add("prevImage")
    prevImageButton.addEventListener("click", (event) => setNextImage(event, addImageInModalBody(openEvent, modalBody)))
    modalBody.append(prevImageButton)

    //добавляем тело модалки в задий фон
    overlay.append(modalBody)

    //добавляем все вместе в body
    document.body.append(overlay)


}


for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", (event) => openModalWindow(event, i))
}