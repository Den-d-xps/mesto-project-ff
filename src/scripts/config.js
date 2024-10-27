// DOM узлы
const profileElementList = {
  'name' : document.querySelector('.profile__title'),
  'description' : document.querySelector('.profile__description'),
  'avatar' : document.querySelector('.profile__image'),
  'button' : document.querySelector('.profile__edit-button'),
  'popups' : {
    'editInfo' : document.querySelector('.popup_type_edit'),
    'changeAvatar' : document.querySelector('.popup_type_сhange-avatar')
  },
  'forms' : {
    'editInfo' : document.forms['edit-profile'],
    'changeAvatar' : document.forms['change-avatar']
  },
  'inputs' : {
    'name' : document.querySelector('.popup__input_type_name'),
    'job' : document.querySelector('.popup__input_type_description'),
    'urlAvatar' : document.querySelector('.popup__input_type_url-avatar')
  }
};
const cardElementList = {
  'conteiner' : document.querySelector('.places__list'),
  'button' : document.querySelector('.profile__add-button'),
  'popupNewCard' : document.querySelector('.popup_type_new-card'),
  'popupImage' : {
    'container' : document.querySelector('.popup_type_image'),
    'image' : document.querySelector('.popup__image'),
    'title' : document.querySelector('.popup__caption')
  },
  'form' : document.forms['new-place'], 
  'inputs' : {
    'name' : document.querySelector('.popup__input_type_card-name'),
    'url' : document.querySelector('.popup__input_type_url')
  }
};

// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// id пользователя
const myId = '';

// Объект экспорта
export const config = {
  profile: profileElementList,
  card: cardElementList,
  validation: validationConfig,
  myId
}