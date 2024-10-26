// Функция обработчик закрытия модального окна 
const handlerCloseModal = (evt, popup) => {
  const isOverlay = evt.target.classList.contains('popup');
  const isBtnClose = evt.target.classList.contains('popup__close');

  if (isOverlay || isBtnClose) {
    closePopup(popup);
  } else {
    evt.stopPropagation();
  };
};


// Функция закрытия модального окна по ESC
const closeByEsc = (evt) => {
  const isEscape = evt.key === 'Escape';

  if (isEscape) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};


// Функция открытия модального окна
export const openPopup = (popup) => {
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('click', (evt) => {
    handlerCloseModal(evt, popup)
  });
  popup.classList.add('popup_is-opened');
};


// Функция закрытия модального окна
export const closePopup = (popup) => {
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('click', (evt) => {
    handlerCloseModal(evt, popup)
  });
  popup.classList.remove('popup_is-opened');
};
