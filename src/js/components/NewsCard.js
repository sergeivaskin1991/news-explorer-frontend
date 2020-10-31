import { setDate } from "../utils/utils";
import { objStatus, imageNull } from "../constants/constants"

export default class NewsCard {
  constructor(mainApi, cardsArray) {
    this.mainApi = mainApi;
    this.cardsArray = cardsArray;
  }

  // HTML статей приходящих с Api
  templateCreate = (obj, status) => {
    if (status === objStatus.statusNoLogin) {
      return `
        <div class="card">
          <div class="card__image" style="background-image: url(${this._sanitizeHTML(this._imgIsNull(obj))})">
            <div class="card__buttons">
              <span class="card__text-login card__buttons_is-opened">Войдите, чтобы сохранять статьи</span>
              <button class="button card__button" disabled></button>
            </div>
          </div>
            <a href="${this._sanitizeHTML(obj.url)}" class="card__content" target="_blank">
              <p class="card__date-text">${this._sanitizeHTML(setDate(obj.publishedAt))}</p>
              <h2 class="card__title">${this._sanitizeHTML(obj.title)}</h2>
              <p class="card__subtitle">${this._sanitizeHTML(obj.description)}</p>
              <p class="card__source">${this._sanitizeHTML(obj.source.name)}</p>
            </a>
        </div>
      `
    } else if (status === objStatus.statusLogin) {
      return `
        <div class="card">
          <div class="card__image" style="background-image: url(${this._sanitizeHTML(this._imgIsNull(obj))})">
            <div class="card__buttons">
              <button class="button card__button"></button>
            </div>
          </div>
            <a href="${this._sanitizeHTML(obj.url)}" class="card__content" target="_blank">
              <p class="card__date-text">${this._sanitizeHTML(setDate(obj.publishedAt))}</p>
              <h2 class="card__title">${this._sanitizeHTML(obj.title)}</h2>
              <p class="card__subtitle">${this._sanitizeHTML(obj.description)}</p>
              <p class="card__source">${this._sanitizeHTML(obj.source.name)}</p>
            </a>
        </div>
      `
    } else if (status === objStatus.statusCardSave) {
      return `
        <div class="card" id="${obj._id}">
          <div class="card__image" style="background-image: url(${this._sanitizeHTML(obj.image)})">
            <div class="card__buttons">
              <span class="card__text-login card__buttons_is-opened">Убрать из сохранённых</span>
              <button class="button card__button-delete"></button>
            </div>
            <div class="card__tag-box">
              <span class="card__tag">${this._sanitizeHTML(obj.keyword)}</span>
            </div>
          </div>
            <a href="${this._sanitizeHTML(obj.link)}" class="card__content" target="_blank">
              <p class="card__date-text">${this._sanitizeHTML(obj.date)}</p>
              <h2 class="card__title">${this._sanitizeHTML(obj.title)}</h2>
              <p class="card__subtitle">${this._sanitizeHTML(obj.text)}</p>
              <p class="card__source">${this._sanitizeHTML(obj.source)}</p>
            </a>
        </div>
      `
    }
  }

  _sanitizeHTML = str => {
    const template = document.createElement('div');
    template.textContent = str;
    return template.firstChild.nodeValue;
  }

  // Если с Апи не пришла картинка, подставляется дефолтная
  _imgIsNull = obj => {
    return obj.urlToImage === null ? imageNull : obj.urlToImage;
  }

  _getContentArticle = event => {
    const card = event.target.closest('.card');
    return {
      keyword: this.cardsArray.keyword,
      image: card.querySelector('.card__image').style.backgroundImage.slice(5, -2),
      date: card.querySelector('.card__date-text').textContent,
      title: card.querySelector('.card__title').textContent,
      text: card.querySelector('.card__subtitle').textContent,
      source: card.querySelector('.card__source').textContent,
      link: card.querySelector('.card__content').href,
    }
  }

  // Сохраение и удаление статьи
  articleHandler = event => {
    const button = event.target.closest('.card__button');
    const card = event.target.closest('.card')

    if (event.target.classList.contains('card__button') && !event.target.classList.contains('card__button_save')) {
      const obj = this._getContentArticle(event);
      this.mainApi.createArticle(obj)
        .then((data) => {
          card.setAttribute('id', data.data._id)
          button.classList.add('card__button_save');
        }).catch((err) => {
        console.log(err);
      })
    } else if (event.target.classList.contains('card__button_save')) {
      this.mainApi.removeArticle(card.id)
        .then(() => {
          button.classList.remove('card__button_save');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // Удаление статьи из личного кабинета
  deleteArticle = (event) => {
    const card = event.target.closest('.card')
    if (event.target.classList.contains('card__button-delete')) {
      if (confirm('Уверены, что хотите удалить статью?')) {
        this.mainApi.removeArticle(card.id)
          .then(() => {
            card.remove();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }
}
