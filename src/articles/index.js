import '../pages/saveArticle.css';

import MenuMobile from '../js/components/MenuMobile';
import Header from '../js/components/Header';
import MainApi from '../js/api/MainApi';
import NewsCard from '../js/components/NewsCard';
import NewsCardList from '../js/components/NewsCardList';
import UserFavorites from '../js/components/UserFavorites';
import { config } from '../js/config/config';

import {
  cardsArray,
  userName,
  liSavedMessage,
  liNoUser,
  liAuthButton,
  page,
  mobileMenu,
  headerNav,
  buttonClose,
  menu,
  menuNav,
  menuLi,
  menuLink,
  menuButton,
  cards,
  count,
} from '../js/constants/constants';

let articles = [];

const mainApi = new MainApi(config);
const header = new Header(liSavedMessage, liNoUser, liAuthButton, mainApi, userName);
const article = new NewsCard(mainApi, cardsArray);
const cardList = new NewsCardList(cards, cardsArray, count, article, mainApi, userName);
const userFavorites = new UserFavorites();

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

// Получаем имя пользователя и статьи для заголовка
async function resultFavorites() {
  const resultData = await mainApi.getArticles();
  articles = resultData.data;
  mainApi.getUserData()
    .then((data) => {
      userFavorites.favoritesData(data.name, articles);
    });
}

// Получаем имя для кнопки в хэдере и перенапрвляем на главную если незалогинен
mainApi.getUserData()
  .then((data) => {
    if (data === undefined){
      document.location.href = './';
    }
    userName.textContent = data.name;
  })
  .catch((err) => {
    console.log(err)
    document.location.href = './';
  })

// Выход из профиля
menuButton.addEventListener('click', () => {
  if (confirm('Вы точно хотите выйти?')) {
    header.renderOut();
    document.location.href = './';
  }
});

cards.addEventListener('click', article.deleteArticle);
cardList.articleFavorites();
menuTypeMobile.addListenersMenu();
resultFavorites();
