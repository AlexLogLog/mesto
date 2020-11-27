import {popupName, popupAbout} from './index.js';

export class UserInfo {
    constructor(infoUser) {
        this._infoUser = infoUser;
    }

    getUserInfo() {
        popupName.value = this._infoUser.name.textContent;
        popupAbout.value = this._infoUser.about.textContent; 
    }

    setUserInfo() {
        
        this._infoUser.name.textContent =  popupName.value;
        this._infoUser.about.textContent = popupAbout.value;
    }
}