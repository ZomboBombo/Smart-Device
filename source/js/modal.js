'use strict';

/*
===================================================================================================================================
------------------------------------------- Модуль логики работы Модального окна: НАЧАЛО ------------------------------------------
===================================================================================================================================
*/
window.modal = (() => {
  // ----------- КОНСТАНТЫ ----------
  // *** Словарик для значений клавиши "Escape" ***
  const EscapeKey = {
    FULL_NAME: 'Escape',
    ABBREVIATED_NAME: 'Esc',
  };


  // --------- DOM-элементы ---------
  const body = document.querySelector('body');

  const modals = body.querySelectorAll('.modal');
  const modalOverlay = body.querySelector('#modal-overlay');
  const formNameField = modalOverlay.querySelector('#callback-popup-customer-name');
  const callbackButton = body.querySelector('#callback-button');
  const callbackPopupCloseButton = body.querySelector('#callback-popup-close');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  /*
  *** Функция для обработчика события ЗАКРЫТИЯ попапа с Формой
  *** при НАЖАТИИ на клавишу "Escape"
  */
  const onEscPress = (evt) => {
    if (evt.key === EscapeKey.FULL_NAME || evt.key === EscapeKey.ABBREVIATED_NAME) {
      evt.preventDefault();

      for (let modalClose of modals) {
        modalClose.classList.remove('modal--show');
      }

      callbackPopupCloseButton.removeEventListener('click', onCallbackPopupClose);
      modalOverlay.removeEventListener('click', onModalOverlayClick);
      document.removeEventListener('keydown', onEscPress);
    }
  };


  /*
  *** Функция для обработчика события ЗАКРЫТИЯ попапа с Формой
  *** при КЛИКЕ на "пустое пространство" (оверлей попапа)
  */
  const onModalOverlayClick = (evt) => {
    if (evt.target === modalOverlay) {
      for (let modalClose of modals) {
        modalClose.classList.remove('modal--show');
      }

      callbackPopupCloseButton.removeEventListener('click', onCallbackPopupClose);
      modalOverlay.removeEventListener('click', onModalOverlayClick);
      document.addEventListener('keydown', onEscPress);
    }
  };


  /*
  *** Функция для обработчика события ЗАКРЫТИЯ попапа с Формой
  *** при КЛИКЕ на кнопку Закрытия ("крестик")
  */
  const onCallbackPopupClose = (evt) => {
    evt.preventDefault();

    for (let modalClose of modals) {
      modalClose.classList.remove('modal--show');
    }

    callbackPopupCloseButton.removeEventListener('click', onCallbackPopupClose);
    modalOverlay.removeEventListener('click', onModalOverlayClick);
    document.removeEventListener('keydown', onEscPress);
  };


  // *** Функция для обработчика события ОТКРЫТИЯ попапа с Формой обратной связи ***
  const onCallbackButtonClick = (evt) => {
    evt.preventDefault();

    for (let modalOpen of modals) {
      modalOpen.classList.add('modal--show');
    }

    formNameField.focus();

    callbackPopupCloseButton.addEventListener('click', onCallbackPopupClose);
    modalOverlay.addEventListener('click', onModalOverlayClick);
    document.addEventListener('keydown', onEscPress);
  };


  // === ДОБАВЛЕНИЕ обработчика события Открытия попапа с Формой ===
  callbackButton.addEventListener('click', onCallbackButtonClick);
})();
/*
*** --------------------------------------------- Модуль логики Модального окна: КОНЕЦ --------------------------------------------
*/
