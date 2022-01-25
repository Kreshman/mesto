export default class FormValidation {
    constructor(data, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
    }
    _inputs = Array.from(document.querySelectorAll('.popup__input'));
    enableValidation() {
        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setListenersForm();
    }
    _setListenersForm() {
        this._inputs.forEach((input) => {
            this._addListenersInput(input);
        });
        this._formSelector.addEventListener('input', () => {
            this._handleFormInput();
        });
        this._buttonToggle();
    }
    _addListenersInput(input) {
        const errorContainer = document.querySelector(`#${input.id}-error`);
        input.addEventListener('input', () => {
            this._handleFieldValidation(input, errorContainer);
        });
    }
    _handleFormInput(){
        this._buttonToggle();
    }
    _buttonToggle(){
        const button = this._formSelector.querySelector(this._submitButtonSelector);
        const isFormInvalid = !this._formSelector.checkValidity();
        button.disabled = isFormInvalid;
        button.classList.toggle(this._inactiveButtonClass, isFormInvalid);
    }
    _handleFieldValidation(input, errorContainer) {
        input.classList.toggle(this._inputErrorClass, !input.validity.valid);
        errorContainer.textContent = input.validationMessage;
    }
    clearErrorValidate() {
        this._inputs.forEach((input) => {
            input.classList.remove(this._inputErrorClass);
            input.nextElementSibling.textContent = '';
        });
    }
    disableButton() {
        const button = this._formSelector.querySelector(this._submitButtonSelector);
        button.disabled = true;
        button.classList.add(this._inactiveButtonClass);
    }
}
    // function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) {
    //     const forms = Array.from(document.querySelectorAll(formSelector)); // Нашли все формы по селектору формы
    //     forms.forEach(form => { // накладываем процесса валидации 
    //         form.addEventListener('submit', (evt) => {
    //             evt.preventDefault();// отключили стандартное поведение для формы.
    //         });
    //         handleFieldValidation(form, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass });
    //     })
    // }
    
    // function handleFieldValidation(form, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) {
    //     const inputs = Array.from(form.querySelectorAll(inputSelector)); // находим все инпуты в форме
    //     inputs.forEach(input => { // Накладываем обработчик на инпуты
    //         input.addEventListener('input', () => { // Проверяем input на валидность 
    //             input.classList.toggle(inputErrorClass, !input.validity.valid);
    //             const errorContainer = document.querySelector(`#${input.id}-error`);
    //             errorContainer.textContent = input.validationMessage;
    //         });
    //     });
    //     buttonToggle(form, { submitButtonSelector, inactiveButtonClass });
    //     form.addEventListener('input', () => {
    //         buttonToggle(form, { submitButtonSelector, inactiveButtonClass });
    //     });
    // };
    
    // function buttonToggle(form, { submitButtonSelector, inactiveButtonClass }) {
    //     const button = form.querySelector(submitButtonSelector);
    //     const isFormInvalid = !form.checkValidity(); // ЗАДАЕМ КОНСТАНТЕ ПЕРЕМЕННУЮ ПРОВЕРКУ ВАЛИДНОСТИ КНОПКИ ЧЕРЕЗ checkValidity ЕСЛИ КНОПКА НЕ ВАЛИДНА ПРИМЕНЯЕМ DISABLED 
    //     button.disabled = isFormInvalid; // ПРОВЕРЯЕМ ВАЛИДНОСТЬ КНОПКИ ЧЕРЕЗ checkValidity ЕСЛИ КНОПКА НЕ ВАЛИДНА ПРИМЕНЯЕМ DISABLED 
    //     button.classList.toggle(inactiveButtonClass, isFormInvalid); // ДОБАВЛЯЕМ КЛАСС КНОПКИ ЕСЛИ ОНА НЕ ВАЛИДНА
    // }
    
    // enableValidation(validationObj);

