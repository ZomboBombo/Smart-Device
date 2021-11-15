/*
===================================================================================================================================
--------------------------------------- Модуль сохранения данных Формы в localStorage: НАЧАЛО -------------------------------------
===================================================================================================================================
*/

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
 * ===---===---=== ГЛАВНАЯ ФУНКЦИЯ ===---===---===
 */
const saveToLocalStorage = () => {

  /*
  *** Вызовы ф-ции СОХРАНЕНИЯ значений в `localStorage`
  *** для каждой коллекции элементов ввода
  */
  saveValueToLocalStorage(formInputs);
  saveValueToLocalStorage(formTextareas);
};


export { saveToLocalStorage };

/*
*** --------------------------------------- Модуль сохранения данных Формы в localStorage: КОНЕЦ ---------------------------------------
*/
