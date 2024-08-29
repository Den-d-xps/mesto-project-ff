// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardConteiner = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard (data, callback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__title').textContent = data.name;

  delButton.addEventListener('click', callback);

  return cardElement
};


// @todo: Функция удаления карточки
function deleteCard (evt) {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
};


// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardConteiner.append(cardElement);
});
