import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupElementText = this._container.querySelector(".popupimg__text");
        this._popupElementImage = this._container.querySelector(".popupimg__img");
    }
    open(data) {
        super.open();
        this._popupElementText.textContent = data.name;
        this._popupElementImage.src = data.link;
        this._popupElementImage.alt = data.name;
    }
}