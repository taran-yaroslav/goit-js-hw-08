// Імпорт  throttle
import throttle from 'lodash.throttle';

// Створюємо ключ для зберігання даних у сховищі
const STORAGE_KEY = 'feedback-form-state';

// Створюємо селектори для відстеження DOM
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

// Додаємо слухачів подій
refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

insertFormValue();

// Створюємо об'єкт для зберігання даних у сховищі
const formValue = {
  email: refs.input.value,
  message: refs.textarea.value,
};

// Функція для збереження даних у сховищі при вводі
function onInput(evt) {
  formValue[evt.target.name] = evt.target.value;
  const formValueJSON = JSON.stringify(formValue);
  localStorage.setItem(STORAGE_KEY, formValueJSON);
}

// Функція для відображення даних зі сховища при перезавантаженні сторінки
function insertFormValue() {
  const value = localStorage.getItem(STORAGE_KEY);
  if (value) {
    const formValueJSON = JSON.parse(value);
    const { email = '', message = '' } = formValueJSON;
    refs.input.value = email;
    refs.textarea.value = message;
  }
}

// Функція для очищення сховища при Submit
function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
