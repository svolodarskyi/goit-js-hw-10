import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.querySelector("input#datetime-picker");
const button = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

button.addEventListener("click", handleStart)
disableElement(button);

function disableElement(...elements) {
    elements.forEach((element) => element.classList.add('disabled'));
}

function enableElement(...elements) {
    elements.forEach((element) => element.classList.remove('disabled'));
}

function validatePickedTime(timestamp) {
    const isFutureDate = timestamp > Date.now();
    if (isFutureDate) {
        enableElement(button);
    } else {
        disableElement(button);
        iziToast.warning({
            message: "Please choose a date in the future",
            position: "topRight"
        });
    }
    return isFutureDate;
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const pickedDateTimestamp = selectedDates[0].getTime();
        validatePickedTime(pickedDateTimestamp);
    }
};

function updateClockFace({ days, hours, minutes, seconds }) {
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
}

class Timer {
    constructor({ onTick, endTime }) {
        this.onTick = onTick;
        this.endTime = endTime;
        this.intervalId = null;
        this.init();
    }   

    init() {
        const remainingTime = this.endTime - Date.now();
        this.onTick(this.convertMs(remainingTime));
    }

    start() {
        disableElement(dateTimePicker, button);
        
        this.intervalId = setInterval(() => {
            const remainingTime = this.endTime - Date.now();

            if (remainingTime <= 0) {
                clearInterval(this.intervalId);
                enableElement(dateTimePicker);
                updateClockFace(this.convertMs(0));
                return;
            }

            this.onTick(this.convertMs(remainingTime));
        }, 1000);
    }

    convertMs(ms) {
        const day = 86400000;
        const hour = 3600000;
        const minute = 60000;
        const second = 1000;

        const days = this.pad(Math.floor(ms / day));
        const hours = this.pad(Math.floor((ms % day) / hour));
        const minutes = this.pad(Math.floor((ms % hour) / minute));
        const seconds = this.pad(Math.floor((ms % minute) / second));

        return { days, hours, minutes, seconds };
    }

    pad(value) {
        return String(value).padStart(2, "0");
    }
}

function handleStart() {
    const selectedTime = dateTimePicker.value ? new Date(dateTimePicker.value).getTime() : null;
    if (selectedTime && validatePickedTime(selectedTime)) {
        const timer = new Timer({ onTick: updateClockFace, endTime: selectedTime });
        timer.start();
    }
}

flatpickr(dateTimePicker, options);
