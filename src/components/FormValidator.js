export default class FormValidator {
  
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._submitButtonSelector = formElement.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;

  }


  _checkInputValidity = (inputElement) => {
  
    const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      inputError.textContent = inputElement.validationMessage;
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      inputError.textContent = '';
    }
  };
  

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  disableButton = () => {
    this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = true;
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
        
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

}
