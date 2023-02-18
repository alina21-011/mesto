export default class Card {
  constructor(data, templateSelector, previwCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.previwCard = previwCard;
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
    this._element.querySelector('.place__like').addEventListener('click', this._likeCard.bind(this));
    this._element.querySelector('.place__photo').addEventListener('click', this.previwCard.bind(this._name, this._link, this._name));

  }

  _likeCard() {
    const likeButton = this._element.querySelector('.place__like')
    likeButton.classList.toggle('place__like_active');
  }
  _deleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.place__photo').src = this._link;
    this._element.querySelector('.place__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

