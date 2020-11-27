import {buttonSaveCard, formElementCard, cardInputName, cardInputLink} from './index.js';
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selectorPopup, handleFormSubmit  ) {
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        const formInfo = new Object();
        formInfo.name = cardInputName.value;
        formInfo.link = cardInputLink.value;
        return formInfo;
    }

    setEventListeners() {
        super.setEventListeners();
        formElementCard.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        cardInputName.value = '';
        cardInputLink.value = '';
        buttonSaveCard.classList.add('popup__save_inactive');
        buttonSaveCard.disabled = true;
        
    }
}
