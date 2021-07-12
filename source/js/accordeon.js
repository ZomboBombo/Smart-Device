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
