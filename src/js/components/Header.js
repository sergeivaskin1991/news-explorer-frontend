export default class Header {
  constructor(liSavedMessage, liNoUser, liAuthButton, mainApi, userName) {
    this.liSavedMessage = liSavedMessage;
    this.liNoUser = liNoUser;
    this.liAuthButton = liAuthButton;
    this.mainApi = mainApi;
    this.userName = userName;
  }

  // Рендерит меню хэдера при входе в профиль
  renderIn = () => {
    this.mainApi.getUserData()
      .then((data) => {
        this.userName.textContent = data.name;
        this.liSavedMessage.classList.add('menu__li_login');
        this.liNoUser.classList.add('menu__li_login');
        this.liAuthButton.classList.add('menu__li_nouser');
      })
      .catch((err)=> {
        console.log(err);
      })
  }

  // Рендерит меню хэдера при выходе из профиля
  renderOut = () => {
    this.mainApi.logout()
      .then(() => {
        this.userName.textContent = '';
        this.liSavedMessage.classList.remove('menu__li_login');
        this.liNoUser.classList.remove('menu__li_login');
        this.liAuthButton.classList.remove('menu__li_nouser');
    })
      .catch((err) => {
        console.log(err);
      })
  }
}
