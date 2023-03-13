export default class Card {
  constructor(data, templateSelector, previwCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.previwCard = previwCard;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.place__like');
    this._placePhoto = this._element.querySelector('.place__photo');
  }
 
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);


    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.place__delete').addEventListener('click', this._deleteCard.bind(this));
    this._likeButton.addEventListener('click', this._likeCard.bind(this));
    this._placePhoto.addEventListener('click', () => this.previwCard(this._name, this._link));


  }

  _likeCard() {
    this._likeButton.classList.toggle('place__like_active');
  }
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._placePhoto.src = this._link;
    this._element.querySelector('.place__title').textContent = this._name;
    this._placePhoto.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
