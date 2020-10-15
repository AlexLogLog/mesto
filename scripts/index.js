const profile = document.querySelector('.profile__button-red');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');

const popupUser = document.querySelector('.popup_type_user');
const popupClose = popupUser.querySelector('.popup__close');


const formElementUser = popupUser.querySelector('.popup__form');

const popupName = popupUser.querySelector('.popup__input_info_name-profile'); 
const popupAbout = popupUser.querySelector('.popup__input_info_about-profile');

function openPopupUser() {
    popupName.value  = name.textContent;
    popupAbout.value  = about.textContent;
    openPopup(popupUser);
    
}

function closePopup(popupType) {
    popupType.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = popupName.value;
    about.textContent = popupAbout.value;
    closePopup(popupUser);
}

profile.addEventListener('click', openPopupUser); 
popupClose.addEventListener('click', function() {
    closePopup(popupUser);
}); 
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

const popupPhoto = document.querySelector('.popup_type_photo');

const conte = document.querySelector('.card');
const cardTemplate = document.querySelector('.card__id').content;
function createCard(name, link) {
    

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

    cardElement.querySelector('.card__img').addEventListener('click', function () {
        
        openPopup(popupPhoto);

        popupPhoto.querySelector('.popup__photo-image').src = link;
        popupPhoto.querySelector('.popup__photo-image').alt = name;
        popupPhoto.querySelector('.popup__photo-name').textContent = name;
        
    });

    return cardElement;
}



initialCards.forEach(function (el) {
    conte.append(createCard(el.name, el.link));
});

const card = document.querySelector('.profile__button-new');

const popupCard = document.querySelector('.popup_type_card');
const popupCloseCard = popupCard.querySelector('.popup__close');


const formElementCard = popupCard.querySelector('.popup__form');

function openPopup(type) {
    type.classList.add('popup_opened');
}

function closePopupCard() {
    closePopup(popupCard);
    popupCard.querySelector('.popup__input_info_name-photo').value = '';
    popupCard.querySelector('.popup__input_info_link-photo').value = '';
}

card.addEventListener('click', function() {
    openPopup(popupCard);
}); 
popupCloseCard.addEventListener('click', closePopupCard); 
formElementCard.addEventListener('submit', function (evt) {
    
    evt.preventDefault();
    const name = popupCard.querySelector('.popup__input_info_name-photo').value;
    const link = popupCard.querySelector('.popup__input_info_link-photo').value;
  
    
    conte.prepend(createCard(name, link));
    closePopupCard();
    
  });

const closePhoto = document.querySelector('.popup__close_type_photo');

closePhoto.addEventListener('click', function () {
    closePopup(popupPhoto);
});