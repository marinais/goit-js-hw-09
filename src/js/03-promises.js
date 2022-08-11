
import Notiflix from 'notiflix'

const formEl = document.querySelector("form")

let currentDelay = 0
let currentStep = 0
let currentAmount = 0

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
}
  
formEl.addEventListener("submit", formOnSubmit)

function formOnSubmit(e) {
  e.preventDefault()
  const {delay, step, amount} = e.target
  currentDelay = Number(delay.value);
  currentStep = Number(step.value);
  currentAmount = Number(amount.value);
 
  for (let i = 1; i <= currentAmount; i += 1){
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    currentDelay += currentStep
  }
}

// const submitBtEl = document.querySelector("button")
// const amountEl = document.querySelector("amount")
// const delayStepEl = document.querySelector("step")
// const delayEl = document.querySelector("delay")

// createPromise()
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });