import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selectorPopup, handleFormSubmit  ) {
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._selectorPopup.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._selectorPopup.querySelector('.popup__form').addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._selectorPopup.querySelector('.popup__form').reset();
    }
}
