import { objStatus } from "../constants/constants";

export default class NewsCardList {
  constructor(cards, cardsArray, count, article, mainApi, userName) {
    this.cards = cards;
    this.cardsArray = cardsArray;
    this.count = count;
    this.article = article;
    this.mainApi = mainApi;
    this.userName = userName
    this.status = objStatus.statusNoLogin;
  }

  _addCard = obj => {
   return this.cards.insertAdjacentHTML('beforeend', this.article.templateCreate(obj, this.status));
  }

  render = articles => {
    articles.forEach((item) => {
      this._addCard(item);
    });
  }

  renderStatus = item => {
    if (this.userName.textContent === '') {
      this.status = objStatus.statusNoLogin;
      this.render(item);
    } else {
      this.status = objStatus.statusLogin;
      this.render(item);
    }
  }

  // Показать больше новостных карточек
  showButton = button => {
    const array = this.cardsArray.slice(this.count, this.count += 3);
    if (array.length < 3) {
      this.renderStatus(array);
      button.classList.add('news-result__button_is-opened');
    } else {
      this.renderStatus(array);
    }
  }

  // Очистка блока для нового поиска
  clear = () => {
    if (this.cardsArray.length !== 0) {
      this.cardsArray.length = 0;
      while (this.cards.firstChild) {
        this.cards.removeChild(this.cards.firstChild);
      }
    }
  }

  // Рендер сохраненных статей
  articleFavorites = () => {
    this.mainApi.getArticles()
      .then((data) => {
        this.status = objStatus.statusCardSave
        data.data.forEach((item) => {
            this.cardsArray.push(item);
        });
        this.render(this.cardsArray);
      })
      .catch((err) =>
        console.log(err));
  }
}
