import './index.css';
import Section from "../components/Section.js";
import FormValidation from "../components/FormValidation.js";
import { validationObj } from "../utils/validate.js";
import Card from "../components/Card.js";
import { initialCards } from "../utils/initial-cards.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";
// Добавление модификатора селектору
// button элементы для открытия попапа
const popupOpenProfile = document.querySelector('.profile__edit');
const popupOpenCard = document.querySelector('.profile__add');
// button элемент для закрытия попапа
const profileElementFirstname = document.querySelector('.profile__title');
const profileElementText = document.querySelector('.profile__subtitle');
const popupIdName = document.getElementById('name');
const popupIdText = document.getElementById('text');
const profileCardForm = document.querySelector('.popup__form');
const formPopupCards = document.querySelector('.popup-editadd__form');
const cardsElements = document.querySelector('.elements');

const profileFormValidation = new FormValidation(validationObj, profileCardForm);
const cardFormValidation = new FormValidation(validationObj, formPopupCards);
const cardList = new Section({
    items: initialCards, renderer: (item) => {
        cardList.addItem(renderNewCard(item))
    }
}, cardsElements);

cardList.renderItems();

const userInfo = new UserInfo(profileElementFirstname, profileElementText);

const profilePopup = new PopupWithForm('.popup-edit', function handleFormSubmit(data) {
    console.log(data);

    userInfo.setUserInfo({ name: data.textname, text: data.text });
})

const addCardPopup = new PopupWithForm('.popup-editadd', (data) => {
    cardList.addItem(renderNewCard({ name: data.textname, link: data.link }))
})

const imgOpen = new PopupWithImage('.popupimg');

function renderNewCard(element) {
    const card = new Card(element, '.item_template', function renderOpenPopupImg() {
        imgOpen.open(element);
    });
    const cardNewElement = card.createCard();
    return cardNewElement;
}

// Слушатели событий
popupOpenProfile.addEventListener('click', () => {
    const { name, text } = userInfo.getUserInfo();
    profileFormValidation.disableButton();
    popupIdName.value = name;
    popupIdText.value = text;
    profilePopup.open();
    profileFormValidation.clearErrorValidate();
});

popupOpenCard.addEventListener('click', () => {
    addCardPopup.open();
    cardFormValidation.clearErrorValidate();
    cardFormValidation.toggleButtonState();
});

function enableValidation() {
    profileFormValidation.enableValidation();
    cardFormValidation.enableValidation();
}

enableValidation();