 /*const checkEnableValidation = (input, { errorClass, inputErrorClass }) => {
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
} //проверка валидности


const showInputError = (formSelector, inputSelector, errorMessage) => {
  const inputErrorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(config.inputErrorClass);//красное подчеркивание
  inputErrorClass.textContent = errorMessage;
  };

const toggleButtonState = (inputs, button, { inactiveButtonClass }) => {
  const isFormValid = inputs.every(input => input.validity.valid)

  if (isFormValid) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = '';

  } else {
    button.classList.add(inactiveButtonClass);
    button.disabled = 'disabled';
  }
} //кнопка активна неактивна
const enablevalidation = ({ formSelector, inputSelector, submitButtonSelector, ...rest }) => {
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

// показать сообщение об ошибке
  const checkInputValidity = (formSelector, inputSelector) => {
    const inputErrorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    if (!inputSelector.validity.valid) {
      inputSelector.classList.add(config.inputErrorClass);
      inputErrorClass.textContent = inputSelector.validationMessage;
        } else {
          inputSelector.classList.remove(config.inputErrorClass);
          inputErrorClass.textContent = '';
    }
  };
// проверить валидны ли поля инпутов
const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  }); 
};

//активность кнопки
const toggleButtonState = (inputList, submitButtonSelector, config) => {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(config.inactiveButtonClass); 
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector.classList.remove(config.inactiveButtonClass); 
    submitButtonSelector.disabled = false;
  }
};


const setEventListeners = (formSelector, config, submitButtonSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector)); 

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      checkInputValidity(formSelector, inputSelector);
      toggleButtonState(inputList, submitButtonSelector, config); 
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); 

  formList.forEach((formSelector) => {
    const submitButtonSelector = formSelector.querySelector(config.submitButtonSelector);

    setEventListeners(formSelector, config, submitButtonSelector); 
  });
};



 config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__input-save',
  inactiveButtonClass: 'popup__input-save_disabled',
  errorClass: 'popup__error_active',
  inputErrorClass: 'popup__input_type_error',
 };

 enableValidation(config);
*/

export default class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
    this._inputSelector = Array.from(formSelector.querySelectorAll(config.inputSelector));
    this._submitButtonSelector = Array.from(formSelector.querySelector(config.submitButtonSelector));
    this._formSelector = Array.from(formSelector.querySelectorAll(config.formSelector));
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass  = formSelector.querySelector(`.${config.inputSelector.id}-error`);
}


_hideInputError = (inputElement) => {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._config.inputErrorClass);
  errorElement.classList.remove(this._config.errorClass);
  errorElement.textContent = '';
};

_showInputError = (inputElement, errorMessage) => {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._config.inputErrorClass);
  errorElement.classList.add(this._config.errorClass);
  errorElement.textContent = errorMessage;
}

_checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);

  }
}


_checkInputValidity = () => {
  //const inputErrorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  if (!this._inputSelector.validity.valid) {
    this._inputSelector.classList.add(this._inputErrorClass);
    this._inputErrorClass.textContent = this._inputSelector.validationMessage;
      } else {
        this._inputSelector.classList.remove(this._inputErrorClass);
        this._inputErrorClass.textContent = '';
  }
};

_hasInvalidInput = (inputList) => {
  return inputList.some(() => {
    return !this._inputSelector.validity.valid;
  }); 
};


_toggleButtonState = (inputList) => {
  if (this._hasInvalidInput(inputList)) {
    this._submitButtonSelector.classList.add(this._inactiveButtonClass); 
    this._submitButtonSelector.disabled = true;
  } else {
    this._submitButtonSelector.classList.remove(this._inactiveButtonClass); 
    this._submitButtonSelector.disabled = false;
  }
};

_setEventListeners = () => {
  const inputList = Array.from(formSelector.querySelectorAll(this._inputSelector)); 

  inputList.forEach(() => {
    this._inputSelector.addEventListener('input', function () {
      this._checkInputValidity(inputSelector);
     this._toggleButtonState(inputList); 
    });
  });
};

enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(this.formSelector)); 

  formList.forEach(() => {
    this._setEventListeners(); 
  });
};

}