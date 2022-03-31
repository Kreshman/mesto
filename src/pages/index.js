import './index.css';
import Section from "../scripts/section.js";
import FormValidation from "../scripts/FormValidation.js";
import { validationObj } from "../scripts/validate.js";
import Card from "../scripts/Card.js";
import { initialCards } from "../scripts/initial-cards.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
// Добавление модификатора селектору
const popupElementProfile = document.querySelector('.popup-edit');
const popupElementCard = document.querySelector('.popup-editadd');
const popupElementImg = document.querySelector('.popupimg');
// button элементы для открытия попапа
const popupOpenProfile = document.querySelector('.profile__edit');
const popupOpenCard = document.querySelector('.profile__add');
// button элемент для закрытия попапа
const closePopupProfile = document.querySelector('.popup__close-profile');
const closePopupCard = document.querySelector('.popup__close-card');
const closePopupImg = document.querySelector('.popup__close-img');
const profileElementFirstname = document.querySelector('.profile__title');
const profileElementText = document.querySelector('.profile__subtitle');
const popupIdName = document.getElementById('name');
const popupIdText = document.getElementById('text');
const profileCardForm = document.querySelector('.popup__form');
const formPopupCards = document.querySelector('.popup-editadd__form');
const cardsElements = document.querySelector('.elements');
const inputName = document.getElementById('namenew');
const inputLink = document.getElementById('link');
const popupImg = document.querySelector('.popupimg__img');
const popupImgText = document.querySelector('.popupimg__text');

const profileFormValidation = new FormValidation(validationObj, profileCardForm);
const cardFormValidation = new FormValidation(validationObj, formPopupCards);

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    addEventListenerPopup(popup);
}

function addEventListenerPopup(popup) {
    document.addEventListener('keydown', useEsc);
    popup.addEventListener('click', clickOverlay);
}

function removeEventListenerPopup(popup) {
    document.removeEventListener('keydown', useEsc);
    popup.removeEventListener('click', clickOverlay);
}

function useEsc(evt) {
    const esc = 'Escape';
    if (evt.key === esc) {
        const openPopupNow = document.querySelector('.popup_is-opened');
        closePopup(openPopupNow);
    }
}

function clickOverlay(evt) {
    const openPopups = evt.target;
    if (evt.target === evt.currentTarget) {
        closePopup(openPopups);
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    removeEventListenerPopup(popup);
}

function removePopupClick(evt) {
    const opensPopup = evt.target.closest('.popup_is-opened');
    closePopup(opensPopup);
};

const handleProfileFormSubmit = function (event) {
    event.preventDefault();
    profileElementFirstname.textContent = popupIdName.value;
    profileElementText.textContent = popupIdText.value;
    closePopup(popupElementProfile);
};

function addNewCard() {
    const newCard = {
        name: inputName.value,
        link: inputLink.value,
    }
    const cardNewElement = renderNewCard(newCard);
    cardsElements.prepend(cardNewElement);
}

//колбек самбита добавления карточек
function addCards(event) {
    event.preventDefault();
    addNewCard();
    inputName.value = '';
    inputLink.value = '';
    closePopup(popupElementCard);
}

function renderNewCards() {
    initialCards.forEach((element) => {
        const cardNewElement = renderNewCard(element);
        cardsElements.prepend(cardNewElement);
    });
}

function renderNewCard(element) {
    const card = new Card(element, '.item_template', renderOpenPopupImg);
    const cardNewElement = card.createCard();
    return cardNewElement;
}

function renderOpenPopupImg(event) {
    popupImg.src = event.target.src;
    popupImg.alt = event.target.alt;
    popupImgText.textContent = event.target.alt;
    openPopup(popupElementImg);
}

// Слушатели событий
popupOpenProfile.addEventListener('click', () => {
    profileFormValidation.disableButton();
    popupIdName.value = profileElementFirstname.textContent;
    popupIdText.value = profileElementText.textContent;
    openPopup(popupElementProfile);
    profileFormValidation.clearErrorValidate();
});

popupOpenCard.addEventListener('click', () => {
    openPopup(popupElementCard);
    formPopupCards.reset();
    cardFormValidation.clearErrorValidate();
    cardFormValidation.toggleButtonState();
});

closePopupProfile.addEventListener('click', removePopupClick);
closePopupCard.addEventListener('click', removePopupClick);
closePopupImg.addEventListener('click', removePopupClick);
profileCardForm.addEventListener('submit', handleProfileFormSubmit);
formPopupCards.addEventListener('submit', addCards);

function enableValidation() {
    profileFormValidation.enableValidation();
    cardFormValidation.enableValidation();
}

renderNewCards();
enableValidation();