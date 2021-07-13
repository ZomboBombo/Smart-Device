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
