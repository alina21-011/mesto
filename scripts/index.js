const popup = document.querySelector('.popup_edit'); // Фон попап окна
const popupForm = document.querySelector('.popup__form'); // форма)))
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

function openPopup(popupElement) {   //общая функция открытия 
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {  //общая функция закрытия 
  popupElement.classList.remove('popup_opened');
}

function submitFormHandler(evt) {  ////попап редактирования профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = infoInput.value;
  closePopup(popup);
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
const handleFormSubmit = (event) => {
  event.preventDefault();
  renderCard({
    name: titleInput.value,
    link: urlInput.value
  })
  closePopup(popupAdd);
}

document.addEventListener("keydown", (e) => {
  if (document.querySelector('.popup_opened') && e.code === "Escape") {
    closePopup(document.querySelector('.popup_opened'))
    } 
})

popupForm.addEventListener('submit', submitFormHandler);

buttonClosePopupProfile.addEventListener('click', function () {
  closePopup(popup);
});

buttonClosePopupAdd.addEventListener('click', function () {
  closePopup(popupAdd);
});

buttonOpenPopupProfile.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  infoInput.value = profileDescription.textContent;
  openPopup(popup);
});



buttonOpenPopupAdd.addEventListener('click', function () {
  popupFormCard.reset();
  openPopup(popupAdd);
  buttonSubmitPopupAdd.disabled = 'disabled';
  buttonSubmitPopupAdd.classList.add('popup__input-save_disabled');
});

popupFormCard.addEventListener('submit', handleFormSubmit);


buttonSubmitPopupAdd.addEventListener('submit', handleFormSubmit);


buttonClosePopupImage.addEventListener('click', function () {  //  закрытие попапа с картинкой  
  closePopup(popupImage);
});

document.addEventListener("click", (e) => {  
  if (e.target.classList.contains('popup')) {     
    closePopup(e.target);
   } 
});

const renderCard = (dataCard) => {
  placeContainer.prepend(generateCard(dataCard));
}
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

const checkEnableValidation = (input, {errorClass, inputErrorClass}) => {
  const inputName = input.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);
  if (input.validity.valid) {
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
  }
  else {
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
    input.classList.add(inputErrorClass);
  }
}

const changeButton = (inputs,button, {inactiveButtonClass})  => {
  const isFormValid = inputs.every(input => input.validity.valid)

    if(isFormValid) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = '';

    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = 'disabled';
    }
}
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault()
    })

    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkEnableValidation(input, rest);
        changeButton(inputs, button, rest);
      })
    })
  })
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__input-save',
  inactiveButtonClass: 'popup__input-save_disabled',
  errorClass: 'popup__error_active',
  inputErrorClass: 'popup__input_type_error',
});

