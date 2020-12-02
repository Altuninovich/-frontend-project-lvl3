import axios from 'axios';
import _ from 'lodash';
import config from './config';
import parse from './parse';

const update = (feeds, posts) => {
  if (feeds.length === 0) return;

  feeds.forEach((feed) => {
    axios.get(`${config.proxy}${feed.link}`)
      .then(({ data }) => {
        const { posts: newPosts } = parse(data);

        const oldPosts = posts.filter((post) => post.feedId === feed.id);

        newPosts.forEach((post) => {
          const isNewPost = oldPosts.findIndex((oldPost) => (
            oldPost.link === post.link
            && oldPost.pubDate === post.pubDate
          ));

          if (isNewPost === -1) {
            posts.push({
              ...post,
              feedId: feed.id,
              postId: _.uniqueId(),
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  setTimeout(update, 5000, feeds, posts);
};

export default update;
