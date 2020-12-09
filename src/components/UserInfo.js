export class UserInfo {
    constructor(infoUser) {
        this._infoUser = infoUser;
    }

    getUserInfo() {
        return {
            userName: this._infoUser.name.textContent,
            userDescription: this._infoUser.about.textContent,
            // userImg: this._infoUser.img.src
          }
    }

    setUserInfo(name, about) {
        
        this._infoUser.name.textContent =  name;
        this._infoUser.about.textContent = about;
        //this._infoUser.img.src = img;
    }

    getUserImg() {
        return {
            userImg: this._infoUser.img.src
          }
    }

    setUserImg(img) {
        
        this._infoUser.img.src = img;
    }
}
