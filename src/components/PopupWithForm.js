import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSumbit) {
    super(popupSelector)
   
    this._form = this._popupElement.querySelector('.popup__form');
    this._handleSumbit = handleSumbit;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector(".popup__input-save");
    this._submitButtonText = this._submitButton.textContent;
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();

  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();


      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = "Сохранение...";
      this._handleSumbit(this._getInputValues())
      .then(() => this.close())
      .finally(() => {
        this._submitButton.textContent = initialText;
      });
    });

  }
  

}
