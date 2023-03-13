import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
constructor(popupSelector) {
  super(popupSelector);
  this._popupPhoto = this._popupElement.querySelector('.popup__image');
  this._popupPhotoTitle = this._popupElement.querySelector('.popup__image-title');

}
open(name, link) {
  this._popupPhoto.src = link;
  this._popupPhotoTitle.textContent = name;
  this._popupPhoto.alt = name;
  super.open();
}
}