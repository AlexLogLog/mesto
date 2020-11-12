import {openPopup, closePopup, popupPhoto, closePhoto, photoImg, photoName} from './index.js';

export class Card {
    constructor(name, link, cardSelector) {
        this._cardName = name;
        this._cardScr = link;
        this._cardSelector = cardSelector;
    }

    
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector('.card__img');
    cardImg.src= this._cardScr;
    cardImg.alt = this._cardScr;
    this._element.querySelector('.card__name').textContent = this._cardName;

    this._setEventListenersLike();
    this._setEventListenersDelet();
    this._setEventListenersPopup();

    return this._element;
  }

  _setEventListenersLike() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like_active');
    });
  }
  
  _setEventListenersDelet() {
    this._element.querySelector('.card__basket').addEventListener('click', (evt) => {
        const listItem = evt.target.closest('.card__element');
        listItem.remove();
    });
  }

  _setEventListenersPopup() {  
    this._element.querySelector('.card__img').addEventListener('click', () => {
        
        photoImg.src = this._cardScr;
        photoName.textContent = this._cardName;
        openPopup(popupPhoto);    
      });
    closePhoto.addEventListener('click', closePopup(popupPhoto));
  }
}



