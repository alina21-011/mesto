import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form')
    this._submitBtn = this._formElement.querySelector('.popup__input-save')
  }

  handleConfirmation(removeApi) {
    this._removeCardApi = removeApi;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this._removeCardApi();
    });
  }
}