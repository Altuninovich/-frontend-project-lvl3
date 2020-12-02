const parse = (data) => {
  const parser = new DOMParser();

  const DOM = parser.parseFromString(data, 'text/xml');

  const error = DOM.querySelector('parsererror');
  if (error) throw new Error('errors.notRSS');

  const postItems = Array.from(DOM.querySelectorAll('item'));

  const posts = postItems.map((item) => ({
    link: item.querySelector('link').textContent,
    title: item.querySelector('title').textContent,
    pubDate: item.querySelector('pubDate').textContent,
  }));

  const feed = {
    title: DOM.querySelector('channel title').textContent,
    description: DOM.querySelector('channel description').textContent,
    posts,
  };

  return feed;
};

export default parse;
