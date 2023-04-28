export default class Card {
  constructor(data, userId, templateSelector, previwCard, { handleLikeClick, handleDeleteBtnClick }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._previwCard = previwCard;
    this._cardId = data._id;
    this._userId = userId;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.place__like');
    this._placePhoto = this._element.querySelector('.place__photo');
    this._likes = data.likes;
    this._counterLikes = this._element.querySelector(".place__like_amount");
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._deleteCardBtn = this._element.querySelector(".place__delete");
    this._ownerId = data.owner._id;
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
  //this._deleteCardBtn.addEventListener("click", this._handleDeleteBtnClick);

    this._placePhoto.addEventListener('click', () => this._previwCard(this._name, this._link));

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._cardId);

      this.toggleLikeColor();
    
    });
    this._deleteCardBtn.addEventListener("click", () => {
     this._handleDeleteBtnClick(this._cardId);
    })
}

deleteCard() {
  this._element.remove();
  this._element = null;
}

  generateCard() {
    this._placePhoto.src = this._link;
    this._element.querySelector('.place__title').textContent = this._name;
    this._placePhoto.alt = this._name;
    this._counterLikes.textContent = this._likes.length;
    if (this._ownerId !== this._userId) {
      this._deleteCardBtn.style.display = "none";
    }
    this.setLikes(this._likes);
    this._setEventListeners();
    return this._element;
  }


  checkAvailabilityLike() {
    return this._likes.find((like) => {
      return like._id === this._userId;
    });
  }

  // Тоггл окрашивания лайка
  toggleLikeColor() {
    if (this.checkAvailabilityLike()) {
      this._addLike();
    } else {
      this._deleteLike();
    }
  }

  // Установить лайк
  setLikes(likesList) {
    this._likes = likesList;
    this._counterLikes.textContent = this._likes.length;
    this.toggleLikeColor();
  }

  //закрасить сердечко
  _addLike() {
    this._likeButton.classList.add('place__like_active');
  }

  //удалить закрашивание сердечка
  _deleteLike() {
    this._likeButton.classList.remove('place__like_active');
  }

  // ID карточки
  getIdCard() {
    return this._cardId;
  }
}

