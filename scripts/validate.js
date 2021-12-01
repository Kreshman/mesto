function enableValidation() { // Функция проверки на ВАЛИДНОСТЬ ФОРМ
    const forms = Array.from(document.querySelectorAll('.popup__form')); // Взяли все формы(объекты) в массив 
    forms.forEach(addListenersToForm); // ДЛЯ КАЖДОЙ ФОРМЫ БУДЕМ ПЕРЕДАВАТЬ МЕТОД (addListenersToForm)
}

function addListenersToForm(form) { // ФУНКЦИЯ ДЛЯ РАБОТЫ С КАЖДОЙ ФОРМОЙ 
    const inputs = Array.from(document.querySelectorAll('.popup__input')); //СОБРАЛИ ВСЕ INPUT В ОДИН МАССИВ INPUTS
    inputs.forEach(addListenersToInput);// ИСПОЛЬЗУЕМ КАЖДЫЙ INPUT 1 РАЗ ДЛЯ ВЫПОЛНЕНИЯ ФУНКЦИИ 
    form.addEventListener('submit', (evt) => {// ПРОШЛИ ПО ВСЕМ ФОРМАМ И ПРЕДОТВРАТИЛИ ДЕФОЛТНОЕ ПОВЕДЕНИЕ, РАНЕЕ МЫ ЭТО ДЕЛАЛА И У КАЖДОЙ ФОРМЫ В INDEX.JS СЕЙЧАС ОБОБЩИЛИ ПОД ВСЕМИ SUBMIT 
        evt.preventDefault();
    })
    form.addEventListener('input', handleFormInput); // ПЕРЕДАЕМ СЛУШАТЕЛЬ ФУНКЦИИ ПО БЛОКИРОВРКИ SUBMIT ПРИ УСЛОВИИ ЧТО ФОРМА НЕ ВАЛИДНА
    toggleButton(form); // ИСПОЛЬЗУЕМ ФУНКЦИЮ АКТИВАЦИИ КНОПКИ В КАЖДОЙ ИЗ ФОРМ
}

function handleFormInput(evt) {
    toggleButton(evt.currentTarget); // ВЫЗЫВАЕМ ФУНКЦИЮ И ОТСЛЕЖИВАЕМ ЕЁ ЧЕРЕЗ CURRENTTARGET ОБРАЩАЕМСЯ НА САМУ ФОРМУ 
}

function toggleButton(form) { // ФУНКЦИЯ ОТКЛЮЧЕНИЯ КНОПКИ 
    const button = form.querySelector('.popup__save'); // ПЕРЕМЕННОЙ BUTTON ПЕРЕДАЛИ КЛАСС КНОПКИ BUTTON
    const isFormInvalid = !form.checkValidity(); // ЗАДАЕМ КОНСТАНТЕ ПЕРЕМЕННУЮ ПРОВЕРКУ ВАЛИДНОСТИ КНОПКИ ЧЕРЕЗ checkValidity ЕСЛИ КНОПКА НЕ ВАЛИДНА ПРИМЕНЯЕМ DISABLED 
    button.disabled = isFormInvalid; // ПРОВЕРЯЕМ ВАЛИДНОСТЬ КНОПКИ ЧЕРЕЗ checkValidity ЕСЛИ КНОПКА НЕ ВАЛИДНА ПРИМЕНЯЕМ DISABLED 
    button.classList.toggle('popup__save_state_invalid', isFormInvalid); // ДОБАВЛЯЕМ КЛАСС КНОПКИ ЕСЛИ ОНА НЕ ВАЛИДНА
}

function addListenersToInput(input) { 
    input.addEventListener('input', handleFieldValidation);// СЛУШАТЕЛЬ INPUT ДЛЯ ВЫПОЛНЕНИЯ ФУНКЦИИ handleFieldValidation
}

function handleFieldValidation(evt) {// ПРОВЕРКА ВАЛИДАЦИИ НА КАЖДЫЙ ВВОД INPUT ЭЛЕМЕНТОВ 
    const element = evt.target;// ПРОВЕРКА ПОЛЯ НА ВАЛИДНОСТЬ, ТАРГЕТ ВЗЯЛИ В ОТДЕЛЬНУЮ ПЕРЕМЕННУЮ ЧТО БЫ ПРОЩЕ БЫЛО ПОНЯТЬ ЧТО ПРОИСХОДИТ
    const errorContainer = document.querySelector(`#${element.id}-error`);// ВЗЯЛИ ВСЕ SPAN ОШИБКИ ПО ID ERROR КОТОРЫЕ ПОПАДУТ ПОД ELEMENT 
    if (!element.validity.valid) {// ЕСЛИ INPUT НЕ ВАЛИДЕН 
        element.classList.add('popup__input_state_invalid');// ЕСЛИ INPUT НЕ ВАЛИДЕН ДОБАВИМ КРАСНОЕ ПОДЧЕРКИВАНИЕ 
    } else {
        element.classList.remove('popup__input_state_invalid');// ЕСЛИ INPUT ВАЛИДЕН УБЕРЕМ КРАСНОЕ ПОДЧЕРКИВАНИЕ 
    };
    // => ОБОБЩИТЬ УСЛОВИЯ ДОБАВЛЕНИЕ КЛАССА ПРИ НЕ ВАЛИДНОЙ ФОРМЕ:
    // element.classList.toggle('popup__input_state_invalid', !element.validity.valid); // ЕСЛИ НЕ ВАЛИДНАЯ ФОРМА ДОБАВИТЬ КЛАСС ЕСЛИ СТАЛА ВАЛИДНОЙ УБРАТЬ КЛАСС В СКОБКАХ НАЗВАНИЕ КЛАССА И УСЛОВИЕ
    errorContainer.textContent = element.validationMessage;// EСЛИ INPUT НЕ ВАДИЛЕН ВЫВЕСТИ В SPAN СООБЩЕНИЕ ОБ ОШИБКЕ ЧЕРЕЗ VALIDATIONMESSAGE*
}
enableValidation();