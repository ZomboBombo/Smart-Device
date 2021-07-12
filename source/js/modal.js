'use strict';

/*
===================================================================================================================================
------------------------------------------- Модуль логики работы Модального окна: НАЧАЛО ------------------------------------------
===================================================================================================================================
*/
window.modal = (() => {
  // --------- DOM-элементы ---------
  const body = document.querySelector('body');

  const modals = body.querySelectorAll('.modal');
  const callbackButton = body.querySelector('#callback-button');
  const callbackPopupCloseButton = body.querySelector('#callback-popup-close');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  // *** Функция для обработчика события ОТКРЫТИЯ попапа с Формой обратной связи ***
  const onCallbackButtonClick = (evt) => {
    evt.preventDefault();

    for (let modalOpen of modals) {
      modalOpen.classList.add('modal--show');
    }

    callbackPopupCloseButton.addEventListener('click', onCallbackPopupClose);
  };


  // *** Функция для обработчика события ЗАКРЫТИЯ попапа с Формой обратной связи ***
  const onCallbackPopupClose = (evt) => {
    evt.preventDefault();

    for (let modalClose of modals) {
      modalClose.classList.remove('modal--show');
    }

    callbackPopupCloseButton.removeEventListener('click', onCallbackPopupClose);
  };


  // === ДОБАВЛЕНИЕ обработчика события Открытия попапа с Формой ===
  callbackButton.addEventListener('click', onCallbackButtonClick);
})();
/*
*** --------------------------------------------- Модуль логики Модального окна: КОНЕЦ --------------------------------------------
*/
