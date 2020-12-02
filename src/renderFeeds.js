export default ({ feeds, posts }) => {
  const cards = feeds.map((feed) => {
    const postsList = posts
      .filter((post) => post.feedId === feed.id)
      .map((post) => `<li class="list-group-item"><a href="${post.link}">${post.title}</a></li>`)
      .join('\n');

    const card = `
      <div class="row">
        <div class="col my-3">
          <div class="card">
            <div class="card-body">
              <a href="${feed.link}" class="card-link"><h5 class="card-title">${feed.title}</h5></a>
              <p class="card-text">${feed.description}</p>
              <ul class="list-group list-group-flush">
              ${postsList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    return card;
  }).join('');

  const rssList = document.getElementById('rssList');
  rssList.innerHTML = cards;
};
