import './pages/index.css';
import { config } from './scripts/config';
import { card } from './scripts/card';
import { modal } from './scripts/modal';
import { validation } from './scripts/validation';
import * as api from './scripts/api';


// Функция открытия картинки карточки
const openImage = (link, name) => {
  const popup = document.querySelector('.popup_type_image');
  const imagePopup = popup.querySelector('.popup__image');
  const titlePopup = popup.querySelector('.popup__caption');

  imagePopup.src = link;
  titlePopup.textContent = name;
  modal.open(popup);
};

// Функция удаления карточки
const deleteCard = (deledeteButton, idCard) => {
  api.deleteCard(idCard)
  .then(() => {
    card.delete(deledeteButton);
  })

};

// функция лайка карточки
const likeCard = (evt, idCard) => {
  const buttonElement = evt.target;
  const isLiked = buttonElement.classList.contains('card__like-button_is-active');

  if (isLiked) {
    api.unsetLikeCard(idCard)
      .then((cardData) => {
        buttonElement.textContent = cardData.likes.length;
      })
  } else {
    api.setLikeCard(idCard)
      .then((cardData) => {
        buttonElement.textContent = cardData.likes.length;
      })
  };

  card.like(buttonElement);
};


// Обработчик открытия формы редактирования профиля
function handlerOpenProfile() {
  const form = config.profile.forms.editInfo;
  const popup = config.profile.popups.editInfo;
  const nameInput = config.profile.inputs.name;
  const jobInput = config.profile.inputs.job;
  const nameElement = config.profile.name;
  const jobElement = config.profile.description;

  validation.clear(form, config.validation);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  modal.open(popup);
};


// Обработчик изменения профиля
function handlerChangeProfile(evt) {
  evt.preventDefault();

  const popup = config.profile.popups.editInfo;
  const nameInput = config.profile.inputs.name;
  const jobInput = config.profile.inputs.job;
  const nameElement = config.profile.name;
  const jobElement = config.profile.description;
  const buttonElement = evt.target.querySelector('.popup__button');

  buttonElement.textContent = 'Сохранение...';
  api.changeProfileInfo(nameInput.value, jobInput.value)
    .then((userData) => {
      nameElement.textContent = userData.name;
      jobElement.textContent = userData.about;
      buttonElement.textContent = 'Готово!';
      setTimeout(() => {
        modal.close(popup);
      }, 1000)
    })
    .catch((err) => {
      buttonElement.disabled = true;
      buttonElement.textContent = err;
    })
    .finally(setTimeout(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Сохранить';
      }, 3000)
    )
};


// Обработчик открытия формы добавление карточки
function handlerOpenFormCard() {
  const popup = config.card.popup;

  modal.open(popup);
};


// Обработчик добавление карточки
function handlerAddCard(evt) {
  evt.preventDefault();

  const conteiner = config.card.conteiner;
  const popup = config.card.popup;
  const form = config.card.form;
  const titleInput = config.card.inputs.name;
  const urlInput = config.card.inputs.url;
  const buttonElement = evt.target.querySelector('.popup__button');

  buttonElement.textContent = 'Сохранение...';
  api.addNewCard(titleInput.value, urlInput.value)
    .then((cardData) => {
      const cardElement = card.create(cardData, {deleteCard, likeCard, openImage});
      conteiner.prepend(cardElement);
      buttonElement.textContent = 'Готово!';
      setTimeout(() => {
        titleInput.value = '';
        urlInput.value = '';
        validation.clear(form, config.validation);
        modal.close(popup);
      }, 1000)
    })
    .catch((err) => {
      buttonElement.disabled = true;
      buttonElement.textContent = err;
    })
    .finally(setTimeout(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Сохранить';
      }, 3000)
    )
};


// Обработчик открытия формы смена аватара
const handlerOpenFormAvatar = () => {
  const popup = config.profile.popups.changeAvatar;
  const form = config.profile.forms.changeAvatar;
  const urlInput = config.profile.inputs.urlAvatar;

  urlInput.value = '';
  validation.clear(form, config.validation);
  modal.open(popup);
};


// Обработчик смены аватара
const handlerChangeAvatar = (evt) => {
  evt.preventDefault();

  const popup = config.profile.popups.changeAvatar;
  const form = config.profile.forms.changeAvatar
  const urlInput = config.profile.inputs.urlAvatar;
  const avatarElement = config.profile.avatar;
  const errorElement = form.querySelector(`.${urlInput.id}-error`);
  const buttonElement = evt.target.querySelector('.popup__button');

  buttonElement.textContent = 'Сохранение...';
  api.changeAvatar(urlInput.value)
    .then((data) => {
    avatarElement.style = `background-image: url(${data.avatar})`;
    buttonElement.textContent = 'Готово!';
    setTimeout(() => {
      modal.close(popup);
    }, 1000)
    })
    .catch((err) => {
      errorElement.textContent = err;
    })
    .finally(setTimeout(() => {
        buttonElement.textContent = 'Сохранить';
      }, 3000)
    )
};


// Добавление слушателей
config.profile.button.addEventListener('click', handlerOpenProfile);
config.card.button.addEventListener('click', handlerOpenFormCard);
config.profile.avatar.addEventListener('click', handlerOpenFormAvatar);
config.profile.forms.editInfo.addEventListener('submit', handlerChangeProfile); 
config.card.form.addEventListener('submit', handlerAddCard);
config.profile.forms.changeAvatar.addEventListener('submit', handlerChangeAvatar)
 


// Включение валидации
validation.enable(config.validation); 


// Функция загрузки данных на страницу
const initializationPage = () => {
  const cardsConteiner = config.card.conteiner;
  const nameProfileElement = config.profile.name;
  const jobProfileElement = config.profile.description;
  const avatarProfileElement = config.profile.avatar;
  const cardFunctions = {
    deleteCard: deleteCard,
    likeCard: likeCard,
    openImage: openImage
  };

  Promise.all([api.getUserData(), api.getCardList()])
  .then(([userData, cardList]) => {
    nameProfileElement.textContent = userData.name;
    jobProfileElement.textContent = userData.about;
    avatarProfileElement.style = `background-image: url(${userData.avatar})`;

    cardList.forEach((cardData) => {
      const cardElement = card.create(cardData, cardFunctions);

      const likeButton = cardElement.querySelector('.card__like-button');
      const hasLike = cardData.likes.some((likeUser) => {
        return likeUser._id === userData._id;
      });
      if (hasLike) {
        card.like(likeButton);
      };

      const isMyPost = cardData.owner._id === userData._id;
      const delButton = cardElement.querySelector('.card__delete-button');

      if (!isMyPost) {
        delButton.remove();
      }
  
      cardsConteiner.append(cardElement);
    })
  })
};

initializationPage();