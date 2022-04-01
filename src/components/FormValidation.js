export default class FormValidation {
    constructor(data, form) {
        this._form = form;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this.button = this._form.querySelector(this._submitButtonSelector);
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
            this.toggleButtonState();
        });
        this.toggleButtonState();
    }
    _addListenersInput(input) {
        const errorContainer = this._form.querySelector(`#${input.id}-error`);
        input.addEventListener('input', () => {
            this._handleFieldValidation(input, errorContainer);
        });
    }
    toggleButtonState() {
        this.isFormInvalid = !this._form.checkValidity();
        this.button.disabled = this.isFormInvalid;
        this.button.classList.toggle(this._inactiveButtonClass, this.isFormInvalid);
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
        this.button.classList.add(this._inactiveButtonClass);
        this.button.disabled = true;
    }
}