/*
===================================================================================================================================
------------------------------------------- Модуль логики работы Модального окна: НАЧАЛО ------------------------------------------
===================================================================================================================================
*/

// ----------- КОНСТАНТЫ ----------
const PAGE_TOP = 0;

// *** Словарик для значений клавиши "Escape" ***
const EscapeKey = {
  FULL_NAME: 'Escape',
  ABBREVIATED_NAME: 'Esc',
};


// --------- DOM-элементы ---------
const body = document.querySelector('body');

const modals = body.querySelectorAll('.modal');
const modalOverlay = body.querySelector('#modal-overlay');
const modalForm = modalOverlay.querySelector('form');
const formNameField = modalForm.querySelector('#callback-popup-customer-name');
const callbackButton = body.querySelector('#callback-button');
const callbackPopupCloseButton = body.querySelector('#callback-popup-close');


/*
======================== ОСНОВНАЯ ЛОГИКА ========================
*/

/*
*** Функция для расчёта расстояния, которое было
*** "проскроллено" от начала страницы
*/
const getBodyScrollTop = () => {
  return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
};


/*
*** Функция-флаг для определения, СУЩЕСТВУЕТ ли
*** на странице Вертикальный скролл
*/
const isExistVerticalScroll = () => {
  return document.body.offsetHeight > window.innerHeight;
};


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

    /*
    *** ЕСЛИ Вертикальный скролл сущетвует,
    *** ВЕРНУТЬ возможность скролла страницы
    *** и "проскроллить" страницу на прежнее место
    */
    if (isExistVerticalScroll()) {
      body.classList.remove('body-scroll-disabled');
      window.scrollTo(PAGE_TOP, body.dataset.scrollY);
    }

    modalForm.reset();

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

    /*
    *** ЕСЛИ Вертикальный скролл сущетвует,
    *** ВЕРНУТЬ возможность скролла страницы
    *** и "проскроллить" страницу на прежнее место
    */
    if (isExistVerticalScroll()) {
      body.classList.remove('body-scroll-disabled');
      window.scrollTo(PAGE_TOP, body.dataset.scrollY);
    }

    modalForm.reset();

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

  /*
  *** ЕСЛИ Вертикальный скролл сущетвует,
  *** ВЕРНУТЬ возможность скролла страницы
  *** и "проскроллить" страницу на прежнее место
  */
  if (isExistVerticalScroll()) {
    body.classList.remove('body-scroll-disabled');
    window.scrollTo(PAGE_TOP, body.dataset.scrollY);
  }

  modalForm.reset();

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

  // --- Расчёт проскролленого расстояния от НАЧАЛА страницы ---
  body.dataset.scrollY = getBodyScrollTop();

  /*
  *** ЕСЛИ Вертикальный скролл сущетвует,
  *** УБРАТЬ возможность скролла страницы
  *** и "проскроллить" страницу на прежнее место
  */
  if (isExistVerticalScroll()) {
    body.classList.add('body-scroll-disabled');
    body.style.top = `-${body.dataset.scrollY}px`;
  }

  callbackPopupCloseButton.addEventListener('click', onCallbackPopupClose);
  modalOverlay.addEventListener('click', onModalOverlayClick);
  document.addEventListener('keydown', onEscPress);
};


/*
 * ===---===---=== ГЛАВНАЯ ФУНКЦИЯ ===---===---===
 */
const initiateModalLogic = () => {
  callbackButton.addEventListener('click', onCallbackButtonClick);
};


export { initiateModalLogic };

/*
*** --------------------------------------------- Модуль логики Модального окна: КОНЕЦ --------------------------------------------
*/
