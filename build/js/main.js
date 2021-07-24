'use strict';

/*
===================================================================================================================================
---------------------------------------- Модуль логики работы Аккордеона в Подвале: НАЧАЛО ----------------------------------------
===================================================================================================================================
*/
window.accordeon = (() => {
  // ---------- КОНСТАНТЫ -----------
  const VALUE_IS_TRUE = true;


  // --------- DOM-элементы ---------
  const accordeonToggles = document.querySelectorAll('.accordeon-section__toggle-button');
  const accordeonTabs = document.querySelectorAll('.accordeon-section__tab');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  // *** Функция для обработчика события клика по тогглеру Аккордеона ***
  const onAccordeonToggleClick = (evt) => {
    evt.preventDefault();

    const currentAccordeonToggle = evt.target;
    const accordeonTabParent = currentAccordeonToggle.closest('.accordeon-section');
    const currentAccordeonTab = accordeonTabParent.querySelector('.accordeon-section__tab');

    /*
    *** Если ТЕКУЩАЯ вкладка Аккордеона НЕ совпадает с перечисляемой в цикле, то:
    *** ---
    *** + находим блок-родителя данной вкладки Аккордеона;
    *** + находим дочерний данной вкладке тогглер Аккордеона;
    *** + УДАЛЯЕМ модификатор класса для тогглера;
    *** + УДАЛЯЕМ модификатор класса открытой вкладки.
    */
    for (let accordeonTabToClose of accordeonTabs) {
      if (accordeonTabToClose !== currentAccordeonTab) {
        const closestAccordeonSection = accordeonTabToClose.closest('.accordeon-section');
        const closestAccordeonToggle = closestAccordeonSection.querySelector('.accordeon-section__toggle-button');

        closestAccordeonToggle.classList.remove('accordeon-section__toggle-button--tab-open');
        accordeonTabToClose.classList.remove('accordeon-section__tab--tab-open');
      }
    }

    switch (VALUE_IS_TRUE) {
      case currentAccordeonTab.classList.contains('accordeon-section__tab--tab-open'):
        currentAccordeonTab.classList.remove('accordeon-section__tab--tab-open');
        currentAccordeonToggle.classList.remove('accordeon-section__toggle-button--tab-open');
        break;

      default:
        currentAccordeonTab.classList.add('accordeon-section__tab--tab-open');
        currentAccordeonToggle.classList.add('accordeon-section__toggle-button--tab-open');
    }
  };


  // *** Цикл для установки модификаторов класса при активном JS на тогглеры Аккордеона ***
  /*
  *** Также происходит установка обработчиков события клика
  *** на тогглеры Аккордеона.
  */
  for (let accordeonToggle of accordeonToggles) {
    accordeonToggle.classList.add('accordeon-section__toggle-button--js-active');
    accordeonToggle.addEventListener('click', onAccordeonToggleClick);
  }


  // *** Цикл для установки модификаторов класса при активном JS на вкладки Аккордеона ***
  for (let accordeonTab of accordeonTabs) {
    accordeonTab.classList.add('accordeon-section__tab--js-active');
  }
})();
/*
*** -------------------------------------- Модуль логики работы Аккордеона в Подвале: КОНЕЦ --------------------------------------
*/

'use strict';

/*
===================================================================================================================================
------------------------------------- Модуль логики обрезания части текста "О компании": НАЧАЛО -----------------------------------
===================================================================================================================================
*/
window.characterLimiter = (() => {
  // ---------- КОНСТАНТЫ -----------
  const TABLET_WIDTH = 768;
  const CHARACTER_LIMITER = 370;
  const FIRST_ELEMENT = 0;
  const ELLIPSIS = '..';


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  /*
  *** Скрипт начинает обрабатывать внутреннюю логику только в том случае,
  *** если ширина вьюпорта МЕНЬШЕ, чем установленная на сайте Планшетная
  *** ширина.
  */
  if (document.documentElement.clientWidth <= TABLET_WIDTH) {
    // --------- DOM-элементы ---------
    const aboutCompanySection = document.querySelector('#about-company-section');
    const aboutCompanyDescriptionBox = aboutCompanySection.querySelector('#about-company-description-box');
    const aboutCompanyParagraphs = aboutCompanyDescriptionBox.querySelectorAll('p');

    // --- Счётчик количества символов в тексте "О компании" ---
    let characterCount = 0;
    Array.from(aboutCompanyParagraphs).forEach((element) => {
      characterCount += element.textContent.length;
    });


    /*
    *** ЕСЛИ количество символов текста "О компании" превышает
    *** установленный допустимый лимит (CHARACTER_LIMITER),
    *** ТО запускается логика обработки текста.
    */
    if (characterCount >= CHARACTER_LIMITER) {
      let currentRemainingСharactersCount = CHARACTER_LIMITER; // -- Счётчик ТЕКУЩЕГО оставшегося допустимого кол-ва символов
      let previousRemainingСharactersCount = 0; // -- Счётчик ПРЕДЫДУЩЕГО оставшегося допустимого кол-ва символов

      // *** Очистка коллекции параграфов с текстом "О компании" ***
      Array.from(aboutCompanyParagraphs).forEach((element) => {
        element.remove();
      });


      // *** Цикл для анализа эл-тов коллекции параграфов с текстом "О компании".
      for (let aboutCompanyParagraph of aboutCompanyParagraphs) {
        currentRemainingСharactersCount -= aboutCompanyParagraph.textContent.length;

        /*
        *** ЕСЛИ текущее допустимое кол-во оставшихся символов Меньше либо Равно нулю,
        *** ТО обрезать текущий параграф до необходимого кол-ва символов, добавить его
        *** в DOM и прервать выполнение цикла.
        ***
        *** ИНАЧЕ — обновить счётчик ПРЕДЫДУЩЕГО оставшегося допустимого кол-ва символов
        *** и добавить текущий параграф без изменений.
        */
        if (currentRemainingСharactersCount <= 0) {
          const incompleteText = aboutCompanyParagraph.textContent.substring(FIRST_ELEMENT, previousRemainingСharactersCount);
          aboutCompanyParagraph.textContent = incompleteText + ELLIPSIS;
          aboutCompanyDescriptionBox.appendChild(aboutCompanyParagraph);
          break;
        } else {
          previousRemainingСharactersCount = currentRemainingСharactersCount;
          aboutCompanyDescriptionBox.appendChild(aboutCompanyParagraph);
        }
      }
    }
  }
})();
/*
*** ------------------------------------- Модуль логики обрезания части текста "О компании": КОНЕЦ -----------------------------------
*/

'use strict';

/*
===================================================================================================================================
-------------------------------------------- Модуль маски ввода номера телефона: НАЧАЛО -------------------------------------------
===================================================================================================================================
*/
window.maskForInputs = (() => {
  // ---------- КОНСТАНТЫ -----------
  const MIN_PHONE_LENGHT = 11;
  const EMPTY = '';

  // *** Словарь языковых аббревиатур ***
  const LanguageAbbr = {
    RU: 'ru',
    ru_RU: 'ru-RU',
    EN: 'en',
    en_US: 'en-US',
    en_GB: 'en-GB',
  };

  // *** Словарь сообщений валидации полей Формы ***
  const ValidityMessage = {
    PHONE_RU: 'Номер телефона введён не полностью. Пожалуйста, введите номер телефона.',
    PHONE_EN: 'The phone number is incomplete. Please enter your phone number.',
  };


  // --------- DOM-элементы ---------
  const telInputs = document.querySelectorAll('input[type="tel"]');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  // *** Переменная, определяющая язык Локали браузера ***
  const browserLanguage = navigator.language;

  /*
  *** Условия определения, на каком языке будет выведено
  *** валидационное сообщение (по умолчанию — на Русском)
  */
  let phoneValidityMessage = EMPTY;
  switch (true) {
    case browserLanguage === LanguageAbbr.RU || browserLanguage === LanguageAbbr.ru_RU:
      phoneValidityMessage = ValidityMessage.PHONE_RU;
      break;

    case browserLanguage === LanguageAbbr.EN || browserLanguage === LanguageAbbr.en_US || browserLanguage === LanguageAbbr.en_GB:
      phoneValidityMessage = ValidityMessage.PHONE_EN;
      break;

    default:
      phoneValidityMessage = ValidityMessage.PHONE_RU;
  }


  /*
  *** Ф-ция для обработчика события ИЗМЕНЕНИЯ содержимого
  *** поля ввода номера телефона
  */
  const onInputChange = (inputElement) => {
    const regExpForInput = /^\d$/;
    const valueOfInput = inputElement.value;

    // --- Счётчик цифровых символов ---
    let truePhoneLength = 0;

    /*
    *** Цикл перебирает строку посимвольно:
    *** ---
    *** ЕСЛИ текущий символ соответствует установленному RegExp,
    *** ТОГДА счётчик увеличивается на один.
    */
    for (let i = 0; i < valueOfInput.length; i++) {
      if (valueOfInput.charAt(i).match(regExpForInput)) {
        truePhoneLength++;
      }
    }

    /*
    *** ЕСЛИ количество цифровых символов в номере телефона
    *** меньше установленной Минимальной длины,
    *** ТОГДА выведется валидационное сообщение
    */
    if (truePhoneLength < MIN_PHONE_LENGHT) {
      inputElement.setCustomValidity(phoneValidityMessage);
    } else {
      inputElement.setCustomValidity(EMPTY);
    }
  };


  // *** Установка обработчика события и маски на все поля ввода номера телефона ***
  for (let telInput of telInputs) {
    Inputmask({ 'mask': '+7 (999) 999-99-99' }).mask(telInput);
    telInput.addEventListener('change', () => {
      onInputChange(telInput);
    });
  }
})();
/*
===================================================================================================================================
-------------------------------------------- Модуль маски ввода номера телефона: КОНЕЦ --------------------------------------------
===================================================================================================================================
*/

'use strict';

/*
===================================================================================================================================
------------------------------------------- Модуль логики работы Модального окна: НАЧАЛО ------------------------------------------
===================================================================================================================================
*/
window.modal = (() => {
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


  // === ДОБАВЛЕНИЕ обработчика события Открытия попапа с Формой ===
  callbackButton.addEventListener('click', onCallbackButtonClick);
})();
/*
*** --------------------------------------------- Модуль логики Модального окна: КОНЕЦ --------------------------------------------
*/

'use strict';

/*
===================================================================================================================================
--------------------------------------- Модуль сохранения данных Формы в localStorage: НАЧАЛО -------------------------------------
===================================================================================================================================
*/
window.saveToLocalStorage = (() => {
  // ---------- КОНСТАНТЫ -----------
  const FormField = {
    TYPE_TEXT: 'text',
    TYPE_TEL: 'tel',
    TAG_TEXTAREA: 'textarea'
  };


  // --------- DOM-элементы ---------
  const formInputs = document.querySelectorAll('form input');
  const formTextareas = document.querySelectorAll('form textarea');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  /*
  *** Ф-ция для обработчика события ИЗМЕНЕНИЯ значения
  *** в поле ввода
  */
  const onFormFieldChange = (fieldToSave) => {
    localStorage.setItem(fieldToSave.name, fieldToSave.value);
  };


  // *** Ф-ция для СОХРАНЕНИЯ значений полей Формы в `localStorage` ***
  const saveValueToLocalStorage = (formFields) => {
    for (let formFieldToSave of formFields) {
      const typeOfField = formFieldToSave.getAttribute('type');
      const tagNameOfField = formFieldToSave.tagName.toLowerCase();

      if (typeOfField === FormField.TYPE_TEXT || typeOfField === FormField.TYPE_TEL || tagNameOfField === FormField.TAG_TEXTAREA) {
        formFieldToSave.addEventListener('change', () => {
          onFormFieldChange(formFieldToSave);
        });
      }
    }
  };


  /*
  *** Вызовы ф-ции СОХРАНЕНИЯ значений в `localStorage`
  *** для каждой коллекции элементов ввода
  */
  saveValueToLocalStorage(formInputs);
  saveValueToLocalStorage(formTextareas);
})();
/*
===================================================================================================================================
--------------------------------------- Модуль сохранения данных Формы в localStorage: КОНЕЦ --------------------------------------
===================================================================================================================================
*/
