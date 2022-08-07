const startButtonEl = document.querySelector("[data-start]")
const stopButtonEl = document.querySelector("[data-stop]")

let timerId = null

startButtonEl.addEventListener("click", () => {
    timerId = setInterval(bodyColor, 1000),
    document.querySelector("[data-start]").disabled = true
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function bodyColor() {
    document.body.style.backgroundColor = getRandomHexColor()
    
}

stopButtonEl.addEventListener("click", stopEventListener)


function stopEventListener() {
    clearInterval(timerId)
    startButtonEl.removeEventListener("click", bodyColor),
    document.querySelector("[data-start]").disabled = false
}
