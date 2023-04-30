import Popup from '../components/Popup.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js'
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'

import './index.css';

import {
  buttonOpenPopupProfile,
  formProfile,
  nameInput,
  infoInput,
  buttonOpenPopupAdd,
  popupFormCard,
  config,
  formAvatar
}
  from "../utils/constants.js";

const cardList = '.gallery';

const section = new Section(
  {
    renderer: (item) => createCard(item)
  },
  cardList
);
const renderInitialCards = (cards) => {
  section.renderItems(cards);
};



const popupProfile = new PopupWithForm('.popup_edit', submitEditProfileForm);
const popupWithImage = new PopupWithImage('.popup_photo');


const popupInputLinkAvatar = document.querySelector(".popup__input_link");
const editAvatarBtn = document.querySelector(".profile__avatar-btn");

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}


const validatorAddCard = new FormValidator(config, popupFormCard);
const validatorProfile = new FormValidator(config, formProfile);
const validatorAvatar = new FormValidator(config, formAvatar);



buttonOpenPopupAdd.addEventListener('click', () => {
  popupCard.open();
  validatorAddCard.disableButton();
})




validatorAddCard.enableValidation();
validatorProfile.enableValidation();
validatorAvatar.enableValidation();


const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "d48897fd-60db-44b5-a786-719cbcf970f2",
    "Content-Type": "application/json",
  },
});
let userId = null;

const handleFormCardSubmit = (data) => {
  popupCard.loading(true);
  api
    .addNewCard(data.name, data.link)
    .then((data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
      popupCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupCard.loading(false);
    });

};


function submitEditProfileForm(item) {
  popupProfile.loading(true);
  api
    .setUserData(item.name, item.info)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupProfile.loading(false);
    });
}

buttonOpenPopupProfile.addEventListener('click', () => {
  popupProfile.open();
  const { name, info } = userInfo.getUserInfo();
  nameInput.value = name
  infoInput.value = info;

});

Promise.all([api.getUserData(), api.getCards()])
  .then(([user, cardList]) => {
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
    userId = user._id;
    renderInitialCards(cardList);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });




const createCard = (data) => {
  const card = new Card(data, userId, '#card', handleCardClick, {
    handleLikeClick: (id) => {
      card.checkAvailabilityLike()
        ? api
          .deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => console.log(`Ошибка: ${err}`))
        : api
          .addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
    }, handleDeleteBtnClick: (cardId) => {
      popupWithConfirmation.open();
      popupWithConfirmation.handleConfirmation(() => {

        api
          .deleteCard(cardId)
          .then(() => {
            popupWithConfirmation.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });

      });

    }

  }
  );

  const cardElement = card.generateCard();
  return cardElement;

}


const popupCard = new PopupWithForm('.popup_add', handleFormCardSubmit);
const popupWithConfirmation = new PopupWithConfirmation(".popup_delete");


const handleEditAvatar = () => {
  editAvatarPopup.loading(true);
  api

    .editUserAvatar(popupInputLinkAvatar.value)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      editAvatarPopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      editAvatarPopup.loading(false);
    });

};

const editAvatarPopup = new PopupWithForm(
  '.popup_avatar',
  handleEditAvatar
);
editAvatarBtn.addEventListener("click", () => {
  editAvatarPopup.open();
});

popupCard.setEventListeners();
popupWithConfirmation.setEventListeners();
editAvatarPopup.setEventListeners();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();