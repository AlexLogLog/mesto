import {popupPhoto, closePhoto, photoImg, photoName, handleEscClick} from './index.js';

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
    this._element.querySelector('.card__img').src= this._cardScr;
    this._element.querySelector('.card__img').alt = this._cardScr;
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


  // метод открытия и закрытия popup. Решила переписать в класс. Как лучше: в обычном js или все-таки как здесь?
  _setEventListenersPopup() {  
    this._element.querySelector('.card__img').addEventListener('click', (evt) => {
        
        photoImg.src = this._cardScr;
        photoName.textContent = this._cardName;
        popupPhoto.classList.add('popup_opened');
        document.addEventListener('keydown', handleEscClick);
    });
    closePhoto.addEventListener('click', (evt) => {
        popupPhoto.classList.remove('popup_opened');
        document.removeEventListener('keydown', handleEscClick);
    });
  }
}



