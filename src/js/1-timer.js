import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let selector = document.querySelector('input#datetime-picker');
let button = document.querySelector('button[data-start]');
button.disabled = true;
let days = document.querySelector('span[data-days]');
let hours = document.querySelector('span[data-hours]');
let minutes = document.querySelector('span[data-minutes]');
let seconds = document.querySelector('span[data-seconds]');

let userSelectedDate = new Date();
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

function onClose(selectedDates) {
  userSelectedDate = selectedDates[0];
  const currentDate = new Date();

  if (currentDate >= userSelectedDate) {
    button.disabled = true;
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
  } else {
    button.disabled = false;
  }
}

flatpickr(selector, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

button.addEventListener('click', onClick);

function onClick() {
  button.disabled = true;
  selector.disabled = true;

  timerId = setInterval(() => {
    const currentDate = new Date();
    const ms = userSelectedDate - currentDate;

    if (ms <= 0) {
      clearInterval(timerId);

      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';

      selector.disabled = false;
      button.disabled = false;

      return;
    }

    const { days: d, hours: h, minutes: m, seconds: s } = convertMs(ms);

    days.textContent = addLeadingZero(d);
    hours.textContent = addLeadingZero(h);
    minutes.textContent = addLeadingZero(m);
    seconds.textContent = addLeadingZero(s);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
