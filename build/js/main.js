(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleAccordeonState = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
===================================================================================================================================
---------------------------------------- Модуль логики работы Аккордеона в Подвале: НАЧАЛО ----------------------------------------
===================================================================================================================================
*/
// ---------- КОНСТАНТЫ -----------
var VALUE_IS_TRUE = true; // --------- DOM-элементы ---------

var accordeonToggles = document.querySelectorAll('.accordeon-section__toggle-button');
var accordeonTabs = document.querySelectorAll('.accordeon-section__tab');
/*
======================== ОСНОВНАЯ ЛОГИКА ========================
*/
// *** Функция для обработчика события клика по тогглеру Аккордеона ***

var onAccordeonToggleClick = function onAccordeonToggleClick(evt) {
  evt.preventDefault();
  var currentAccordeonToggle = evt.target;
  var accordeonTabParent = currentAccordeonToggle.closest('.accordeon-section');
  var currentAccordeonTab = accordeonTabParent.querySelector('.accordeon-section__tab');
  /*
  *** Если ТЕКУЩАЯ вкладка Аккордеона НЕ совпадает с перечисляемой в цикле, то:
  *** ---
  *** + находим блок-родителя данной вкладки Аккордеона;
  *** + находим дочерний данной вкладке тогглер Аккордеона;
  *** + УДАЛЯЕМ модификатор класса для тогглера;
  *** + УДАЛЯЕМ модификатор класса открытой вкладки.
  */

  var _iterator = _createForOfIteratorHelper(accordeonTabs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var accordeonTabToClose = _step.value;

      if (accordeonTabToClose !== currentAccordeonTab) {
        var closestAccordeonSection = accordeonTabToClose.closest('.accordeon-section');
        var closestAccordeonToggle = closestAccordeonSection.querySelector('.accordeon-section__toggle-button');
        closestAccordeonToggle.classList.remove('accordeon-section__toggle-button--tab-open');
        accordeonTabToClose.classList.remove('accordeon-section__tab--tab-open');
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
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
/*
 * ===---===---=== ГЛАВНАЯ ФУНКЦИЯ ===---===---===
 */


var toggleAccordeonState = function toggleAccordeonState() {
  // *** Цикл для установки модификаторов класса при активном JS на тогглеры Аккордеона ***

  /*
  *** Также происходит установка обработчиков события клика
  *** на тогглеры Аккордеона.
  */
  var _iterator2 = _createForOfIteratorHelper(accordeonToggles),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var accordeonToggle = _step2.value;
      accordeonToggle.classList.add('accordeon-section__toggle-button--js-active');
      accordeonToggle.addEventListener('click', onAccordeonToggleClick);
    } // *** Цикл для установки модификаторов класса при активном JS на вкладки Аккордеона ***

  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var _iterator3 = _createForOfIteratorHelper(accordeonTabs),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var accordeonTab = _step3.value;
      accordeonTab.classList.add('accordeon-section__tab--js-active');
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
};
/*
*** -------------------------------------- Модуль логики работы Аккордеона в Подвале: КОНЕЦ --------------------------------------
*/


exports.toggleAccordeonState = toggleAccordeonState;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limitCharacters = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
===================================================================================================================================
------------------------------------- Модуль логики обрезания части текста "О компании": НАЧАЛО -----------------------------------
===================================================================================================================================
*/
// ---------- КОНСТАНТЫ -----------
var TABLET_WIDTH = 768;
var CHARACTER_LIMITER = 370;
var FIRST_ELEMENT = 0;
var ELLIPSIS = '..';
/*
======================== ОСНОВНАЯ ЛОГИКА ========================
*/

var limitCharacters = function limitCharacters() {
  /*
  *** Скрипт начинает обрабатывать внутреннюю логику только в том случае,
  *** если ширина вьюпорта МЕНЬШЕ, чем установленная на сайте Планшетная
  *** ширина.
  */
  if (document.documentElement.clientWidth <= TABLET_WIDTH) {
    // --------- DOM-элементы ---------
    var aboutCompanySection = document.querySelector('#about-company-section');
    var aboutCompanyDescriptionBox = aboutCompanySection.querySelector('#about-company-description-box');
    var aboutCompanyParagraphs = aboutCompanyDescriptionBox.querySelectorAll('p'); // --- Счётчик количества символов в тексте "О компании" ---

    var characterCount = 0;
    Array.from(aboutCompanyParagraphs).forEach(function (element) {
      characterCount += element.textContent.length;
    });
    /*
    *** ЕСЛИ количество символов текста "О компании" превышает
    *** установленный допустимый лимит (CHARACTER_LIMITER),
    *** ТО запускается логика обработки текста.
    */

    if (characterCount >= CHARACTER_LIMITER) {
      var currentRemainingСharactersCount = CHARACTER_LIMITER; // -- Счётчик ТЕКУЩЕГО оставшегося допустимого кол-ва символов

      var previousRemainingСharactersCount = 0; // -- Счётчик ПРЕДЫДУЩЕГО оставшегося допустимого кол-ва символов
      // *** Очистка коллекции параграфов с текстом "О компании" ***

      Array.from(aboutCompanyParagraphs).forEach(function (element) {
        element.remove();
      }); // *** Цикл для анализа эл-тов коллекции параграфов с текстом "О компании".

      var _iterator = _createForOfIteratorHelper(aboutCompanyParagraphs),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var aboutCompanyParagraph = _step.value;
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
            var incompleteText = aboutCompanyParagraph.textContent.substring(FIRST_ELEMENT, previousRemainingСharactersCount);
            aboutCompanyParagraph.textContent = incompleteText + ELLIPSIS;
            aboutCompanyDescriptionBox.appendChild(aboutCompanyParagraph);
            break;
          } else {
            previousRemainingСharactersCount = currentRemainingСharactersCount;
            aboutCompanyDescriptionBox.appendChild(aboutCompanyParagraph);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
};
/*
*** ------------------------------------- Модуль логики обрезания части текста "О компании": КОНЕЦ -----------------------------------
*/


exports.limitCharacters = limitCharacters;

},{}],3:[function(require,module,exports){
"use strict";

var _accordeon = require("./accordeon");

var _characterLimiter = require("./character-limiter");

var _maskForInputs = require("./mask-for-inputs");

var _modal = require("./modal");

var _saveToLocalStorage = require("./save-to-local-storage");

window.addEventListener('load', function () {
  (0, _accordeon.toggleAccordeonState)();
  (0, _characterLimiter.limitCharacters)();
  (0, _maskForInputs.setInputmask)();
  (0, _modal.initiateModalLogic)();
  (0, _saveToLocalStorage.saveToLocalStorage)();
});

},{"./accordeon":1,"./character-limiter":2,"./mask-for-inputs":4,"./modal":5,"./save-to-local-storage":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setInputmask = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
===================================================================================================================================
-------------------------------------------- Модуль маски ввода номера телефона: НАЧАЛО -------------------------------------------
===================================================================================================================================
*/
// ---------- КОНСТАНТЫ -----------
var MIN_PHONE_LENGHT = 11;
var EMPTY = ''; // *** Словарь языковых аббревиатур ***

var LanguageAbbr = {
  RU: 'ru',
  ru_RU: 'ru-RU',
  EN: 'en',
  en_US: 'en-US',
  en_GB: 'en-GB'
}; // *** Словарь сообщений валидации полей Формы ***

var ValidityMessage = {
  PHONE_RU: 'Номер телефона введён не полностью. Пожалуйста, введите номер телефона.',
  PHONE_EN: 'The phone number is incomplete. Please enter your phone number.'
}; // --------- DOM-элементы ---------

var telInputs = document.querySelectorAll('input[type="tel"]');
/*
======================== ОСНОВНАЯ ЛОГИКА ========================
*/
// *** Переменная, определяющая язык Локали браузера ***

var browserLanguage = navigator.language;
/*
*** Условия определения, на каком языке будет выведено
*** валидационное сообщение (по умолчанию — на Русском)
*/

var phoneValidityMessage = EMPTY;

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


var onInputChange = function onInputChange(inputElement) {
  var regExpForInput = /^\d$/;
  var valueOfInput = inputElement.value; // --- Счётчик цифровых символов ---

  var truePhoneLength = 0;
  /*
  *** Цикл перебирает строку посимвольно:
  *** ---
  *** ЕСЛИ текущий символ соответствует установленному RegExp,
  *** ТОГДА счётчик увеличивается на один.
  */

  for (var i = 0; i < valueOfInput.length; i++) {
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
/*
 * ===---===---=== ГЛАВНАЯ ФУНКЦИЯ ===---===---===
 */


var setInputmask = function setInputmask() {
  // *** Установка обработчика события и маски на все поля ввода номера телефона ***
  var _iterator = _createForOfIteratorHelper(telInputs),
      _step;

  try {
    var _loop = function _loop() {
      var telInput = _step.value;
      Inputmask({
        'mask': '+7 (999) 999-99-99'
      }).mask(telInput);
      telInput.addEventListener('change', function () {
        onInputChange(telInput);
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
/*
*** ------------------------------------- Модуль маски ввода номера телефона: КОНЕЦ -----------------------------------
*/


exports.setInputmask = setInputmask;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiateModalLogic = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
===================================================================================================================================
------------------------------------------- Модуль логики работы Модального окна: НАЧАЛО ------------------------------------------
===================================================================================================================================
*/
// ----------- КОНСТАНТЫ ----------
var PAGE_TOP = 0; // *** Словарик для значений клавиши "Escape" ***

var EscapeKey = {
  FULL_NAME: 'Escape',
  ABBREVIATED_NAME: 'Esc'
}; // --------- DOM-элементы ---------

var body = document.querySelector('body');
var modals = body.querySelectorAll('.modal');
var modalOverlay = body.querySelector('#modal-overlay');
var modalForm = modalOverlay.querySelector('form');
var formNameField = modalForm.querySelector('#callback-popup-customer-name');
var callbackButton = body.querySelector('#callback-button');
var callbackPopupCloseButton = body.querySelector('#callback-popup-close');
/*
======================== ОСНОВНАЯ ЛОГИКА ========================
*/

/*
*** Функция для расчёта расстояния, которое было
*** "проскроллено" от начала страницы
*/

var getBodyScrollTop = function getBodyScrollTop() {
  return self.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body && document.body.scrollTop;
};
/*
*** Функция-флаг для определения, СУЩЕСТВУЕТ ли
*** на странице Вертикальный скролл
*/


var isExistVerticalScroll = function isExistVerticalScroll() {
  return document.body.offsetHeight > window.innerHeight;
};
/*
*** Функция для обработчика события ЗАКРЫТИЯ попапа с Формой
*** при НАЖАТИИ на клавишу "Escape"
*/


var onEscPress = function onEscPress(evt) {
  if (evt.key === EscapeKey.FULL_NAME || evt.key === EscapeKey.ABBREVIATED_NAME) {
    evt.preventDefault();

    var _iterator = _createForOfIteratorHelper(modals),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var modalClose = _step.value;
        modalClose.classList.remove('modal--show');
      }
      /*
      *** ЕСЛИ Вертикальный скролл сущетвует,
      *** ВЕРНУТЬ возможность скролла страницы
      *** и "проскроллить" страницу на прежнее место
      */

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

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


var onModalOverlayClick = function onModalOverlayClick(evt) {
  if (evt.target === modalOverlay) {
    var _iterator2 = _createForOfIteratorHelper(modals),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var modalClose = _step2.value;
        modalClose.classList.remove('modal--show');
      }
      /*
      *** ЕСЛИ Вертикальный скролл сущетвует,
      *** ВЕРНУТЬ возможность скролла страницы
      *** и "проскроллить" страницу на прежнее место
      */

    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

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


var onCallbackPopupClose = function onCallbackPopupClose(evt) {
  evt.preventDefault();

  var _iterator3 = _createForOfIteratorHelper(modals),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var modalClose = _step3.value;
      modalClose.classList.remove('modal--show');
    }
    /*
    *** ЕСЛИ Вертикальный скролл сущетвует,
    *** ВЕРНУТЬ возможность скролла страницы
    *** и "проскроллить" страницу на прежнее место
    */

  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  if (isExistVerticalScroll()) {
    body.classList.remove('body-scroll-disabled');
    window.scrollTo(PAGE_TOP, body.dataset.scrollY);
  }

  modalForm.reset();
  callbackPopupCloseButton.removeEventListener('click', onCallbackPopupClose);
  modalOverlay.removeEventListener('click', onModalOverlayClick);
  document.removeEventListener('keydown', onEscPress);
}; // *** Функция для обработчика события ОТКРЫТИЯ попапа с Формой обратной связи ***


var onCallbackButtonClick = function onCallbackButtonClick(evt) {
  evt.preventDefault();

  var _iterator4 = _createForOfIteratorHelper(modals),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var modalOpen = _step4.value;
      modalOpen.classList.add('modal--show');
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  formNameField.focus(); // --- Расчёт проскролленого расстояния от НАЧАЛА страницы ---

  body.dataset.scrollY = getBodyScrollTop();
  /*
  *** ЕСЛИ Вертикальный скролл сущетвует,
  *** УБРАТЬ возможность скролла страницы
  *** и "проскроллить" страницу на прежнее место
  */

  if (isExistVerticalScroll()) {
    body.classList.add('body-scroll-disabled');
    body.style.top = "-".concat(body.dataset.scrollY, "px");
  }

  callbackPopupCloseButton.addEventListener('click', onCallbackPopupClose);
  modalOverlay.addEventListener('click', onModalOverlayClick);
  document.addEventListener('keydown', onEscPress);
};
/*
 * ===---===---=== ГЛАВНАЯ ФУНКЦИЯ ===---===---===
 */


var initiateModalLogic = function initiateModalLogic() {
  callbackButton.addEventListener('click', onCallbackButtonClick);
};
/*
*** --------------------------------------------- Модуль логики Модального окна: КОНЕЦ --------------------------------------------
*/


exports.initiateModalLogic = initiateModalLogic;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveToLocalStorage = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
===================================================================================================================================
--------------------------------------- Модуль сохранения данных Формы в localStorage: НАЧАЛО -------------------------------------
===================================================================================================================================
*/
// ---------- КОНСТАНТЫ -----------
var FormField = {
  TYPE_TEXT: 'text',
  TYPE_TEL: 'tel',
  TAG_TEXTAREA: 'textarea'
}; // --------- DOM-элементы ---------

var formInputs = document.querySelectorAll('form input');
var formTextareas = document.querySelectorAll('form textarea');
/*
======================== ОСНОВНАЯ ЛОГИКА ========================
*/

/*
*** Ф-ция для обработчика события ИЗМЕНЕНИЯ значения
*** в поле ввода
*/

var onFormFieldChange = function onFormFieldChange(fieldToSave) {
  localStorage.setItem(fieldToSave.name, fieldToSave.value);
}; // *** Ф-ция для СОХРАНЕНИЯ значений полей Формы в `localStorage` ***


var saveValueToLocalStorage = function saveValueToLocalStorage(formFields) {
  var _iterator = _createForOfIteratorHelper(formFields),
      _step;

  try {
    var _loop = function _loop() {
      var formFieldToSave = _step.value;
      var typeOfField = formFieldToSave.getAttribute('type');
      var tagNameOfField = formFieldToSave.tagName.toLowerCase();

      if (typeOfField === FormField.TYPE_TEXT || typeOfField === FormField.TYPE_TEL || tagNameOfField === FormField.TAG_TEXTAREA) {
        formFieldToSave.addEventListener('change', function () {
          onFormFieldChange(formFieldToSave);
        });
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
/*
 * ===---===---=== ГЛАВНАЯ ФУНКЦИЯ ===---===---===
 */


var saveToLocalStorage = function saveToLocalStorage() {
  /*
  *** Вызовы ф-ции СОХРАНЕНИЯ значений в `localStorage`
  *** для каждой коллекции элементов ввода
  */
  saveValueToLocalStorage(formInputs);
  saveValueToLocalStorage(formTextareas);
};
/*
*** --------------------------------------- Модуль сохранения данных Формы в localStorage: КОНЕЦ ---------------------------------------
*/


exports.saveToLocalStorage = saveToLocalStorage;

},{}]},{},[1,2,3,4,5,6]);
