export default class Popup {
    constructor(popupSelector) {
        this._container = document.querySelector(popupSelector);
        this.setEventListeners();
    }

    open() {
        this._container.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._container.classList.remove("popup_is-opened");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    setEventListeners() {
        this._container.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup_is-opened") ||
                evt.target.classList.contains("popup__close")) {
                this.close();
            }
        });
    }
}