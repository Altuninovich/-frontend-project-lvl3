import * as yup from 'yup';
import _ from 'lodash';
import axios from 'axios';
import watch from './watchers';
import renderForm from './renderForm';
import parse from './parse';
import config from './config';


const validate = (text, feeds) => {
  const basicFormSchema = yup.string().url().required();
  const isURL = basicFormSchema.isValidSync(text);

  if (!isURL) {
    return 'errors.notURL';
  }

  const isNewURL = !feeds.map((feed) => feed.link).includes(text);
  if (!isNewURL) {
    return 'errors.notNewURL';
  }

  return null;
};


const app = () => {
  const state = {
    form: {
      isValid: false,
      processState: 'filling',
      url: {
        value: '',
        state: '',
      },
    },
    feeds: [],
    posts: [],
    error: '',
    updatingState: 'none',
  };

  const root = document.getElementById('point');
  root.append(renderForm());

  const container = document.createElement('div');
  container.classList.add('container');

  const rssList = document.createElement('div');
  rssList.classList.add('accordion');
  rssList.id = 'rssList';
  container.append(rssList);

  root.append(container);


  const formElement = document.querySelector('form');
  watch(state, formElement);

  const { form } = state;
  const { urlField } = formElement.elements;


  urlField.addEventListener('input', (e) => {
    const currentURL = e.target.value;
    form.url.value = currentURL;

    if (currentURL === '') {
      form.url.state = 'clear';
      return;
    }

    const error = validate(currentURL, state.feeds);
    if (error) {
      form.url.state = 'invalid';
      form.isValid = false;
    } else {
      form.url.state = 'valid';
      form.isValid = true;
    }
    state.error = error;
  });


  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.isValid) return;

    form.processState = 'sending';

    axios.get(`${config.proxy}${form.url.value}`)
      .then(({ data }) => {
        const feed = parse(data);

        const feedId = _.uniqueId();

        state.feeds.push({
          id: feedId,
          title: feed.title,
          description: feed.description,
          link: form.url.value,
        });

        state.posts = feed.posts.reduce((acc, post) => ([...acc, {
          ...post,
          feedId,
          postId: _.uniqueId(),
        }]), state.posts);

        form.url.value = '';
        form.url.state = 'clear';
      })
      .catch((error) => {
        state.error = error.message;
        form.url.state = 'invalid';
      })
      .finally(() => {
        state.updatingState = 'running';

        form.processState = 'filling';
        form.isValid = false;
      });
  });
};

export default app;
