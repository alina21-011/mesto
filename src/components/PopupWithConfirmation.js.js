//import  Popup  from './Popup.js'



/*export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector)
    this._handleDeleteCard = handleDeleteCard
    this._formElement = this._popupElement.querySelector('.popup__form')
    this._submitBtn = this._formElement.querySelector('.popup__input-save')
  }

  open(id, cardItem) {
    super.open()
    this._id = id;
    this._card = cardItem;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleDeleteCard(this._id, this._card)
    })
    super.setEventListeners()
  }

  //удалить карточку со страницы
  deleteCard(){
   this._card.remove();
  }
}
*/

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

    this._submitBtn.addEventListener("click", () => {
      this._removeCardApi();
    });
  }
}