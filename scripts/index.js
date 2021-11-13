// Добавление модификатора селектору
const popupElementProfile = document.querySelector('.popup-edit');
const popupElementCard = document.querySelector('.popup-editadd');
const popupElementImg = document.querySelector('.popupimg');
// button элементы для открытия попапа
const openPopup = document.querySelector('.open__popup');
const popupOpenProfile = document.querySelector('.profile__edit');
const popupOpenCard = document.querySelector('.profile__add');
const popupOpenImg = document.querySelector('.elements__photo');
// button элемент для закрытия попапа
const PopupClose = document.querySelector('.popup__close');
const closePopupProfile = document.querySelector('.popup__close-profile');
const closePopupCard = document.querySelector('.popup__close-card');
const closePopupImg = document.querySelector('.popup__close-img');

const profileElementFirstname = document.querySelector('.profile__title'); 
const profileElementText = document.querySelector('.profile__subtitle'); 
const popupIdName = document.getElementById('name');
const popupIdText = document.getElementById('text');
const formPopupCards = document.querySelector('.popup-editadd__form');
const itemTemplate = document.querySelector('.item_template');
const cardsElements = document.querySelector('.elements');
const inputName = document.getElementById('namenew');
const inputLink = document.getElementById('link');
const saveCard = document.getElementById('buttonsavecard');
const popupImg = document.querySelector('.popupimg__img');
const popupImgText = document.querySelector('.popupimg__text');
const popupImgClose = document.querySelector('.popup__close');

function openisPopup(popup) {
    popup.classList.add('popup_is-opened');
};

function closesPopup(popup) {
    popup.classList.remove('popup_is-opened');
};

function removePopupClick(evt) {
    const openidPopup = evt.target.closest('.popup_is-opened');
    closesPopup(openidPopup);
};

const savePopup = function(event){
    event.preventDefault();
    profileElementFirstname.textContent = popupIdName.value;
    profileElementText.textContent = popupIdText.value;
    closesPopup(popupElementProfile);
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

//колбек самбита добавления карточек
function addCards(event){
    event.preventDefault();
    addNewCard();
    closesPopup(popupElementCard);
}

function renderNewCards() {
    initialCards.forEach((element) => {
        renderCard(element);
    });
}

function renderCard(element) {
    const cardNewElement = renderNewCard(element);
    cardsElements.prepend(cardNewElement);
}

function setCardListeners(element) {
    element.querySelector('.elements__like').addEventListener('click', switchLike);
    element.querySelector('.elements__delete').addEventListener('click', deleteCard);
    element.querySelector('.elements__photo').addEventListener('click', renderOpenPopupImg);
}

function switchLike(event) {
    event.target.classList.toggle('elements__like_black');
}
// Вариант 2,3,4 смена лайка 
// document.addEventListener("click", event=>{
//     const switchLike = event.target;
//     if(switchLike.classList.contains("elements__like")) {
//         switchLike.classList.toggle("elements__like_black")
//     }
// });
// Варинат 3
// Array.from(document.querySelectorAll('.elements__like') ).forEach( element => { //Создали массив из элементов, выполняем указанную функцию 1 раз для эл-ов массива, запускаем функцию, 
//     element.addEventListener( 'click', function(){ // отслеживаем клик по эллементу массива 
//     const SwitchLike = this.classList.toggle('liked'); // присваивает классам метод toggle 
//     this.src = SwitchLike ? './img/blacklike.svg' : './img/like.svg'; // присваивает новый путь значении src через toggle
//     });
// });
// Вариант 4
// const switchLike = document.querySelectorAll('.elements__like'); // взяли список всех эллементов под массив
// switchLike.forEach(element=>{ // выполняем функцию 1 раз для всех элементов 
// element.addEventListener('click', function() { // остлеживаем функцию на выполнение клика
//     image = element.getAttribute('src');// запросили атрибут и присовили image 
//     if (image === './img/like.svg') {
//         element.removeAttribute('src');
//         element.setAttribute('src', './img/blacklike.svg');// отключаем отрибут и подключаем новый
//     } else {
//         element.removeAttribute('src');
//         element.setAttribute('src', './img/like.svg');
//     }
// })
// })

function deleteCard(event) {
    event.target.closest('.elements__element').remove();
};
//Вариант 2
// Array.from(document.querySelectorAll('.elements__delete')).forEach (element => {
//     element.addEventListener('click', function(event){
//         event.target.closest('.elements__element').remove();
//     })
// })

function renderOpenPopupImg (event){
    popupImg.src = event.target.src;
    popupImg.alt = event.target.alt;
    popupImgText.textContent = event.target.alt;
    openisPopup(popupElementImg);
}

// Слушатели событий
popupOpenProfile.addEventListener('click', () => {
    popupIdName.value = profileElementFirstname.textContent;
    popupIdText.value = profileElementText.textContent;
    openisPopup(popupElementProfile);
});
popupOpenCard.addEventListener('click', () => {
    inputName.value = '';
    inputLink.value = '';
    openisPopup(popupElementCard);
});
closePopupProfile.addEventListener('click', removePopupClick);
closePopupCard.addEventListener('click', removePopupClick);
closePopupImg.addEventListener('click', removePopupClick);
popupform.addEventListener('submit', savePopup);
formPopupCards.addEventListener('submit', addCards);

renderNewCards();