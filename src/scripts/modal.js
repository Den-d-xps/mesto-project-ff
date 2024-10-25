// Функция обработчик закрытия модального окна 
const handlerCloseModal = (evt) => {
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


// Функция открытия модального окна
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', handlerCloseModal);
  document.addEventListener('keydown', handlerCloseModal);
};


// Функция закрытия модального окна
const closePopup = (popup) => {
  document.removeEventListener('keydown', handlerCloseModal);
  popup.removeEventListener('click', handlerCloseModal);
  popup.classList.remove('popup_is-opened');
};


// Объект экспорта
export const modal = {
  open: openPopup,
  close: closePopup
}