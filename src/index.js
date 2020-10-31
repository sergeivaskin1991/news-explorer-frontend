import './pages/index.css';

import PopupForm from './js/components/PopupForm';
import PopupSuccess from './js/components/PopupSuccess';
import MenuMobile from './js/components/MenuMobile';
import FormValidator from './js/components/FormValidator';
import Header from './js/components/Header';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import SearchNews from './js/components/SearchNews';
import { config, configApi } from './js/config/config';

import {
  popupButtonLogin,
  popupButtonRegistration,
  count,
  showMoreButton,
  searchField,
  cards,
  cardsArray,
  userName,
  liSavedMessage,
  liNoUser,
  liAuthButton,
  popupErrorServerAuth,
  popupErrorServerLogin,
  errorMessages,
  page,
  mobileMenu,
  headerNav,
  buttonClose,
  menu,
  menuNav,
  menuLi,
  menuLink,
  menuButton,
  popupTypeLogin,
  openPopupLogin,
  closePopupLogin,
  popupTypeRegistration,
  openPopupRegistration,
  closePopupRegistration,
  popupTypeCorrectly,
  popupCloseCorrectly,
  formLogin,
  formRegistration,
  openLogin,
  popupNameLink,
} from './js/constants/constants';

const mainApi = new MainApi(config);
const newsApi = new NewsApi(configApi);

const header = new Header(liSavedMessage, liNoUser, liAuthButton, mainApi, userName);

const formValidatorLogin = new FormValidator(formLogin, errorMessages);
const formValidatorAuth = new FormValidator(formRegistration, errorMessages);

const popupLogin = new PopupForm(popupTypeLogin, openPopupLogin, closePopupLogin, clearPopup);
const popupAuth = new PopupForm(popupTypeRegistration, openPopupRegistration, closePopupRegistration, clearPopup);
const popupSuccess = new PopupSuccess(popupTypeCorrectly, popupCloseCorrectly);
const popupLoginNew = new PopupForm(popupTypeLogin, openLogin, closePopupLogin, clearPopup);
const popupLoginAfterSuccess = new PopupForm(popupTypeLogin, popupNameLink, closePopupLogin, clearPopup);
const article = new NewsCard(mainApi, cardsArray);
const cardList = new NewsCardList(cards, cardsArray, count, article, mainApi, userName);

const searchNews = new SearchNews(newsApi, cardList);

const menuTypeMobile = new MenuMobile(
  page,
  mobileMenu,
  headerNav,
  buttonClose,
  menu,
  menuNav,
  menuLi,
  menuLink,
  menuButton,
);

// Чистка ошибок в форме
function clearPopup() {
  formValidatorLogin.resetErrorsPopup();
  formValidatorAuth.resetErrorsPopup();
}

// Чистка полей формы
function formReset(item) {
  item.reset();
}

// Блокировка полей формы во время отправки данных
function signupButtonDisable(email, password, name, button) {
  email.removeAttribute('disabled');
  password.removeAttribute('disabled');
  name.removeAttribute('disabled');
  button.removeAttribute('disabled');
}

// Разблокировка полей формы во время отправки данных
function signupButtonEnable(email, password, name, button) {
  email.setAttribute('disabled', true);
  password.setAttribute('disabled', true);
  name.setAttribute('disabled', true);
  button.setAttribute('disabled', true);
}

// Форма регистрации
function signup(event) {
  event.preventDefault();

  const email = formRegistration.elements.email;
  const password = formRegistration.elements.password;
  const name = formRegistration.elements.name;

  signupButtonEnable(email, password, name, popupButtonRegistration);
  mainApi.signup(email.value, password.value, name.value)
    .then(() => {
      signupButtonDisable(email, password, name, popupButtonRegistration);
      formReset(formRegistration);
      popupAuth.close();
      popupSuccess.open();
    })
    .catch((err) => {
      signupButtonDisable(email, password, name, popupButtonRegistration);
      popupErrorServerAuth.textContent = err.message;
    })
}

function signinButtonDisable(email, password, button) {
  email.removeAttribute('disabled');
  password.removeAttribute('disabled');
  button.removeAttribute('disabled');
}

function signinButtonEnable(email, password, button) {
  email.setAttribute('disabled', true);
  password.setAttribute('disabled', true);
  button.setAttribute('disabled', true);
}

// Форма входа
function signin(event) {
  event.preventDefault();

  const email = formLogin.elements.email;
  const password = formLogin.elements.password;

  signinButtonEnable(email, password, popupButtonLogin);
  mainApi.signin(email.value, password.value)
    .then(() => {
      signinButtonDisable(email, password, popupButtonLogin);
      header.renderIn();
      formReset(formLogin);
      popupLogin.close();
    })
    .catch((err) => {
      signinButtonDisable(email, password, popupButtonLogin);
      popupErrorServerLogin.textContent = err.message;
    })
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    popupLogin.close();
    popupAuth.close();
    popupSuccess.close();
    formReset(formLogin);
    formReset(formRegistration);
  }
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup_is-opened')) {
    popupLogin.close();
    popupAuth.close();
    popupSuccess.close();
    formReset(formLogin);
    formReset(formRegistration);
  }
});

showMoreButton.addEventListener('click', () => {
  cardList.showButton(showMoreButton);
});

menuButton.addEventListener('click', () => {
  if (confirm('Вы точно хотите выйти?')) {
    header.renderOut();
    location.reload();
  }
});

closePopupLogin.addEventListener('click', () => {
  formReset(formLogin);
})

closePopupRegistration.addEventListener('click', () => {
  formReset(formRegistration);
})

cards.addEventListener('click', article.articleHandler);
searchField.addEventListener('submit', searchNews.getNews);
formRegistration.addEventListener('submit', signup);
formLogin.addEventListener('submit', signin);
menuTypeMobile.addListenersMenu();
header.renderIn();
