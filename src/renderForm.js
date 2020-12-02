import i18next from 'i18next';

const renderForm = () => {
  const jumbotron = document.createElement('div');
  jumbotron.classList.add('jumbotron', 'jumbotron-fluid');

  const container = document.createElement('div');
  container.classList.add('container');

  const h1 = document.createElement('h1');
  h1.classList.add('display-5');
  h1.textContent = i18next.t('title');

  const form = document.createElement('form');

  const inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group', 'mr-2');

  const input = document.createElement('input');
  input.setAttribute('type', 'url');
  input.classList.add('form-control');
  input.setAttribute('placeholder', i18next.t('placeholder'));
  input.id = 'urlField';
  input.setAttribute('aria-describedby', 'submitButton');

  const inputGroupAppend = document.createElement('div');
  inputGroupAppend.classList.add('input-group-append');

  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.classList.add('btn', 'btn-outline-secondary');
  button.id = 'submitButton';
  button.textContent = i18next.t('button.add');
  button.disabled = true;

  const feedback = document.createElement('div');
  feedback.classList.add('invalid-feedback');

  jumbotron.append(container);
  container.append(h1);
  container.append(form);

  form.append(inputGroup);

  inputGroup.append(input);
  inputGroup.append(inputGroupAppend);
  inputGroup.append(feedback);

  inputGroupAppend.append(button);

  return jumbotron;
};

export default renderForm;
