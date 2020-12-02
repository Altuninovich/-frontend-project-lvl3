import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import ru from './locales/ru';

import app from './app';

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
}).then(app);
