export default class Card {
    constructor(data, cardSelector, renderOpenPopupImg) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._image = data.link;
        this._renderOpenPopupImg = renderOpenPopupImg;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__element')
            .cloneNode(true)
        return cardElement;
    }
    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__photo').src = this._image;
        this._element.querySelector('.elements__photo').alt = this._name;
        this._element.querySelector('.elements__title').textContent = this._name;
        this._setCardListeners();
        return this._element;
    }
    _setCardListeners() {
        this._element
            .querySelector('.elements__like')
            .addEventListener('click', this._handleCardLike);
        this._element
            .querySelector('.elements__delete')
            .addEventListener('click', this._handleCardDelete);
        this._element
            .querySelector('.elements__photo')
            .addEventListener('click', this._renderOpenPopupImg);
    }
    _handleCardLike = (evt) => {
        evt.target.classList.toggle('elements__like_black');
    }
    _handleCardDelete = () => {
        this._element.remove();
        this._element = null;
    }
}