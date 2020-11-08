import {
  cardsArray, newsResult, resultNotFound, searchInput, showMoreButton, count, searchButton,
} from '../constants/constants';

export default class SearchNews {
  constructor(newsApi, cardList) {
    this.newsApi = newsApi;
    this.cardList = cardList;
  }

  _removeAttribute = () => {
    searchButton.removeAttribute('disabled');
    searchInput.removeAttribute('disabled');
  }

  _setAttribute = () => {
    searchButton.setAttribute('disabled', true);
    searchInput.setAttribute('disabled', true);
  }

  getNews = event => {
    event.preventDefault();

    newsResult.classList.add('news-result_is-opened');
    resultNotFound.classList.add('result-not-found_is-opened');
    this._setAttribute();
    this._loadingSpinner(true);
    this.newsApi.getNewsApi(searchInput.value)
      .then((data) => {
        this._removeAttribute();
        this.cardList.clear();
        data.articles.forEach((res) => {
          cardsArray.push(res);
        });
        if (cardsArray.length !== 0) {
          const lineArticles = cardsArray.slice(0, count);
          this.cardList.renderStatus(lineArticles);
          if (lineArticles.length < 3) {
            showMoreButton.classList.add('news-result__button_is-opened');
          } else {
            showMoreButton.classList.remove('news-result__button_is-opened');
          }
          newsResult.classList.remove('news-result_is-opened');
          cardsArray.keyword = searchInput.value;
        } else {
          resultNotFound.classList.remove('result-not-found_is-opened');
        }
      })
      .catch((err) => {
        this._removeAttribute();
        console.log(err);
      })
      .finally(() => {
        this._loadingSpinner(false);
      });
  }

  _loadingSpinner = isLoading => {
    this.spinner = document.querySelector('.result-search');

    if (isLoading) {
      this.spinner.classList.add('result-search_is-opened');
    } else {
      this.spinner.classList.remove('result-search_is-opened');
    }
  }
}
