let profile = document.querySelector('.profile__button-red');
let popup = document.querySelector('.popup');
let popup_close = document.querySelector('.popup__close');

let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

let formElement = document.querySelector('.popup__form');

let popup_name = document.querySelector('.popup__input_info_name'); 
let popup_about = document.querySelector('.popup__input_info_about');

function openPopup() {
    popup_name.value  = name.textContent;
    popup_about.value  = about.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = popup_name.value;
    about.textContent = popup_about.value;
    closePopup();
}

profile.addEventListener('click', openPopup); 
popup_close.addEventListener('click', closePopup); 
formElement.addEventListener('submit', formSubmitHandler);

