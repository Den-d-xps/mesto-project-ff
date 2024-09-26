import './pages/index.css';
import { initialCards, createCard } from './scripts/cards';
import { openPopup, closePopup } from './scripts/modal';


// DOM узлы
const profile = {
  'conteiner' : document.querySelector('.profile'),
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


// Обработчик открытия форм
function handlerOpenForms(evt) {
  switch (evt.target) {
    case profile.button:
      profile.inputs.name.value = profile.name.textContent;
      profile.inputs.job.value = profile.description.textContent;
      openPopup(profile.popup);
      break;
    case card.button:
      openPopup(card.popup);
      break;
  };
};

// Обработчик изменения профиля
function handlerChangeProfile(evt) {
  evt.preventDefault();

  profile.name.textContent = profile.inputs.name.value;
  profile.description.textContent = profile.inputs.job.value;
  closePopup(profile.popup);
}

// Обработчик добавление карточки
function handlerAddCard(evt) {
  evt.preventDefault();

  const data = {
    'name' : card.inputs.name.value,
    'link' : card.inputs.url.value
  }
  const cardElement = createCard(data);

  card.conteiner.prepend(cardElement);
  card.inputs.name.value = '';
  card.inputs.url.value = '';
  closePopup(card.popup);
}


// Выводим начальный список карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  card.conteiner.append(cardElement);
});

// Добавление слушателей
profile.conteiner.addEventListener('click', handlerOpenForms)
profile.form.addEventListener('submit', handlerChangeProfile); 
card.form.addEventListener('submit', handlerAddCard); 
