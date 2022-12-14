const popupProfile = document.querySelector('.popup_edit'); // Фон попап окна
const formProfile = document.querySelector('.popup__form_profile'); // форма)))
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button'); //  Кнопки для показа окна
const buttonClosePopupProfile = document.querySelector('.popup__close'); // Кнопка для скрытия окна
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_data_name');
const infoInput = document.querySelector('.popup__input_data_info');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const buttonClosePopupAdd = document.querySelector('.popup__close_add');
const buttonSubmitPopupAdd = document.querySelector('.popup__input-add');
const placeContainer = document.querySelector('.gallery');
const popupFormCard = document.querySelector('.popup__form_card');
const titleInput = document.querySelector('.popup__input_data_title');
const urlInput = document.querySelector('.popup__input_data_url');
const popupImage = document.querySelector('.popup_open-image');
const cardtemplate = document.querySelector('#card').content.querySelector('.place');
const popupPhoto = document.querySelector('.popup__image');
const popupPhotoTitle = document.querySelector('.popup__image-title');
const buttonClosePopupImage = document.querySelector('.popup__close_image');
const ESC_CODE = 'Escape';

function openPopup(popupElement) {   //общая функция открытия 
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown',  closeByEsc);
  document.addEventListener("click",  closeByOverlay);
}

function closePopup(popupElement) {  //общая функция закрытия 
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown',  closeByEsc);
  document.removeEventListener("click",  closeByOverlay);
}

function submitProfileForm(evt) {  ////попап редактирования профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = infoInput.value;
  closePopup(popupProfile);
};

const handleDeleteCard = (event) =>   //удаляем карточку
  event.target.closest('.place').remove();

const handleLikeCard = (event) =>  //лайкаем карточку 
  event.target.classList.toggle('place__like_active');

const generateCard = (dataCard) => {
  const newCard = cardtemplate.cloneNode(true);
  const title = newCard.querySelector('.place__title');
  const photo = newCard.querySelector('.place__photo');

  const deleteButton = newCard.querySelector('.place__delete');
  deleteButton.addEventListener('click', handleDeleteCard)

  const likeButton = newCard.querySelector('.place__like');
  likeButton.addEventListener('click', handleLikeCard)

  photo.src = dataCard.link;
  title.textContent = dataCard.name;
  photo.alt = dataCard.name;

  photo.addEventListener('click', function () {
    popupPhoto.src = dataCard.link;
    popupPhotoTitle.textContent = dataCard.name;
    popupPhoto.alt = dataCard.name;
    openPopup(popupImage);

  })
  return newCard;
}

//попап добавления
const submitCardForm = (event) => {
  event.preventDefault();
  renderCard({
    name: titleInput.value,
    link: urlInput.value
  })
  closePopup(popupAdd);
}

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
} 

function closeByOverlay(e) {
  if (e.target.classList.contains('popup')) {
    closePopup(e.target);
  }
} 

formProfile.addEventListener('submit', submitProfileForm);

buttonClosePopupProfile.addEventListener('click', function () {
  closePopup(popupProfile);
});

buttonClosePopupAdd.addEventListener('click', function () {
  closePopup(popupAdd);
});

buttonOpenPopupProfile.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  infoInput.value = profileDescription.textContent;
  openPopup(popupProfile);
});



buttonOpenPopupAdd.addEventListener('click', function () {
  popupFormCard.reset();
  openPopup(popupAdd);
  buttonSubmitPopupAdd.disabled = 'disabled';
  buttonSubmitPopupAdd.classList.add('popup__input-save_disabled');
});

popupFormCard.addEventListener('submit', submitCardForm);


buttonSubmitPopupAdd.addEventListener('submit', submitCardForm);


buttonClosePopupImage.addEventListener('click', function () {  //  закрытие попапа с картинкой  
  closePopup(popupImage);
});


const renderCard = (dataCard) => {
  placeContainer.prepend(generateCard(dataCard));
}
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

