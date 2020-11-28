import { ESC_KEYCODE } from '../utils/constants.js'

export class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
        this._popupClose = this._selectorPopup.querySelector('.popup__close');
    }

    open() {
        this._selectorPopup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClick);
        document.addEventListener('click', this._closePopupByClickOverlay);
    }

    _handleEscClick = (e) => {
        if (e.keyCode === ESC_KEYCODE) {
            this.close();
        }  
    }

    _closePopupByClickOverlay = (e) => {
        if (e.target.classList.contains("popup")) {   
          this.close();
        }
      }

    close() {
        this._selectorPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClick);
        document.removeEventListener('click', this._closePopupByClickOverlay);
    }

    setEventListeners() {
        this._popupClose.addEventListener('click', () => {this.close()});
    }
}
