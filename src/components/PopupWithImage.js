import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selectorPopup, photoImg, photoName){
        super(selectorPopup);
        this._photoImg = photoImg;
        this._photoName = photoName;
    }
    open(formNew) {
        this._photoImg.src = formNew.link;
        this._photoName.textContent = formNew.name;
        super.open();             
    };    

    setEventListeners() {
        super.setEventListeners();
    }
    
}