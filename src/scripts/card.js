// Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// функция установки отображения карточки для заданного юзера
const setStateCardForUser = (cardElement, cardData, userId) => {
  const delButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const isMyPost = cardData.owner._id === userId;
  const hasLike = cardData.likes.some((likeUser) => {
    return likeUser._id === userId;
  });

  if (hasLike) {
    likeCard(likeButton);
  };

  if (!isMyPost) {
    delButton.remove();
  }
};


// Функция создания карточки
export const createCard = (dataCard, ownerId, callbacks) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');

  image.src = dataCard.link;
  image.alt = dataCard.name;
  title.textContent = dataCard.name;
  likeButton.textContent = dataCard.likes.length;

  setStateCardForUser(cardElement, dataCard, ownerId);

  delButton.addEventListener('click', (evt) => {
    callbacks.deleteCard(evt, dataCard._id)
  });
  likeButton.addEventListener('click', (evt) => {
    callbacks.likeCard(evt, dataCard._id);
  });
  image.addEventListener('click', () => {
    callbacks.openImage(dataCard.link, dataCard.name);
  });

  return cardElement;
};


// Функция удаления карточки
export const deleteCard = (evt) => {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
};


// Функция лайка карточки
export const likeCard = (element) => {
  element.classList.toggle('card__like-button_is-active');
};

// Функция проверки на наличие лайка
export const isLiked = (buttonElement) => {
 return buttonElement.classList.contains('card__like-button_is-active');
};


// Функция установки счетчика лайков
export const setLikeCount = (buttonElement, count) => {
  buttonElement.textContent = count;
};

