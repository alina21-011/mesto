import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Popup } from "../components/Popup.js";
import Api from "../components/Api.js";
import "./index.css";

const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия попапа редаактирования профиля
const popup = document.querySelector(".popup");
const popupName = document.querySelector(".popup__input_type_name");
const popupProfession = document.querySelector(".popup__input_type_profession");
const popupSave = document.querySelector(".popup__submit-popup-btn"); //кнопка сохранить
const profName = document.querySelector(".profile__name");
const profProfession = document.querySelector(".profile__profession");
const popupForm = document.querySelector(".popup__form");
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия попапа добавления карточки
const elemTitle = document.querySelector(".element__title");
const elemPicture = document.querySelector(".element__picture");
const popupTitle = document.querySelector(".popup__input_type_title");
const popupPicture = document.querySelector(".popup__input_type_picture");
const editPopup = document.querySelector(".popup_type_edit"); //попап редактирования профиля
const addPopup = document.querySelector(".popup_type_add"); //попап добавления новой карточки

const popupFormEdit = document.querySelector(".popup__form_edit");
const popupFormAdd = document.querySelector(".popup__form_add");
const popupImage = document.querySelector(".popup_photo"); //попап увеличенного фото
const cardLists = document.querySelector(".elements");

const popupCloseButtons = document.querySelectorAll(".popup__close"); //крестик закрытия попапа
const imageElem = document.querySelector(".element__picture");
const titleElem = document.querySelector(".element__title");
const imgPopup = document.querySelector(".popup__image"); //увеличенное фото
const titlePopup = document.querySelector(".popup__photo-title"); //подпись под увеличенным фото

//селекторы
const cardList = ".elements";
const popupImageSelector = "#popup_photo";
const cardTemplateSelector = "#element__card";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-popup-btn",
  inactiveButtonClass: "popup__submit-popup-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
const popupEditAvatarSelector = "#popup__avatar";
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const popupEditAvatar = document.querySelector(popupEditAvatarSelector);
const popupFormEditAvatar = popupEditAvatar.querySelector("#form__avatar");

const popupInputLinkAvatar =
  popupEditAvatar.querySelector(".popup__input_link");
const profileSelector = {
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__profession",
  avatarInfoSelector: ".profile__avatar",
};
const profileName = document.querySelector(profileSelector.userNameSelector);
const profileOccupation = document.querySelector(
  profileSelector.userInfoSelector
);
const profileAvatar = document.querySelector(
  profileSelector.avatarInfoSelector
);

/// Получение данных с сервера
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "b975e0db-5f1c-4fce-81c7-76258185d015",
    "Content-Type": "application/json",
  },
});

let userId = null;
//добавление всех карточек
const cardElementList = new Section(
  {
    renderer: (item) => {
      cardElementList.addItem(createNewCard(item));
    },
  },
  cardList
);
const renderInitialCards = (cards) => {
  cardElementList.renderItems(cards);
};

// Создание новой карточки
const popupWithBigImage = new PopupWithImage(popupImageSelector);
popupWithBigImage.setEventListeners();

const createNewCard = (item) => {
  const newCard = new Card(item, userId, cardTemplateSelector, {
    handleCardClick: (name, link) => {
      popupWithBigImage.open(name, link);
    },
    handleLikeClick: (id) => {
      newCard.checkAvailabilityLike()
        ? api
            .deleteLike(id)
            .then((res) => {
              newCard.setLikes(res.likes);
            })
            .catch((err) => console.log(err))
        : api
            .addLike(id)
            .then((res) => {
              newCard.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
    },
    handleDeleteBtnClick: (id, card) => {
      popupWithConfirmation.open(id, card);
    },
  });
  const cardElement = newCard.createCard();
  return cardElement;
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cardList]) => {
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
    userId = user._id;
    renderInitialCards(cardList);
  })
  .catch((err) => {
    console.log(err);
  });

// Добавление новой карточки
const addNewCard = (card) => {
  popupAddCardForm.submitBtn("Сохранение...");
  api
    .addNewCard(card.name, card.link)
    .then((item) => {
      const cardElement = createNewCard(item);
      cardElementList.addItem(cardElement);
      popupAddCardForm.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(popupAddCardForm.submitBtn("Создать"));
};

// Удаление карточки
const handleDeleteCard = (id, card) => {
  api
    .deleteCard(id)
    .then((res) => {
      popupWithConfirmation.deleteCard();
      popupWithConfirmation.close();
    })
    .catch((error) => {
      console.log(error);
    });
};

// Попап подтверждения удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(
  "#popup__card-delete",
  (id, card) => handleDeleteCard(id, card)
);
popupWithConfirmation.setEventListeners();

// Редактирование аватара пользователя
const handleEditAvatar = () => {
  editAvatarPopup.submitBtn("Сохранение...");
  api
    .editUserAvatar(popupInputLinkAvatar.value)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      editAvatarPopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(editAvatarPopup.submitBtn("Сохранить"));
};

// Попап редактирования аватара
const editAvatarPopup = new PopupWithForm(
  popupEditAvatarSelector,
  handleEditAvatar
);
editAvatarPopup.setEventListeners();

//открытие попапа профиля
const userInfo = new UserInfo(profileSelector);

// /редактирование данных пользователя
const handleEditProfileFormSubmit = (item) => {
  popupEditProfileForm.submitBtn("Сохранение...");
  api
    .editUserInfo(item.name, item.info)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupEditProfileForm.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(popupEditProfileForm.submitBtn("Сохранить"));
};

const popupEditProfileForm = new PopupWithForm(
  "#popup_type_edit",
  handleEditProfileFormSubmit
);
popupEditProfileForm.setEventListeners();

//валидация
const validationOfPopupEdit = new FormValidator(config, editPopup);
validationOfPopupEdit.enableValidation();

const validationOfPopupAdd = new FormValidator(config, addPopup);
validationOfPopupAdd.enableValidation();

// Валидация в попапе редактирования аватара
const avatarEditFormValidator = new FormValidator(config, popupFormEditAvatar);
avatarEditFormValidator.enableValidation();

//попап добавления новой карточки
const popupAddCardForm = new PopupWithForm("#popup_type_add", addNewCard);
popupAddCardForm.setEventListeners();

//Кнопка - открыть попап редактирования аватара
editAvatarBtn.addEventListener("click", () => {
  avatarEditFormValidator.resetValidation();
  editAvatarPopup.open();
});

addButton.addEventListener("click", function () {
  validationOfPopupAdd.resetValidation();
  popupAddCardForm.open();
});

editButton.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  popupName.value = name;
  popupProfession.value = info;
  validationOfPopupEdit.resetValidation();
  popupEditProfileForm.open();
});