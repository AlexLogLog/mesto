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
const cardTemplate = document.querySelector('.card__id').content;

const profileOpenButton = document.querySelector('.profile__button-new');

const popupCard = document.querySelector('.popup_type_card');
const popupCloseCard = popupCard.querySelector('.popup__close');
const cardInputName = popupCard.querySelector('.popup__input_info_name-photo');
const cardInputLink = popupCard.querySelector('.popup__input_info_link-photo');
const formElementCard = popupCard.querySelector('.popup__form');

const popupPhoto = document.querySelector('.popup_type_photo');
const closePhoto = document.querySelector('.popup__close_type_photo');
const photoImg = popupPhoto.querySelector('.popup__photo-image');
const photoName = popupPhoto.querySelector('.popup__photo-name');

function openPopupUser() {
    popupName.value = name.textContent;
    popupAbout.value = about.textContent;
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
popupUserClose.addEventListener('click', function () {
    closePopup(popupUser);
});
formElementUser.addEventListener('submit', formSubmitHandler);


function createCard(name, link) {


    const cardElement = cardTemplate.cloneNode(true);

    const cardImg = cardElement.querySelector('.card__img');

    cardElement.querySelector('.card__name').textContent = name;
    cardImg.src = link;
    cardImg.alt = name;
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
    });
    cardElement.querySelector('.card__basket').addEventListener('click', function (evt) {

        const listItem = evt.target.closest('.card__element');
        listItem.remove();
    });

    cardImg.addEventListener('click', function () {

        openPopup(popupPhoto);

        photoImg.src = link;
        photoImg.alt = name;
        photoName.textContent = name;

    });

    return cardElement;
}



initialCards.forEach(function (el) {
    container.append(createCard(el.name, el.link));
});


function handleEscClick(e) {
    if (e.keyCode === 27) {
        document.querySelector('.popup_opened').classList.remove('popup_opened');
    }
}


// при добавлении обработчика в openPopup type.addEventListener('click', handleEscClick) 
// и его удалении в closePopup popupType.addEventListener('click', handleEscClick) 
// У меня так ничего не работает :(. 
// Можете написать почему именно обработчик click, если мы отслеживаем нажатие.
// И чуть подробнее про реализацию, что-то сложно понимать этот момент. И как работать должно вообще.

addEventListener('keydown', handleEscClick);

function openPopup(type) {
    type.classList.add('popup_opened');
}

function closePopupCard() {
    closePopup(popupCard);
    startButton();
}

profileOpenButton.addEventListener('click', function () {
    openPopup(popupCard);

});

popupCloseCard.addEventListener('click', closePopupCard);
formElementCard.addEventListener('submit', function (evt) {

    evt.preventDefault();
    const name = cardInputName.value;
    const link = cardInputLink.value;


    container.prepend(createCard(name, link));
    closePopupCard();

});

closePhoto.addEventListener('click', function () {
    closePopup(popupPhoto);
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

popupPhoto.addEventListener('click', function (e) {
    if (e.target.classList.contains("popup")) {
        closePopup(popupPhoto);
    }
});

