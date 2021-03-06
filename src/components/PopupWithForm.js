import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._container.querySelector(".popup__form");
        this._inputValues = {};
        this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    }

    _getInputValues() {
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    close() {
        super.close();
        this._form.reset();
    };

    setEventListeners() {
        super.setEventListeners();
        this._container.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }
}