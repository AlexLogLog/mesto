let profile = document.querySelector('.profile__button-red');

let popupUser = document.querySelector('.popup_type_user');
let popupClose = popupUser.querySelector('.popup__close');

let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

let formElementUser = popupUser.querySelector('.popup__form');

let popupName = popupUser.querySelector('.popup__input_info_name-profile'); 
let popupAbout = popupUser.querySelector('.popup__input_info_about-profile');

function openPopupUser() {
    popupName.value  = name.textContent;
    popupAbout.value  = about.textContent;
    popupUser.classList.add('popup_opened');
    
}

function closePopupUser() {
    popupUser.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = popupName.value;
    about.textContent = popupAbout.value;
    closePopupUser();
}

profile.addEventListener('click', openPopupUser); 
popupClose.addEventListener('click', closePopupUser); 
formElementUser.addEventListener('submit', formSubmitHandler);


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const photo = document.querySelector('.popup_type_photo');

function addCard(name, link) {
    
    const conte = document.querySelector('.card');

    const cardTemplate = document.querySelector('.card__id').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__name').textContent = name;
    cardElement.querySelector('.card__img').src = link;
    cardElement.querySelector('.card__img').alt = name;
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
    });
    cardElement.querySelector('.card__basket').addEventListener('click', function (evt) {
        
        const listItem =  evt.target.closest('.card__element');
        listItem.remove();
    });

    cardElement.querySelector('.card__img').addEventListener('click', function (evt) {
        
        photo.classList.add('popup_opened');

        photo.querySelector('.popup__photo-image').src = link;
        photo.querySelector('.popup__photo-image').alt = name;
        photo.querySelector('.popup__photo-name').textContent = name;
        
    });

    conte.prepend(cardElement);
    
}

initialCards.forEach(function (el) {
    addCard(el.name, el.link);
});

let card = document.querySelector('.profile__button-new');

let popupCard = document.querySelector('.popup_type_card');
let popupCloseCard = popupCard.querySelector('.popup__close');


let formElementCard = popupCard.querySelector('.popup__form');

function openPopupCard() {
    popupCard.classList.add('popup_opened');
}

function closePopupCard() {
    popupCard.classList.remove('popup_opened');
    popupCard.querySelector('.popup__input_info_name-photo').value = '';
    popupCard.querySelector('.popup__input_info_link-photo').value = '';
}

card.addEventListener('click', openPopupCard); 
popupCloseCard.addEventListener('click', closePopupCard); 
formElementCard.addEventListener('submit', function (evt) {
    
    evt.preventDefault();
    const name = popupCard.querySelector('.popup__input_info_name-photo').value;
    const link = popupCard.querySelector('.popup__input_info_link-photo').value;
  
    addCard(name, link);
    closePopupCard();
    
  });

const closePhoto = document.querySelector('.popup__close_type_photo');

function photoClode() {
    photo.classList.remove('popup_opened');
}

closePhoto.addEventListener('click', photoClode);