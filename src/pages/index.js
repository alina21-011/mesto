import Popup from '../components/Popup.js';
import Card from '../components/Card.js';
import {initialCards} from "../utils/cards.js";
import FormValidator from '../components/FormValidator.js'
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css'; 

import {
  buttonOpenPopupProfile,
  formProfile,
  nameInput,
  infoInput,
  buttonOpenPopupAdd,
  popupFormCard,
  config
}
from "../utils/constants.js";

const section = new Section({ items: initialCards, renderer: (data) => createCard(data) }, '.gallery');
const popupProfile = new PopupWithForm('.popup_edit', submitEditProfileForm);
popupProfile.setEventListeners();
const popupWithImage = new PopupWithImage('.popup_photo');
popupWithImage.setEventListeners();
const popupCards = new PopupWithForm('.popup_add', handleFormCardSubmit);
popupCards.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__description');

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

buttonOpenPopupProfile.addEventListener('click', () => {
  popupProfile.open();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name
  infoInput.value = info.info
});

function submitEditProfileForm(data) {
  userInfo.setUserInfo(data);
}

buttonOpenPopupAdd.addEventListener('click', () => {
  popupCards.open();
  popupFormCard.reset();
})


const validatorAddCard = new FormValidator(config, popupFormCard);
const validatorProfile = new FormValidator(config, formProfile);

validatorAddCard.enableValidation();
validatorProfile.enableValidation();

const createCard = (data) => {
  const card = new Card(data, '#card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleFormCardSubmit(card) {
  section.addItem(createCard(card));
}

section.renderItems();