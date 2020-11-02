const NODE_ENV = process.env.NODE_ENV || 'development';

const API_URL = NODE_ENV === 'development'
  ? 'https://newsapi.org/v2/everything?q='
  : 'https://nomoreparties.co/news/v2/everything?q=';

const PROJECT_URL = NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'http://api.vaskin.students.nomoreparties.co';

export const config = {
  baseUrl: `${PROJECT_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const configApi = {
  key: '0c5e94cfdc464ce0b1c372175af57536',
  pageSize: 100,
  language: 'ru',
  sortNews: 'publishedAt',
  apiUrl: `${API_URL}`,
};
