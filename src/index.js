import './pages/index.css';
import { initialCards } from './scripts/constant';
import { createCard } from './scripts/card';
import { openPopup, closePopup } from './scripts/modal';


// DOM узлы
const profile = {
  'name' : document.querySelector('.profile__title'),
  'description' : document.querySelector('.profile__description'),
  'button' : document.querySelector('.profile__edit-button'),
  'popup' : document.querySelector('.popup_type_edit'),
  'form' : document.forms['edit-profile'], 
  'inputs' : {
    'name' : document.querySelector('.popup__input_type_name'),
    'job' : document.querySelector('.popup__input_type_description')
  }
};
const card = {
  'conteiner' : document.querySelector('.places__list'),
  'button' : document.querySelector('.profile__add-button'),
  'popup' : document.querySelector('.popup_type_new-card'),
  'form' : document.forms['new-place'], 
  'inputs' : {
    'name' : document.querySelector('.popup__input_type_card-name'),
    'url' : document.querySelector('.popup__input_type_url')
  }
};


// Функция открытия картинки карточки
function openImage (link, name) {
  const popup = document.querySelector('.popup_type_image');
  const imagePopup = popup.querySelector('.popup__image');
  const titlePopup = popup.querySelector('.popup__caption');

  imagePopup.src = link;
  titlePopup.textContent = name;
  openPopup(popup);
};


// Обработчик открытия формы редактирования профиля
function handlerOpenProfile() {
  profile.inputs.name.value = profile.name.textContent;
  profile.inputs.job.value = profile.description.textContent;
  openPopup(profile.popup);
}

// Обработчик изменения профиля
function handlerChangeProfile(evt) {
  evt.preventDefault();

  profile.name.textContent = profile.inputs.name.value;
  profile.description.textContent = profile.inputs.job.value;
  closePopup(profile.popup);
}

// Обработчик открытия формы добавление карточки
function handlerOpenFormCard() {
  openPopup(card.popup);
}

// Обработчик добавление карточки
function handlerAddCard(evt) {
  evt.preventDefault();

  const data = {
    'name' : card.inputs.name.value,
    'link' : card.inputs.url.value
  }
  const cardElement = createCard(data, openImage);

  card.conteiner.prepend(cardElement);
  card.inputs.name.value = '';
  card.inputs.url.value = '';
  closePopup(card.popup);
}


// Выводим начальный список карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, openImage);
  card.conteiner.append(cardElement);
});

// Добавление слушателей
profile.button.addEventListener('click', handlerOpenProfile);
card.button.addEventListener('click', handlerOpenFormCard);
profile.form.addEventListener('submit', handlerChangeProfile); 
card.form.addEventListener('submit', handlerAddCard); 
