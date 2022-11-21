let popup = document.querySelector('.popup'); // Фон попап окна
let popupForm = document.querySelector('.popup__form'); // форма)))
let openPopupButton = document.querySelector('.profile__edit-button'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.popup__close'); // Кнопка для скрытия окна
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_data_name');
let infoInput = document.querySelector('.popup__input_data_info');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  infoInput.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = infoInput.value;
  closePopup();
};

popupForm.addEventListener('submit', formSubmitHandler);
closePopupButton.addEventListener('click', closePopup);
openPopupButton.addEventListener('click', openPopup);