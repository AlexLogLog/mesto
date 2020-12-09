import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor(selectorPopup, {handleFormSubmit}  ) {
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
        this._handler = this._handler.bind(this);
    }

    _handler = (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._info);
        this._selectorPopup.querySelector('.popup__form').removeEventListener('submit', this._handler);
      }


    setEventListeners() {
        this._selectorPopup.querySelector('.popup__form').addEventListener('submit', this._handler);
        super.setEventListeners();
    }
    openDeleteCard(info) {
        this._info = info;
        super.open();
    }
}