import '../pages/index.css';

import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';

const profile = document.querySelector('.profile__button-red');

const infoUser = new Object();
infoUser.name = document.querySelector('.profile__name');
infoUser.about = document.querySelector('.profile__about');

const popupUser = document.querySelector('.popup_type_user');
const formElementUser = popupUser.querySelector('.popup__form_type_profile');
export const popupName = popupUser.querySelector('.popup__input_info_name-profile');
export const popupAbout = popupUser.querySelector('.popup__input_info_about-profile');

export const buttonSaveCard = document.querySelector('.popup__save_type_card');

const container = document.querySelector('.card');

const profileOpenButton = document.querySelector('.profile__button-new');

const popupCard = document.querySelector('.popup_type_card');
export const cardInputName = popupCard.querySelector('.popup__input_info_name-photo');
export const cardInputLink = popupCard.querySelector('.popup__input_info_link-photo');
export const formElementCard = popupCard.querySelector('.popup__form');

export const popupPhoto = document.querySelector('.popup_type_photo');
export const closePhoto = document.querySelector('.popup__close_type_photo');
export const photoImg = popupPhoto.querySelector('.popup__photo-image');
export const photoName = popupPhoto.querySelector('.popup__photo-name');

export const UPPER_CASE = 27;


function popupValid(item) {
    const errorPopup = new FormValidator({
          formSelector: '.popup__form',
          inputSelector: '.popup__input',
          submitButtonSelector: '.popup__save',
          inactiveButtonClass: 'popup__save_inactive',
          inputErrorClass: 'popup__input_type_error',
          errorClass: 'popup__input-error_active'
        }, item);
        
        errorPopup.enableValidation();
};

function openPopupUser() {
    const profileNameAndAbout = new UserInfo(infoUser);
    profileNameAndAbout.getUserInfo();
    openPopup(popupUser);
    popupValid('.popup_type_user');

}

function closePopup(popupType) {
    const closePop = new Popup(popupType);
    closePop.close();
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    const profileNameAndAbout = new UserInfo(infoUser);
    profileNameAndAbout.setUserInfo();
    closePopup(popupUser);
}

profile.addEventListener('click', openPopupUser);

formElementUser.addEventListener('submit', formSubmitHandler);

function openPopup(type) {
    const openPop = new Popup(type);
    openPop.open();
}

profileOpenButton.addEventListener('click', function () {
    openPopup(popupCard);
    popupValid('.popup_type_card');
});


const inputPopupForm = new PopupWithForm(popupCard, (formInfo) => {
    const card = new Card(formInfo.name, formInfo.link, '.card__id', (cardImg) => {
        const openPopupImage = new PopupWithImage(popupPhoto);
        openPopupImage.open(cardImg);
    });
    const cardElement = card.generateCard();
    container.prepend(cardElement);
    inputPopupForm.close();
});
inputPopupForm.setEventListeners();


const initList = new Section(
    {item: initialCards, 
    renderer: (items) => {
        const card = new Card(items.name, items.link, '.card__id', (cardImg) => {
            const openPopupImage = new PopupWithImage(popupPhoto);
            openPopupImage.open(cardImg);
    
        });
        const cardElement = card.generateCard();
        initList.setItem(cardElement);
    }},
     '.card');

initList.renderItems();


