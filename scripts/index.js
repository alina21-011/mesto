const popup = document.querySelector('.popup'); // Фон попап окна
const popupForm = document.querySelector('.popup__form'); // форма)))
const openPopupButton = document.querySelector('.profile__edit-button'); // Кнопки для показа окна
const closePopupButton = document.querySelector('.popup__close'); // Кнопка для скрытия окна
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_data_name');
const infoInput = document.querySelector('.popup__input_data_info');
const todoLikeButton = document.querySelector('.place__like');
const addPopupButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const closePopupAddButton = document.querySelector('.popup__close_add');
const popupInputAdd = document.querySelector('.popup__input-add');
const closePopupImageButton = document.querySelector('.popup__close_image');

function openPopup(popupElement) {   //общая функция открытия 
  popupElement.classList.add('popup_opened');
}


function closePopup(popupElement) {  //общая функция закрытия 
  popupElement.classList.remove('popup_opened');
}

//попап редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = infoInput.value;
  closePopup(popup);
};


//слушатели попапа редактирования и добавления 
popupForm.addEventListener('submit', formSubmitHandler);

closePopupButton.addEventListener('click', function () {
  closePopup(popup);
});
closePopupAddButton.addEventListener('click', function () {
  closePopup(popupAdd);
});
openPopupButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  infoInput.value = profileDescription.textContent;
  openPopup(popup);
});

addPopupButton.addEventListener('click', function () {
  openPopup(popupAdd);
});




const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];


const placeContainer = document.querySelector('.gallery');
const popupFormCard = document.querySelector('.popup__form_card');
const titleInput = document.querySelector('.popup__input_data_title');
const urlInput = document.querySelector('.popup__input_data_url');
const popupImage = document.querySelector('.popup_zoom-image');
const cardtemplate = document.querySelector('#card').content.querySelector('.place');
const popupPhoto = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

const handleDeleteCard = (event) =>   //удаляем карточку
  event.target.closest('.place').remove();

const handleLikeCard = (event) =>  //лайкаем карточку 
  event.target.classList.toggle('place__like_active');


// создаем карточку
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
  closePopup(popupAdd);

  photo.addEventListener('click', function () {
    popupPhoto.src = dataCard.link;
    popupImageTitle.textContent = dataCard.name;
    openPopup(popupImage);
  })
  return newCard;
}


//попап добавления
const handleFormSubmit = (event) => {
  event.preventDefault();
  renderCard({
    name: titleInput.value,
    link: urlInput.value
  })
  titleInput.value = '';
  urlInput.value = '';
}

popupFormCard.addEventListener('submit', handleFormSubmit);


// добавление карточки
const renderCard = (dataCard) => {
  placeContainer.prepend(generateCard(dataCard));

}

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
})

popupInputAdd.addEventListener('submit', handleFormSubmit); // добавление новой карточки
closePopupImageButton.addEventListener('click', function () {  //  закрытие попапа с картинкой 
  closePopup(popupImage);
});
