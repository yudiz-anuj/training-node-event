import { emitter } from '../util/event.mjs';

function getPosts(res, queryParams) {
  // Your logic to get posts
  emitter.emit('response', res, { message: { queryParams } });
}

function createPost(res, queryParams, body) {
  // Your logic to create posts
  emitter.emit('response', res, {
    message: { queryParams, body },
  });
}

emitter.addUniqueListener('getPosts', getPosts);
emitter.addUniqueListener('createPost', createPost);
