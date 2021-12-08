// Добавление модификатора селектору
const popupElementProfile = document.querySelector('.popup-edit');
const popupElementCard = document.querySelector('.popup-editadd');
const popupElementImg = document.querySelector('.popupimg');
// button элементы для открытия попапа
const popupOpenProfile = document.querySelector('.profile__edit');
const popupOpenCard = document.querySelector('.profile__add');
const popupOpenImg = document.querySelector('.elements__photo');
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
const itemTemplate = document.querySelector('.item_template');
const cardsElements = document.querySelector('.elements');
const inputName = document.getElementById('namenew');
const inputLink = document.getElementById('link');
const popupImg = document.querySelector('.popupimg__img');
const popupImgText = document.querySelector('.popupimg__text');

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

// ф-ция создания карточки
function renderNewCard(element) {
    const cardElement = itemTemplate.content.cloneNode(true);
    const cardElementImg = cardElement.querySelector('.elements__photo');
    cardElement.querySelector('.elements__title').textContent = element.name;
    cardElementImg.src = element.link;
    cardElementImg.alt = element.name;
    setCardListeners(cardElement);
    return cardElement;
}

// ф-ция добавления пользовательской карточки
function addNewCard() {
    const newCard = {
        name: inputName.value,
        link: inputLink.value,
    }
    renderCard(newCard);
}
// ***
function disabledButton(formPopupCards) {
    const saveButtonElements = Array.from(formPopupCards.querySelectorAll('.popup__save'));
    saveButtonElements.forEach(button => {
        button.classList.add('popup__save_state_invalid');
        button.disabled = true;
    })
};

//колбек самбита добавления карточек
function addCards(event) {
    event.preventDefault();
    addNewCard();
    inputName.value = '';
    inputLink.value = '';
    closePopup(popupElementCard);
    disabledButton(formPopupCards);
}

function renderCard(element) {
    const cardNewElement = renderNewCard(element);
    cardsElements.prepend(cardNewElement);
}

function renderNewCards() {
    initialCards.forEach((element) => {
        renderCard(element);
    });
}

function setCardListeners(element) {
    element.querySelector('.elements__like').addEventListener('click', switchLike);
    element.querySelector('.elements__delete').addEventListener('click', deleteCard);
    element.querySelector('.elements__photo').addEventListener('click', renderOpenPopupImg);
}

function switchLike(event) {
    event.target.classList.toggle('elements__like_black');
}

function deleteCard(event) {
    event.target.closest('.elements__element').remove();
};

function renderOpenPopupImg(event) {
    popupImg.src = event.target.src;
    popupImg.alt = event.target.alt;
    popupImgText.textContent = event.target.alt;
    openPopup(popupElementImg);
}
// ***
function removeError(profileCardForm) {
    const removedRedLine = Array.from(profileCardForm.querySelectorAll('.popup__input'));
    removedRedLine.forEach(redLine => {
        redLine.classList.remove('popup__input_state_invalid');
    });
    const removedSpanText = Array.from(profileCardForm.querySelectorAll('.error'));
    removedSpanText.forEach(spanText => {
        spanText.textContent = "";
    });
}

// Слушатели событий
popupOpenProfile.addEventListener('click', () => {
    popupIdName.value = profileElementFirstname.textContent;
    popupIdText.value = profileElementText.textContent;
    removeError(profileCardForm);
    openPopup(popupElementProfile);
});

popupOpenCard.addEventListener('click', () => {
    openPopup(popupElementCard);
});

closePopupProfile.addEventListener('click', removePopupClick);
closePopupCard.addEventListener('click', removePopupClick);
closePopupImg.addEventListener('click', removePopupClick);
profileCardForm.addEventListener('submit', handleProfileFormSubmit);
formPopupCards.addEventListener('submit', addCards);

renderNewCards();