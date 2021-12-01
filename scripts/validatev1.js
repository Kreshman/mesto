const validationObj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_state_invalid', // Кнопка сохранить затемняем если есть ошибка
    inputErrorClass: 'popup__input_state_invalid', //Красное подчеркивание если есть ошибка
};

function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) {
    const forms = Array.from(document.querySelectorAll(formSelector)); // Нашли все формы по селектору формы
    forms.forEach(form => { // накладываем процесса валидации 
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();// отключили стандартное поведение для формы.
        });
        handleFieldValidation(form, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass });
    })
}

function handleFieldValidation(form, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) {
    const inputs = Array.from(form.querySelectorAll(inputSelector)); // находим все инпуты в форме
    inputs.forEach(input => { // Накладываем обработчик на инпуты
        input.addEventListener('input', () => { // Проверяем input на валидность 
            input.classList.toggle(inputErrorClass, !input.validity.valid);
            const errorContainer = document.querySelector(`#${input.id}-error`);
            errorContainer.textContent = input.validationMessage;
        });
    });
    buttonToggle(form, {submitButtonSelector, inactiveButtonClass});
    form.addEventListener('input', () => {
        buttonToggle(form, {submitButtonSelector, inactiveButtonClass});
    });
};

function buttonToggle(form, {submitButtonSelector, inactiveButtonClass}){
    const button = form.querySelector(submitButtonSelector);
    const isFormInvalid = !form.checkValidity(); // ЗАДАЕМ КОНСТАНТЕ ПЕРЕМЕННУЮ ПРОВЕРКУ ВАЛИДНОСТИ КНОПКИ ЧЕРЕЗ checkValidity ЕСЛИ КНОПКА НЕ ВАЛИДНА ПРИМЕНЯЕМ DISABLED 
    button.disabled = isFormInvalid; // ПРОВЕРЯЕМ ВАЛИДНОСТЬ КНОПКИ ЧЕРЕЗ checkValidity ЕСЛИ КНОПКА НЕ ВАЛИДНА ПРИМЕНЯЕМ DISABLED 
    button.classList.toggle(inactiveButtonClass, isFormInvalid); // ДОБАВЛЯЕМ КЛАСС КНОПКИ ЕСЛИ ОНА НЕ ВАЛИДНА
}

enableValidation(validationObj);