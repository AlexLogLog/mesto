import {photoImg, photoName} from './index.js';
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selectorPopup){
        super(selectorPopup);
    }
    open(cardImage) {
        cardImage.addEventListener('click', () => {
            photoImg.src = cardImage.src;
            photoName.textContent = cardImage.alt;
            super.open(); 
          });
            
    };    
    
}