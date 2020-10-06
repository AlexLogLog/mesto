let profile = document.querySelector('.profile__button-red');
let popup = document.querySelector('.popup');
let popup_close = document.querySelector('.popup__close');

let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

let formElement = document.querySelector('.popup__form');

let popup_name = document.querySelector('.popup__name'); 
let popup_about = document.querySelector('.popup__about');

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = popup_name.value;
    about.textContent = popup_about.value;
    popup.classList.remove('popup_opened');
}

function OpenPopup() {
    popup.classList.add('popup_opened');
    popup_name.value  = name.textContent;
    popup_about.value  = about.textContent;
}

function ClosePopup() {
    popup.classList.remove('popup_opened');
}



profile.addEventListener('click', OpenPopup); 
popup_close.addEventListener('click', ClosePopup); 
formElement.addEventListener('submit', formSubmitHandler);

