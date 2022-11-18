let popup = document.querySelector(".popup"); // Фон попап окна
let popupForm = document.querySelector(".popup__form"); // Само окно
let openPopupButtons = document.querySelector(".profile__edit-button"); // Кнопки для показа окна
let closePopupButton = document.querySelector(".popup__close"); // Кнопка для скрытия окна
let popupInput = document.querySelector(".popup__input-save");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let nameInput = document.querySelector(".popup__input-name");
let infoInput = document.querySelector(".popup__input-info");

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = infoInput.value;
  nameInput.value = profileName.textContent;
  infoInput.value = profileDescription.textContent;
};
popupForm.addEventListener('submit', formSubmitHandler);
popupInput.addEventListener("click", function () {
  popup.classList.remove("popup_opened")
  }
);
openPopupButtons.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  }
);
closePopupButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
  }
);


