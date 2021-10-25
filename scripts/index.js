const popupElement = document.querySelector('.popup-edit');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const popupCloseButtonElement = popupElement.querySelector('.popup-edit__close');
const profileElementFirstname = document.querySelector('.profile__title'); // Текст FirstName
const profileElementText = document.querySelector('.profile__subtitle'); // Текст subtitle 
const popupSaveButtonElement = document.querySelector('.popup-edit__save'); 
const popupIdName = document.getElementById('name');
const popupIdText = document.getElementById('text');

const addPopupVisibility = function(){
    popupElement.classList.add('popup-edit_is-opened');
    popupIdName.value = profileElementFirstname.textContent; 
    popupIdText.value = profileElementText.textContent;
};

const removePopupVisibility = function(){
    popupElement.classList.remove('popup-edit_is-opened');
};

const savePopup = function(){
    profileElementFirstname.textContent = popupIdName.value;
    profileElementText.textContent = popupIdText.value;
    popupElement.classList.remove('popup-edit_is-opened');
}

document.addEventListener("click", event=>{
    const element = event.target;
    if(element.classList.contains("elements__like")) {
    element.classList.toggle("elements__like_black")
    }
});

// Слушатели событий
popupOpenButtonElement.addEventListener('click', addPopupVisibility);
popupCloseButtonElement.addEventListener('click', removePopupVisibility);
popupSaveButtonElement.addEventListener('click', savePopup); 













// Вариант 1
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

// Вариант 2
// Array.from(document.querySelectorAll('.elements__like') ).forEach( element => { //Создали массив из элементов, выполняем указанную функцию 1 раз для эл-ов массива, запускаем функцию, 
//     element.addEventListener( 'click', function(){ // отслеживаем клик по эллементу массива 
//     const SwitchLike = this.classList.toggle('liked'); // присваивает классам метод toggle 
//     this.src = SwitchLike ? './img/blacklike.svg' : './img/like.svg'; // присваивает новый путь значении src через toggle
//     });
// });