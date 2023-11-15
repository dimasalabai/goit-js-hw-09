// Описаний в документації
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('input'),
  startBtn: document.querySelector('[data-start]'),
  daysTimer: document.querySelector('span[data-days]'),
  hoursTimer: document.querySelector('span[data-hours]'),
  minutesTimer: document.querySelector('span[data-minutes]'),
  secondsTimer: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      //   alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
      return;
    }
    refs.startBtn.disabled = false;
    refs.startBtn.addEventListener('click', () => {
      timerId = setInterval(() => {
        refs.startBtn.disabled = true;

        const difference = selectedDates[0].getTime() - new Date().getTime();

        if (difference < 1000) {
          clearInterval(timerId);
          refs.secondsTimer.textContent = '00';
          return;
        }
        // Виведення на екран усіх значень часу
        refs.secondsTimer.textContent = addLeadingZero(
          convertMs(difference).seconds
        );
        refs.minutesTimer.textContent = addLeadingZero(
          convertMs(difference).minutes
        );
        refs.hoursTimer.textContent = addLeadingZero(
          convertMs(difference).hours
        );
        refs.daysTimer.textContent = addLeadingZero(convertMs(difference).days);
        //   ========================================================
      }, 1000);
    });
  },
};

flatpickr(refs.input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
