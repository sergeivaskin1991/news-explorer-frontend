import '../pages/index.css';

import Popup from './components/Popup';
import MenuMobile from './components/MenuMobile';

// eslint-disable-next-line no-undef
const content = document.querySelector('.content');
const popupTypeLogin = content.querySelector('.popup_type_login');
const openPopupLogin = content.querySelector('.menu__button');
const closePopupLogin = content.querySelector('.popup__close_login');

const popupTypeAuth = content.querySelector('.popup_type_auth');
const openPopupAuth = content.querySelector('.popup__name-link_login');
const closePopupAuth = content.querySelector('.popup__close_auth');

const popupTypeCorrectly = content.querySelector('.popup_type_correctly');
const popupCloseCorrectly = content.querySelector('.popup__close_correctly');
const popupButtonAuth = content.querySelector('.popup__button_auth');

const popupLogin = new Popup(popupTypeLogin, openPopupLogin, closePopupLogin);
const popupAuth = new Popup(popupTypeAuth, openPopupAuth, closePopupAuth);
const popupCorrectly = new Popup(popupTypeCorrectly, popupButtonAuth, popupCloseCorrectly);

// eslint-disable-next-line no-undef
const pageFixed = document.querySelector('.page');
const mobileMenu = content.querySelector('.mobile-menu');
const headerNav = content.querySelector('.header__nav');
const buttonClose = content.querySelector('.header__button-popup');
const menu = content.querySelector('.menu');
const menuNav = content.querySelector('.menu__nav');
const menuLi = content.querySelectorAll('.menu__li');
const menuLink = content.querySelector('.menu__link');
const menuButton = content.querySelector('.menu__button');

const menuTypeMobile = new MenuMobile(
  pageFixed,
  mobileMenu,
  headerNav,
  buttonClose,
  menu,
  menuNav,
  menuLi,
  menuLink,
  menuButton,
);
// Временный код
openPopupAuth.addEventListener('click', () => {
  if (popupAuth) {
    popupLogin.close();
  }
});
// Временный код
popupButtonAuth.addEventListener('click', () => {
  if (popupCorrectly) {
    popupAuth.close();
  }
});

menuTypeMobile.addListeners();
popupLogin.setListeners();
popupAuth.setListeners();
popupCorrectly.setListeners();
