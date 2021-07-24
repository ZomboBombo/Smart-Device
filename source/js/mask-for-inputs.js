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
