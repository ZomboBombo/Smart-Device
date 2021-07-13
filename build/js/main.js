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
