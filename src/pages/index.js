import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { Api } from '../components/Api.js'

const profile = document.querySelector('.profile__button-red');

const infoUser = {
    name: document.querySelector('.profile__name'),
    about: document.querySelector('.profile__about'),
    img: document.querySelector('.profile__image')
};

const popupUser = document.querySelector('.popup_type_user');
const popupName = popupUser.querySelector('.popup__input_info_name-profile');
const popupAbout = popupUser.querySelector('.popup__input_info_about-profile');

const buttonSaveCard = document.querySelector('.popup__save_type_card');

const profileOpenButton = document.querySelector('.profile__button-new');

const popupCard = document.querySelector('.popup_type_card');

const popupPhoto = document.querySelector('.popup_type_photo');
const photoImg = popupPhoto.querySelector('.popup__photo-image');
const photoName = popupPhoto.querySelector('.popup__photo-name');

const iconRedact = document.querySelector('.profile__icon');
const popupAvatar = document.querySelector('.popup_type_avatar');

const popupDel = document.querySelector('.popup_type_confirm');

let layout  = null;
let id  = null;

const validSelector = ['.popup_type_user', '.popup_type_card', '.popup_type_avatar'];

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

function load(load, selector, nameButton) {
    if (load) {
        document.querySelector(selector).textContent = 'Coхранение...'
    } else {
        document.querySelector(selector).textContent = nameButton;
    } 

}

const profileNameAndAbout = new UserInfo(infoUser);
function openPopupUser() {
    const user = profileNameAndAbout.getUserInfo();
    popupName.value = user.userName;
    popupAbout.value = user.userDescription;
    openPopupProfile.open();
}

function createCard(data) {

    const card = new Card(data, '.card__id', id, {
        handleCardClick: (data) => {
            openPopupImage.open(data);
        },

        handleDeleteIconClick: () => {
            layout = card;
            popupDelete.openDeleteCard(data);
        },

        handleLikeClick: (data) => {
            api.countLikeApi(data)
                .then((data) => {
                    card.like();
                    card.countLike(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        handleDeleteLikeClick: (data) => {
            api.deleteLike(data)
                .then((data) => {
                    card.like();
                    card.countLike(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
    });
    return card;
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: 'ab8fdcd7-fa1e-487f-a234-e9eb9d7b21b3',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getInfoAndAvatar(), api.getCards()]) 
    .then((result) => {
        id = result[0]._id;
        profileNameAndAbout.setUserInfo(result[0].name, result[0].about);
        profileNameAndAbout.setUserImg(result[0].avatar);
        copyCard.renderItems(result[1]);

    })

const openProfileAvatar = new PopupWithForm(popupAvatar, (formInfo) => {
    load(true, '.popup__save_type_avatar', 'Сохранение');
    api.updateAvatar({ avatar: formInfo.link })
        .then((result) => {
            openProfileAvatar.close();
            load(false, '.popup__save_type_avatar', 'Сохранение');
            profileNameAndAbout.setUserImg(result.avatar);
        })
        .catch((err) => {
            console.log(err);
        });
});
openProfileAvatar.setEventListeners();

iconRedact.addEventListener('click', () => {
    openProfileAvatar.open();
})


const openPopupProfile = new PopupWithForm(popupUser, (formInfo) => {
    load(true, '.popup__save_type_profile', 'Сохранить');
    api.updateInfo({
        name: formInfo.profileName,
        about: formInfo.about,
    })
        .then((result) => {
            openPopupProfile.close();
            load(false, '.popup__save_type_profile', 'Сохранить');
            profileNameAndAbout.setUserInfo(result.name, result.about);
            profileNameAndAbout.setUserImg(result.avatar);
        })
        .catch((err) => {
            console.log(err);
        });
});

openPopupProfile.setEventListeners();


profile.addEventListener('click', openPopupUser);

profileOpenButton.addEventListener('click', function () {
    inputPopupForm.open();
    buttonSaveCard.classList.add('popup__save_inactive');
    buttonSaveCard.disabled = true;
});


const openPopupImage = new PopupWithImage(popupPhoto, photoImg, photoName);
openPopupImage.setEventListeners();




const copyCard = new Section(
    {
        renderer: (items) => {
            const card = createCard(items);
            const cardElement = card.generateCard();
            copyCard.setItemList(cardElement);
        }

    },
    '.card');


const inputPopupForm = new PopupWithForm(popupCard, (formInfo) => {
    load(true, '.popup__save_type_card', 'Создать');
    api.newCard({
        name: formInfo.name,
        link: formInfo.link
    })
        .then((items) => {
            inputPopupForm.close();
            load(false, '.popup__save_type_card', 'Создать');
            const card = createCard(items);
            const cardElement = card.generateCard();
            copyCard.setItemNew(cardElement);
        }
        )
        .catch((err) => {
            console.log(err);
        })
});
inputPopupForm.setEventListeners();

const popupDelete = new PopupWithSubmit(popupDel, {
    handleFormSubmit: (info) => {
        load(true, '.popup__save_type_confirm', 'Да');
        api.deleteCard(info)
            .then(() => {
                load(false, '.popup__save_type_confirm', 'Да');
                layout.deleteCard();
            })
            .then(() => {
                popupDelete.close();
            })
            .catch((err) => {
                console.log(err);
            })
    }
});
popupDelete.setEventListeners();