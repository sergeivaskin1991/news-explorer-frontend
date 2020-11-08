import '../pages/saveArticle.css';

import MenuMobile from './components/MenuMobile';

// eslint-disable-next-line no-undef
const content = document.querySelector('.content');

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

menuTypeMobile.addListeners();
