// Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;



// Функция создания карточки
const createCard = (data, callbacks) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');

  image.src = data.link;
  title.textContent = data.name;
  likeButton.textContent = data.likes.length;


  delButton.addEventListener('click', (evt) => {
    callbacks.deleteCard(evt, data._id)
  });
  likeButton.addEventListener('click', (evt) => {
    callbacks.likeCard(evt, data._id);
  });
  image.addEventListener('click', () => {
    callbacks.openImage(data.link, data.name);
  });

  return cardElement;
};


// Функция удаления карточки
const deleteCard = (evt) => {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
};


// Функция лайка карточки
const likeCard = (element) => {
  element.classList.toggle('card__like-button_is-active');
};


// Объект экспорта
export const card = {
  create: createCard,
  delete: deleteCard,
  like: likeCard  
}
