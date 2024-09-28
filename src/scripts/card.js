// Глобальные переменные
const cardTemplate = document.querySelector('#card-template').content;
const cardFunctions = {
  deleteCard,
  likeCard
};

// Функция создания карточки
export function createCard (data, openImage, callbacks = cardFunctions) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');

  image.src = data.link;
  title.textContent = data.name;

  delButton.addEventListener('click', callbacks.deleteCard);
  likeButton.addEventListener('click', callbacks.likeCard);
  image.addEventListener('click', () => {
    openImage(data.link, data.name);
  });

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

