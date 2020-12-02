import { watch } from 'melanke-watchjs';
import i18next from 'i18next';
import renderFeeds from './renderFeeds';
import update from './update';


const watching = (state, formElement) => {
  const { form } = state;
  const { urlField, submitButton } = formElement.elements;
  const feedback = formElement.querySelector('.invalid-feedback');


  watch(form, 'processState', () => {
    switch (form.processState) {
      case 'filling':
        submitButton.innerHTML = i18next.t('button.add');
        break;

      case 'sending':
        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${i18next.t('button.load')}`;
        break;

      case 'finished':
        break;

      default:
        throw new Error(`Unknown order state: '${form.processState}'!`);
    }
  });

  watch(state, 'feeds', () => {
    renderFeeds(state);
  });

  watch(state, 'posts', () => {
    renderFeeds(state);
  });


  watch(form, 'isValid', () => {
    submitButton.disabled = !form.isValid;
  });


  watch(state, 'updatingState', () => {
    switch (state.updatingState) {
      case 'running':
        setTimeout(update, 5000, state.feeds, state.posts);
        break;
      default:
        throw new Error(`Unknown order state: '${state.updatingState}'!`);
    }
  });


  watch(state, 'error', () => {
    feedback.textContent = i18next.t(state.error);
  });


  watch(form.url, 'state', () => {
    switch (form.url.state) {
      case 'valid':
        urlField.classList.add('is-valid');
        urlField.classList.remove('is-invalid');
        break;

      case 'invalid':
        urlField.classList.add('is-invalid');
        urlField.classList.remove('is-valid');
        urlField.focus();
        break;

      case 'clear':
        urlField.classList.remove('is-valid', 'is-invalid');
        urlField.focus();
        break;

      default:
        throw new Error(`Unknown order state: '${form.url.state}'!`);
    }
  });


  watch(form.url, 'value', () => {
    urlField.value = form.url.value;
  });
};

export default watching;
