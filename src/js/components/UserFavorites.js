export default class UserFavorites {

  _templateTitle = (data, articles, firstTag, otherTag) => {
    if (articles.length === 0) {
      return `
        <p class="result-articles__subtitle">Сохранённые статьи</p>
        <h1 class="result-articles__title">${data}, у вас ${articles.length} сохранённых статей</h1>
      `
    } else if (articles.length === 1) {
      return `
        <p class="result-articles__subtitle">Сохранённые статьи</p>
        <h1 class="result-articles__title">${data}, у вас ${articles.length} сохранённая статья</h1>
        <p class="result-articles__tags">По ключевым словам:
          <span class="result-articles__tag">${firstTag}</span>
        </p>
      `
    } else if (otherTag.length === 1) {
      return `
        <p class="result-articles__subtitle">Сохранённые статьи</p>
          <h1 class="result-articles__title">${data}, у вас ${articles.length} сохранённые статьи</h1>
          <p class="result-articles__tags">По ключевым словам:
            <span class="result-articles__tag">${firstTag}</span><span class="result-articles__tag"> и ${otherTag.length} другому</span>
          </p>
        `
    } else if (articles.length <= 4) {
      return `
        <p class="result-articles__subtitle">Сохранённые статьи</p>
          <h1 class="result-articles__title">${data}, у вас ${articles.length} сохранённые статьи</h1>
          <p class="result-articles__tags">По ключевым словам:
            <span class="result-articles__tag">${firstTag}</span><span class="result-articles__tag"> и ${otherTag.length} другими</span>
          </p>
        `
    } else if (articles.length >= 5) {
      return `
        <p class="result-articles__subtitle">Сохранённые статьи</p>
          <h1 class="result-articles__title">${data}, у вас ${articles.length} сохранённых статей</h1>
          <p class="result-articles__tags">По ключевым словам:
            <span class="result-articles__tag">${firstTag}</span><span class="result-articles__tag"> и ${otherTag.length} другими</span>
          </p>
        `
    } else if (otherTag.length >= 2) {
      return `
        <p class="result-articles__subtitle">Сохранённые статьи</p>
          <h1 class="result-articles__title">${data}, у вас ${articles.length} сохранённых статей</h1>
          <p class="result-articles__tags">По ключевым словам:
            <span class="result-articles__tag">${firstTag}</span><span class="result-articles__tag"> и ${otherTag.length} другим</span>
          </p>
        `
    }
  }

  _getKeywordsData = articles => {
    const result = {};
    articles.forEach((item) => {
      if (!result[item.keyword]) {
        result[item.keyword] = 1;
      } else {
        result[item.keyword] += 1;
      }
    });
    return Object.entries(result).sort((a, b) =>
      b[1] - a[1]).map((str) => str[0]);
  }

  favoritesData = (data, articles) => {
    const [firstTag, ...otherTag] = this._getKeywordsData(articles);
    const section = document.querySelector('.result-articles')
    const template = this._templateTitle(data, articles, firstTag, otherTag)

    return section.insertAdjacentHTML('beforeend', template);
  }
}
