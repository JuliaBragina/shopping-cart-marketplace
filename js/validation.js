const form = document.querySelector('.main__form');
const formElement = document.querySelector('.customerForm');
const formInput = Array.from(formElement.querySelectorAll('.basketItem__input'));
const button = document.querySelector('.order-details__orderButton');

const showInputError = (element, errorMessage) => {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.add('basketItem__input_type_invalid');
  formError.textContent = errorMessage;
  formError.classList.add('basketItem__inpuError_active');
};

const hideInputError = (element) => {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.remove('basketItem__input_type_invalid');
  formError.classList.remove('basketItem__inpuError_active');
  formError.textContent = '';
};

const isValid = (element) => {
  if (element.validity.valueMissing) {
    showInputError(element, element.getAttribute('data-error-message-required'));
  } else if (!element.validity.valid) {
    showInputError(element, element.getAttribute('data-error-message-format'));
  } else {
    hideInputError(element);
  }
};

button.addEventListener('click', (event) => {
  let hasErrors = false;
  formInput.forEach((element) => {
    element.addEventListener('input', ()=> {
      isValid(element);
    })
    if (!isValid(element)) {
      hasErrors = true;
      event.preventDefault();
    }
  });
  if (hasErrors) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
});