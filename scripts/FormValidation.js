export default class FormValidation {
    constructor(data, form) {
        this._form = form;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    }
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setListenersForm();
    }
    _setListenersForm() {
        this._inputs.forEach((input) => {
            this._addListenersInput(input);
        });
        this._form.addEventListener('input', () => {
            this._toggleButtonState();
        });
        this._toggleButtonState();
    }
    _addListenersInput(input) {
        const errorContainer = this._form.querySelector(`#${input.id}-error`);
        input.addEventListener('input', () => {
            this._handleFieldValidation(input, errorContainer);
        });
    }
    _toggleButtonState() {
        const button = this._form.querySelector(this._submitButtonSelector);
        const isFormInvalid = !this._form.checkValidity();
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
        const button = this._form.querySelector(this._submitButtonSelector);
        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
    }
}