import { MY_ID } from '../utils/constants.js'

export class Card {

  constructor(info, cardSelector, { handleCardClick, handleDeleteIconClick, handleLikeClick, handleDeleteLikeClick }) {
    this._info = info;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
  }


  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .firstElementChild
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector('.card__img');

    cardImg.src = this._info.link;
    cardImg.alt = this._info.name;
    this._element.querySelector('.card__name').textContent = this._info.name;

    this._setEventListenersOpenPopupImage();
    this._setEventListenersOpenPopupSubmit();
    this._setEventListenersLikes();
    this._deleteIconDelet();
    this._myLike();
    this.countLike(this._info);

    return this._element;
  }

  _deleteIconDelet() {
    if (this._info.owner._id !== MY_ID) {
      this._element.querySelector('.card__basket').remove();
    }
  }

  deleteCard() {
    this._element.remove();
  };

  _setEventListenersOpenPopupImage() {
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._handleCardClick(this._info);
    })
  }

  _setEventListenersOpenPopupSubmit() {
    this._element.querySelector('.card__basket').addEventListener('click', () => {
      this._handleDeleteIconClick();
    });
  }

  _setEventListenersLikes() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      if (this._element.querySelector('.card__like').classList.contains('card__like_active')) {
        this._like();
        this._handleDeleteLikeClick(this._info);
      } else {
        this._like();
        this._handleLikeClick(this._info);
      }
    });

  }
  countLike(info) {
    this._element.querySelector('.card__like-number').textContent = info.likes.length;
  }

  _like() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _myLike() {
    this._info.likes.forEach((item) => {
      if (item._id === MY_ID)
        this._like();

    })
  }


}



