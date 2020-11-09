import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const profile = document.querySelector('.profile__button-red');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');

const popupUser = document.querySelector('.popup_type_user');
const popupUserClose = popupUser.querySelector('.popup__close');
const formElementUser = popupUser.querySelector('.popup__form_type_profile');
const popupName = popupUser.querySelector('.popup__input_info_name-profile');
const popupAbout = popupUser.querySelector('.popup__input_info_about-profile');

const buttonSaveCard = document.querySelector('.popup__save_type_card');

const container = document.querySelector('.card');

const profileOpenButton = document.querySelector('.profile__button-new');

const popupCard = document.querySelector('.popup_type_card');
const popupCloseCard = popupCard.querySelector('.popup__close');
const cardInputName = popupCard.querySelector('.popup__input_info_name-photo');
const cardInputLink = popupCard.querySelector('.popup__input_info_link-photo');
const formElementCard = popupCard.querySelector('.popup__form');

export const popupPhoto = document.querySelector('.popup_type_photo');
export const closePhoto = document.querySelector('.popup__close_type_photo');
export const photoImg = popupPhoto.querySelector('.popup__photo-image');
export const photoName = popupPhoto.querySelector('.popup__photo-name');

function openPopupUser() {
    popupName.value = name.textContent;
    popupAbout.value = about.textContent;
    openPopup(popupUser);
    document.addEventListener('keydown', handleEscClick);

}

function closePopup(popupType) {
    popupType.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClick);
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = popupName.value;
    about.textContent = popupAbout.value;
    closePopup(popupUser);
}

profile.addEventListener('click', openPopupUser);
popupUserClose.addEventListener('click', function () {
    closePopup(popupUser);
});
formElementUser.addEventListener('submit', formSubmitHandler);


initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '.card__id');
    const cardElement = card.generateCard();
    container.append(cardElement);
  });


export function handleEscClick(e) {
    if (e.keyCode === 27) {
        const thisPopup =  document.querySelector('.popup_opened');
        closePopup(thisPopup);
    }
}

function openPopup(type) {
    type.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClick);
}

function closePopupCard() {
    closePopup(popupCard);
    cardInputName.value = '';
    cardInputLink.value = '';
    buttonSaveCard.classList.add('popup__save_inactive');
    buttonSaveCard.disabled = true;
}

profileOpenButton.addEventListener('click', function () {
    openPopup(popupCard);
});

popupCloseCard.addEventListener('click', closePopupCard);

formElementCard.addEventListener('submit', function (evt) {

    evt.preventDefault();
    const name = cardInputName.value;
    const link = cardInputLink.value;

    const card = new Card(name, link, '.card__id');
    const cardElement = card.generateCard();
    container.prepend(cardElement);
    closePopupCard();

});


popupPhoto.addEventListener('click', function (e) {
    if (e.target.classList.contains("popup")) {
        closePopup(popupPhoto);
    }
});


popupUser.addEventListener('click', function (e) {
    if (e.target.classList.contains("popup")) {
        closePopup(popupUser);
    }
});

popupCard.addEventListener('click', function (e) {
    if (e.target.classList.contains("popup")) {
        closePopup(popupCard);
    }
});


const popupValid = ['.popup_type_user', '.popup_type_card']

popupValid.forEach((item) => {
  const errorPopup = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }, item);
  
  errorPopup.enableValidation();
});

