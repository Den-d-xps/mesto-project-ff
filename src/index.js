import './pages/index.css';
import { config } from './scripts/config';
import * as card from './scripts/card';
import * as modal from './scripts/modal';
import * as validation from './scripts/validation';
import * as api from './scripts/api';


// Функция открытия картинки карточки
const openImage = (link, name) => {
  config.card.popupImage.image.src = link;
  config.card.popupImage.image.alt = name;
  config.card.popupImage.title.textContent = name;

  modal.openPopup(config.card.popupImage.container);
};

// Функция удаления карточки
const deleteCard = (deledeteButton, idCard) => {
  api.deleteCard(idCard)
  .then(() => {
    card.deleteCard(deledeteButton);
  })
  .catch((err) => {
    console.log(err)
  })
};

// функция лайка карточки
const likeCard = (evt, idCard) => {
  const buttonElement = evt.target;

  if (card.isLiked(buttonElement)) {
    api.unsetLikeCard(idCard)
      .then((cardData) => {
        card.setLikeCount(buttonElement, cardData.likes.length);
        card.likeCard(buttonElement);
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.setLikeCard(idCard)
      .then((cardData) => {
        card.setLikeCount(buttonElement, cardData.likes.length);
        card.likeCard(buttonElement);
      })
      .catch((err) => {
        console.log(err);
      })
  };
};


// Обработчик открытия формы редактирования профиля
function handlerOpenProfile() {
  validation.clearValidation(config.profile.forms.editInfo, config.validation);
  config.profile.inputs.name.value = config.profile.name.textContent;
  config.profile.inputs.job.value = config.profile.description.textContent;
  modal.openPopup(config.profile.popups.editInfo);
};


// Обработчик изменения профиля
function handlerChangeProfile(evt) {
  evt.preventDefault();

  const buttonElement = evt.submitter;
  buttonElement.textContent = 'Сохранение...';
  buttonElement.disabled = true;
  api.changeProfileInfo(config.profile.inputs.name.value, config.profile.inputs.job.value)
    .then((userData) => {
      config.profile.name.textContent = userData.name;
      config.profile.description.textContent = userData.about;

      modal.closePopup(config.profile.popups.editInfo);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Сохранить';
      }
    )
};


// Обработчик открытия формы добавление карточки
function handlerOpenFormCard() {
  validation.clearValidation(config.card.form, config.validation)
  modal.openPopup(config.card.popupNewCard);
};


// Обработчик добавление карточки
function handlerAddCard(evt) {
  evt.preventDefault();

  const buttonElement = evt.submitter;
  buttonElement.textContent = 'Сохранение...';
  buttonElement.disabled = true;
  api.addNewCard(config.card.inputs.name.value, config.card.inputs.url.value)
    .then((cardData) => {
      const cardElement = card.createCard(cardData, config.myId, {deleteCard, likeCard, openImage});
      config.card.conteiner.prepend(cardElement);
      config.card.inputs.name.value = '';
      config.card.inputs.url.value = '';
      modal.closePopup(config.card.popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = 'Сохранить';
    }
  ) 
};


// Обработчик открытия формы смена аватара
const handlerOpenFormAvatar = () => {
  config.profile.inputs.urlAvatar.value = '';
  validation.clearValidation(config.profile.forms.changeAvatar, config.validation);
  modal.openPopup(config.profile.popups.changeAvatar);
};


// Обработчик смены аватара
const handlerChangeAvatar = (evt) => {
  evt.preventDefault();

  const buttonElement = evt.submitter;
  buttonElement.textContent = 'Сохранение...';
  buttonElement.disabled = true;
  api.changeAvatar(config.profile.inputs.urlAvatar.value)
    .then((data) => {
      config.profile.avatar.style = `background-image: url(${data.avatar})`;
      modal.closePopup(config.profile.popups.changeAvatar);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = 'Сохранить';
    }
  )
};


// Добавление слушателей
config.profile.button.addEventListener('click', handlerOpenProfile);
config.card.button.addEventListener('click', handlerOpenFormCard);
config.profile.avatar.addEventListener('click', handlerOpenFormAvatar);
config.profile.forms.editInfo.addEventListener('submit', handlerChangeProfile); 
config.card.form.addEventListener('submit', handlerAddCard);
config.profile.forms.changeAvatar.addEventListener('submit', handlerChangeAvatar);
 
// добавление слушателей для модальных окон
modal.setEventListenersModal();

// Включение валидации
validation.enableValidation(config.validation); 


// Функция загрузки данных на страницу
const initializationPage = () => {
  Promise.all([api.getUserData(), api.getCardList()])
  .then(([userData, cardList]) => {
    config.profile.name.textContent = userData.name;
    config.profile.description.textContent = userData.about;
    config.profile.avatar.style = `background-image: url(${userData.avatar})`;
    config.myId = userData._id

    cardList.forEach((cardData) => {
      const cardElement = card.createCard(cardData, config.myId, {deleteCard, likeCard, openImage}); 
      config.card.conteiner.append(cardElement);
    })
  })
  .catch((err) => {
    console.log(err);
  })
};

initializationPage();