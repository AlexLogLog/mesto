let profile = document.querySelector('.profile__button-red');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');

let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

let formElement = document.querySelector('.popup__form');

let popupName = document.querySelector('.popup__input_info_name'); 
let popupAbout = document.querySelector('.popup__input_info_about');

function openPopup() {
    popupName.value  = name.textContent;
    popupAbout.value  = about.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = popupName.value;
    about.textContent = popupAbout.value;
    closePopup();
}

profile.addEventListener('click', openPopup); 
popupClose.addEventListener('click', closePopup); 
formElement.addEventListener('submit', formSubmitHandler);

