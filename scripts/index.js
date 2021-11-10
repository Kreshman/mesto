const popupElement = document.querySelector('.popup-edit');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const popupCloseButtonElement = document.querySelector('.popup-edit__close');
const profileElementFirstname = document.querySelector('.profile__title'); 
const profileElementText = document.querySelector('.profile__subtitle'); 
const popupIdName = document.getElementById('name');
const popupIdText = document.getElementById('text');
const popupElementAdd = document.querySelector('.popup-editadd');
const popupAddOpenButtonElement = document.querySelector('.profile__add');
const popupAddCloseButtonElement = popupElementAdd.querySelector('.popup-edit__close');
const formPopupCards = document.querySelector('.popup-editadd__form');
const itemTemplate = document.querySelector('.item_template');
const cardsElements = document.querySelector('.elements');
const inputName = document.getElementById('namenew');
const inputLink = document.getElementById('link');
const saveCard = document.getElementById('buttonsavecard');
const openPopupImg = document.querySelector('.popupimg');
const popupImg = document.querySelector('.popupimg__img');
const popupImgText = document.querySelector('.popupimg__text');
const popupImgClose = openPopupImg.querySelector('.popup-edit__close');


const addPopupImgVisibility = () => {
    openPopupImg.classList.add('popupimg__is-opened');
}

const removePopupImgVisibility = () => {
    openPopupImg.classList.remove('popupimg__is-opened');
}

const addPopupAddVisibility = () => {
    popupElementAdd.classList.add('popup-editadd_is-opened');
}

const removePopupAddVisibility = () => {
    popupElementAdd.classList.remove('popup-editadd_is-opened');
};

const addPopupVisibility = function(){
    popupElement.classList.add('popup-edit_is-opened');
    popupIdName.value = profileElementFirstname.textContent; 
    popupIdText.value = profileElementText.textContent;
};

const addPopupVisibilityCard = function(){
    popupElement.classList.add('popup-edit_is-opened');
}

const removePopupVisibility = function(){
    popupElement.classList.remove('popup-edit_is-opened');
};

const savePopup = function(event){
    event.preventDefault();
    profileElementFirstname.textContent = popupIdName.value;
    profileElementText.textContent = popupIdText.value;
    removePopupVisibility();
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
    removePopupAddVisibility();
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
    addPopupImgVisibility();
}

renderNewCards();

// Слушатели событий
popupAddOpenButtonElement.addEventListener('click', addPopupAddVisibility);
popupAddCloseButtonElement.addEventListener('click', removePopupAddVisibility);
popupOpenButtonElement.addEventListener('click', addPopupVisibility);
popupCloseButtonElement.addEventListener('click', removePopupVisibility);
popupImgClose.addEventListener('click', removePopupImgVisibility);
popupform.addEventListener('submit', savePopup);
formPopupCards.addEventListener('submit', addCards);
popupAddOpenButtonElement.addEventListener('click', () => {
    inputName.value = '';
    inputLink.value = '';
    addPopupAddVisibility();
});