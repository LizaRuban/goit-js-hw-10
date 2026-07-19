import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        title: 'Success',
        message: value,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error,
      });
    });

  event.target.reset();
}
