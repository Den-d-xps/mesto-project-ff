// Функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', handlerCloseModal);
  document.addEventListener('keydown', handlerCloseModal);
};

// Функция закрытия модального окна
export function closePopup(popup) {
  document.removeEventListener('keydown', handlerCloseModal);
  popup.removeEventListener('click', handlerCloseModal);
  popup.classList.remove('popup_is-opened');
}

// Функция обработчик закрытия модального окна 
function handlerCloseModal (evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  const isOverlay = evt.target.classList.contains('popup');
  const isBtnClose = evt.target.classList.contains('popup__close');
  const isEscape = evt.key === 'Escape';

  if (isOverlay || isBtnClose || isEscape) {
    closePopup(openedPopup);
  } else {
    evt.stopPropagation();
  };
};
