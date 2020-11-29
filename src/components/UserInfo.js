export class UserInfo {
    constructor(infoUser) {
        this._infoUser = infoUser;
    }

    getUserInfo() {
        return {
            userName: this._infoUser.name.textContent,
            userDescription: this._infoUser.about.textContent
          }
    }

    setUserInfo(name, about) {
        
        this._infoUser.name.textContent =  name;
        this._infoUser.about.textContent = about;
    }
}