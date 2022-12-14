const checkEnableValidation = (input, {errorClass, inputErrorClass}) => {
  const inputName = input.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);
  if (input.validity.valid) {
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
  }
  else {
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
    input.classList.add(inputErrorClass);
  }
}

const toggleButtonState = (inputs,button, {inactiveButtonClass})  => {
  const isFormValid = inputs.every(input => input.validity.valid)

    if(isFormValid) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = '';

    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = 'disabled';
    }
}
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault()
    })

    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkEnableValidation(input, rest);
        toggleButtonState(inputs, button, rest);
      })
    })
  })
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__input-save',
  inactiveButtonClass: 'popup__input-save_disabled',
  errorClass: 'popup__error_active',
  inputErrorClass: 'popup__input_type_error',
});

