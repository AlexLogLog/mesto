import {UPPER_CASE} from './index.js';

export class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
        this._popupClose = this._selectorPopup.querySelector('.popup__close');
    }

    open() {
        this._selectorPopup.classList.add('popup_opened');
        this.setEventListeners();
    }

    _handleEscClick = (e) => {
        if (e.keyCode === UPPER_CASE) {
            this._selectorPopup.classList.remove('popup_opened');}  
    }

    _closePopupByClickOverlay = (e) => {
        if (e.target.classList.contains("popup")) {   
          this.close(e.target);
        }
      }

    close() {
        this._selectorPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClick);
    }

    setEventListeners() {
        document.addEventListener('click', this._closePopupByClickOverlay);
        document.addEventListener('keydown', this._handleEscClick);
        this._popupClose.addEventListener('click', () => {this._selectorPopup.classList.remove('popup_opened')});
    }
}
