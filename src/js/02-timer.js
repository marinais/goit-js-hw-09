import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix'

const inputEl = document.querySelector("#datetime-picker")
const startBtEl = document.querySelector("[data-start]")
const daysEl = document.querySelector("[data-days]")
const hoursEl = document.querySelector("[data-hours]")
const minutesEl = document.querySelector("[data-minutes]")
const secondsEl = document.querySelector("[data-seconds]")

startBtEl.disabled = true


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = Date.now()
        if (selectedDates[0] < currentDate) {
            Notiflix.Notify.failure("Please choose a date in the future")
            // window.alert("Please choose a date in the future")
            return
        };
        
        startBtEl.disabled = false

        function timer() {
            const intervalId = setInterval(() => {
            const finalDate = selectedDates[0].getTime()
            const dateNow = Date.now()
                const deltaTime = finalDate - dateNow
                if (deltaTime <= 100) {
                clearInterval(intervalId)
                return
            }
                 console.log(deltaTime)
                 convertMs(deltaTime)
                // const time = convertMs(deltaTime)
                // timerFace(time)
                startBtEl.disabled = true
                inputEl.disabled = true
            }, 1000)
            if (deltaTime <= 0) {
                clearInterval(intervalId)
                return
            }
           
        }
        startBtEl.addEventListener("click", timer)
  },
};

flatpickr("input#datetime-picker", options)

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    daysEl.textContent = days
    hoursEl.textContent = hours
    minutesEl.textContent = minutes
    secondsEl.textContent = seconds
    
  return { days, hours, minutes, seconds };
}

// function timerFace ({ days, hours, minutes, seconds }) {
//     daysEl.textContent = `${days}`
//     hoursEl.textContent = `${hours}`
//     minutesEl.textContent = `${minutes}`
//     secondsEl.textContent = `${seconds}`
// }



function pad(value) {
    return String(value).padStart(2, "0")
}
