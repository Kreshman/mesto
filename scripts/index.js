//Открытие-Закрытие попап
const popupElement = document.querySelector('.popup-edit');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const popupCloseButtonElement = popupElement.querySelector('.popup-edit__close');
const togglePopupVisibility = function(){
    popupElement.classList.toggle('popup-edit_is-opened');
};
popupOpenButtonElement.addEventListener('click', togglePopupVisibility);
popupCloseButtonElement.addEventListener('click', togglePopupVisibility);

// Копирование строчек
const profileElementFirstname = document.querySelector('.profile__title'); // Текст FirstName
const profileElementText = document.querySelector('.profile__subtitle'); // Текст subtitle 
const popupEditFirstname = document.querySelector('.popup-edit__firstname'); // input FirstName 
const popupEditText = document.querySelector('.popup-edit__text'); // input text

popupEditFirstname.value = profileElementFirstname.textContent; // сохранили текст в input title
popupEditText.value = profileElementText.textContent; // сохранили текст в input subtitle

popupEditFirstname.oninput = function(){ // Сохранение текста в Html в title
    profileElementFirstname.textContent = popupEditFirstname.value; // Сохранение текста в Html в title
}
popupEditText.oninput = function(){ // Сохранение текста в Html в subtitle
    profileElementText.textContent = popupEditText.value; // Сохранение текста в Html в subtitle
}

const popupSaveButtonElement = document.querySelector('.popup-edit__save');
popupSaveButtonElement.addEventListener('click', togglePopupVisibility); //закрыть popup при нажатии кнопки сохранить


const switchLike = document.querySelectorAll('.elements__like'); // взяли список всех эллементов под массив
switchLike.forEach(element=>{ // выполняем функцию 1 раз для всех элементов 
element.addEventListener('click', function() { // остлеживаем функцию на выполнение клика
    image = element.getAttribute('src');// запросили атрибут и присовили image 
    if (image === './img/like.svg') {
        element.removeAttribute('src');
        element.setAttribute('src', './img/blacklike.svg');// отключаем отрибут и подключаем новый
    } else {
        element.removeAttribute('src');
        element.setAttribute('src', './img/like.svg');
    }
})
})

// Вариант 2
// Array.from(document.querySelectorAll('.elements__like') ).forEach( element => { //Создали массив из элементов, выполняем указанную функцию 1 раз для эл-ов массива, запускаем функцию, 
//     element.addEventListener( 'click', function(){ // отслеживаем клик по эллементу массива 
//     const SwitchLike = this.classList.toggle('liked'); // присваивает классам метод toggle 
//     this.src = SwitchLike ? './img/blacklike.svg' : './img/like.svg'; // присваивает новый путь значении src через toggle
//     });
// });