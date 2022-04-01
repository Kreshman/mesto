import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupElementText = document.querySelector(".popupimg__text");
        this._popupElementImage = document.querySelector(".popupimg__img");
    }
    open(data) {
        super.open();
        this._popupElementText.textContent = data.name;
        this._popupElementImage.src = data.link;
        this._popupElementImage.alt = data.name;
    }
}