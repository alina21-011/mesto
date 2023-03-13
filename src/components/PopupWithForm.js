import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSumbit) {
    super(popupSelector)
    this._form = this._popupElement.querySelector('.popup__form');
    this._handleSumbit = handleSumbit;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSumbit(this._getInputValues());
      this.close();
    });

  }

  close() {
    super.close();
    this._form.reset();

  }
}