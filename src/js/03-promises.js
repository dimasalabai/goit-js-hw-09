import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('form.form'),
  inputDelay = document.querySelector('input[name="delay"]'),
  inputStep = document.querySelector('input[name="step"]'),
  inputAmount = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();

  let delay = Number(inputDelay.value);
  let step = Number(inputStep.value);
  let amount = Number(inputAmount.value);

  let position = 0;

  delay = delay - step;

  form.reset();

  for (let i = 0; i < amount; i += 1) {
    position = i + 1;
    delay += step;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
