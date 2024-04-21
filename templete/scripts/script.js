import {imgSources} from "../img/index.js"

const imgArr = Object.values(imgSources)

//Создание контейнера для карточек
const galleryContainer = () => {
    const container = document.createElement("div")
    container.classList.add("galleryContainer")
    return container
}
//Добавление контейнера в боди
document.body.append(galleryContainer())

//Создание карточки
const createCart = (src, className = "imgCart") => {
    const imgCart = document.createElement("img")
    imgCart.src = src
    imgCart.classList.add(className)
    imgCart.classList.add("imgCart")
    return imgCart
}

//добавление карточек
const addImageInContainer = (imgSourcesArr) => {
    const container = document.getElementsByClassName("galleryContainer")[0]

    for (let i = 0; i < imgSourcesArr.length; i++) {
        container?.append(createCart(imgSourcesArr[i],`imgCart${i + 1}`))
    }
}
addImageInContainer(imgArr)


