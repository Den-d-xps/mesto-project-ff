import { openPopup } from "./modal";

// Список начальных карточек
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Глобальные переменные
const cardTemplate = document.querySelector('#card-template').content;
const cardFunctions = {
  deleteCard,
  likeCard,
  openImage
};

// Функция создания карточки
export function createCard (data, callbacks = cardFunctions) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');

  image.src = data.link;
  title.textContent = data.name;

  delButton.addEventListener('click', callbacks.deleteCard);
  likeButton.addEventListener('click', callbacks.likeCard);
  image.addEventListener('click', callbacks.openImage);

  return cardElement;
};

// Функция удаления карточки
export function deleteCard (evt) {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
};

// Функция лайка карточки
function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

// Функция открытия картинки карточки
function openImage (evt) {
  const popup = document.querySelector('.popup_type_image');
  const imagePopup = popup.querySelector('.popup__image');
  const titlePopup = popup.querySelector('.popup__caption');
  const titleCard = evt.target.parentNode.querySelector('.card__title').textContent;
  const linkCard = evt.target.src;

  imagePopup.src = linkCard;
  titlePopup.textContent = titleCard;
  openPopup(popup);
};

