export default class UserInfo {
  constructor (nameSelector, infoSelector, avatarInfoSelector ) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatarInfo = document.querySelector(avatarInfoSelector)
  }

  getUserInfo(){
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    }
  }

  setUserInfo (name, info ) {
    this._name.textContent = name;
    this._info.textContent = info;

  }

  setUserAvatar (link) {
    this._avatarInfo.src = link;

  }
}
