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


  // --------- DOM-элементы ---------
  const telInputs = document.querySelectorAll('input[type="tel"]');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  /*
  *** Ф-ция для обработчика события ИЗМЕНЕНИЯ содержимого
  *** поля ввода номера телефона
  */
  const onInputChange = (inputElement) => {
    const regExpForInput = /^\d$/;
    const valueOfInput = inputElement.value;
    const inputValidityMessage = 'The phone number is incomplete. Please enter your phone number.';

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
      inputElement.setCustomValidity(inputValidityMessage);
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
