export class Card {
    constructor(name, link, cardSelector, handleCardClick) {
        this._cardName = name;
        this._cardScr = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
    cardImg.alt = this._cardName;
    this._element.querySelector('.card__name').textContent = this._cardName;

    this._setEventListenersLike();
    this._setEventListenersDelete();
    this._handleCardClick(cardImg);

    return this._element;
  }

  _setEventListenersLike() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like_active');
    });
  }
  
  _setEventListenersDelete() {
    this._element.querySelector('.card__basket').addEventListener('click', (evt) => {
        const listItem = evt.target.closest('.card__element');
        listItem.remove();
    });
  }

}



