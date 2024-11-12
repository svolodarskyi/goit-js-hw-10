import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.querySelector("input#datetime-picker");
const button = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours= document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = null;

button.addEventListener('click', handleStart);

function disableElement(...elements) {
    elements.forEach((element) => element.classList.add('disabled'));
}


function enableElement(...elements) {
    elements.forEach((element) => element.classList.remove('disabled'));
}

function getTimestamp(date) {
    const dateObj = new Date(date);
    return dateObj.getTime();
}

function getTimestampDifference(timestamp) {
    const currentTime = Date.now();
    return timestamp - currentTime;
}

function checkPickedTimevalidity(timestamp) {
    const currentTime = Date.now();
    if(currentTime < timestamp){
        return true
    }
    return false;
}

function validatePickedTime(timestamp = getTimestamp(dateTimePicker.value)) {
    if (!checkPickedTimevalidity(timestamp)) {
        disableElement(button);
        iziToast.warning({
            message: "Please choose a date in the future",
            position: "topRight"
        });
        return false
    }
    else {
        enableElement(button);
        return true
    }
}



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const pickedDateTimestamp = getTimestamp(selectedDates[0])
        validatePickedTime(pickedDateTimestamp)
  },
};

function updateClockFace({ days, hours, minutes, seconds }) {
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
}

class Timer{
    constructor({onTick, startTime}){
        this.onTick = onTick;
        this.startTime = startTime;
        this.intervalId = null;
        this.timerInitTime = null;
        this.init();
    }

    init() {
        this.timerInitTime = getTimestampDifference(this.startTime);
        this.onTick(this.convertMs(this.timerInitTime));
    }

    start() {
        disableElement(dateTimePicker, button);
        let elapsedTime = 0;
        
        this.intervalId = setInterval(() => {
            elapsedTime += 1000;
            if (elapsedTime <= this.timerInitTime) {
                this.onTick(this.convertMs(this.timerInitTime - elapsedTime));
            }
            else {
                clearInterval(this.intervalId)
                enableElement(dateTimePicker)
            }
        },1000)
    }

    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = this.pad(Math.floor(ms / day));
        // Remaining hours
        const hours = this.pad(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    };

    pad(val) {
        return String(val).padStart(2,"0");
    };
}

function handleStart(event) {
    if (validatePickedTime()) {
        const timer = new Timer({ onTick: updateClockFace, startTime: getTimestamp(dateTimePicker.value) });    
        timer.start();
    }
    
    
}



flatpickr(dateTimePicker, options);
