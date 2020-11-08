export default class MenuMobile {
  constructor(
    pageFixed,
    mobileMenu,
    navMobile,
    buttonClose,
    menuMobile,
    menuNavMobile,
    menuLiMobile,
    menuLinkMobile,
    menuButtonMobile,
  ) {
    this.pageFixed = pageFixed;
    this.mobileMenu = mobileMenu;
    this.navMobile = navMobile;
    this.buttonClose = buttonClose;
    this.menuMobile = menuMobile;
    this.menuNavMobile = menuNavMobile;
    this.menuLiMobile = menuLiMobile;
    this.menuLinkMobile = menuLinkMobile;
    this.menuButtonMobile = menuButtonMobile;
  }

  addListenersMenu = () => {
    this.buttonClose.addEventListener('click', this._open);
  }

  _open = event => {
    event.preventDefault();
    this._transform();
  }

  _arrayLi = () => {
    this.menuLiMobile.forEach((liElement) => {
      liElement.classList.toggle('menu__li_mobile');
    });
  }

  _transform = () => {
    this.buttonClose.classList.toggle('header__button-popup_close');
    this.menuNavMobile.classList.toggle('menu__nav_mobile');
    this.navMobile.classList.toggle('header__nav_mobile');
    this.mobileMenu.classList.toggle('mobile-menu_active');
    this.menuMobile.classList.toggle('menu_mobile');
    this.menuLinkMobile.classList.toggle('menu__link_mobile');
    this.menuButtonMobile.classList.toggle('menu__button_mobile');
    this.pageFixed.classList.toggle('page_fixed_mobile');
    this._arrayLi();
  }
}
