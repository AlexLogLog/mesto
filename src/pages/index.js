import './index.css';

import { initialCards } from '../scripts/initialCards.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { Popup } from '../scripts/Popup.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { UserInfo } from '../scripts/UserInfo.js';

const profile = document.querySelector('.profile__button-red');

const infoUser = {
    name: document.querySelector('.profile__name'),
    about: document.querySelector('.profile__about')
};

const popupUser = document.querySelector('.popup_type_user');
const formElementUser = popupUser.querySelector('.popup__form_type_profile');
const popupName = popupUser.querySelector('.popup__input_info_name-profile');
const popupAbout = popupUser.querySelector('.popup__input_info_about-profile');

export const buttonSaveCard = document.querySelector('.popup__save_type_card');

const profileOpenButton = document.querySelector('.profile__button-new');

const popupCard = document.querySelector('.popup_type_card');

const popupPhoto = document.querySelector('.popup_type_photo');
const photoImg = popupPhoto.querySelector('.popup__photo-image');
const photoName = popupPhoto.querySelector('.popup__photo-name');

const validSelector = ['.popup_type_user', '.popup_type_card']; 

validSelector.forEach((item) => {
    const errorPopup = new FormValidator({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save',
        inactiveButtonClass: 'popup__save_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
      }, item);
      
      errorPopup.enableValidation();
})

const openPopupProfile = new Popup(popupUser);
openPopupProfile.setEventListeners();
const openPopupCard = new Popup(popupCard);
openPopupCard.setEventListeners();

const profileNameAndAbout = new UserInfo(infoUser);
function openPopupUser() {
    popupName.value = profileNameAndAbout.getUserInfo().userName;
    popupAbout.value =  profileNameAndAbout.getUserInfo().userDescription; 
    openPopupProfile.open();
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileNameAndAbout.setUserInfo(popupName.value, popupAbout.value);
    openPopupProfile.close();
}


profile.addEventListener('click', openPopupUser);

formElementUser.addEventListener('submit', formSubmitHandler);

profileOpenButton.addEventListener('click', function () {
    openPopupCard.open();
    buttonSaveCard.classList.add('popup__save_inactive');
    buttonSaveCard.disabled = true;
});


const openPopupImage = new PopupWithImage(popupPhoto, photoImg, photoName);
openPopupImage.setEventListeners();
function newCard(name, link, selector, cardInfo) {
    const card = new Card(name, link, selector, (infoNew) => {
        openPopupImage.open(infoNew);
    });
    const cardElement = card.generateCard();
    if (cardInfo === 'new') {
        copyCard.setItemNew(cardElement);
    } else if (cardInfo === 'list') {
        copyCard.setItemList(cardElement);
    }
    
}

const copyCard = new Section(
    {item: initialCards, 
    renderer: (items) => {
        newCard(items.name, items.link, '.card__id','list');}},
     '.card');


const inputPopupForm = new PopupWithForm(popupCard, (formInfo) => {
    newCard(formInfo.name, formInfo.link, '.card__id', 'new');
    inputPopupForm.close();
});
inputPopupForm.setEventListeners();

copyCard.renderItems();




