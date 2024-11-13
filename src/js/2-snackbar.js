// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const delayInput = document.querySelector('input[name="delay"]');
const button = document.querySelector('button');
const stateSelection = document.querySelectorAll('input[name="state"]');
button.addEventListener('click', handleSubmit);


const makePromise = (delay, shoulResolve) => { 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shoulResolve) {
                resolve(delay)
            } else { 
                reject(delay)
            }
        },delay)
    })
}

function handleSubmit(event) {
    event.preventDefault();
    const state = Array.from(stateSelection).find(option => option.checked).value;
    const delay = delayInput.value;
    
    const shouldResolve = state === 'fulfilled' ? true : false

    makePromise(delay, shouldResolve)
        .then(res =>
                iziToast.success({
                 message: `✅ Fulfilled promise in ${res}ms`,
            position: "topRight"
                }))
         .catch(err =>
                iziToast.error({
                 message: `❌ Rejected promise in ${err}ms`,
            position: "topRight"
                }))
}
