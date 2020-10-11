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
    this.addListeners = this.addListeners.bind(this);
    this.open = this.open.bind(this);
    this.transform = this.transform.bind(this);
    this.arrayLi = this.arrayLi.bind(this);
  }

  addListeners() {
    this.buttonClose.addEventListener('click', this.open);
  }

  open(event) {
    event.preventDefault();
    this.transform();
  }

  arrayLi() {
    this.menuLiMobile.forEach((liElement) => {
      liElement.classList.toggle('menu__li_mobile');
    });
  }

  transform() {
    this.buttonClose.classList.toggle('header__button-popup_close');
    this.menuNavMobile.classList.toggle('menu__nav_mobile');
    this.navMobile.classList.toggle('header__nav_mobile');
    this.mobileMenu.classList.toggle('mobile-menu_active');
    this.menuMobile.classList.toggle('menu_mobile');
    this.menuLinkMobile.classList.toggle('menu__link_mobile');
    this.menuButtonMobile.classList.toggle('menu__button_mobile');
    this.pageFixed.classList.toggle('page_fixed_mobile');
    this.arrayLi();
  }
}
