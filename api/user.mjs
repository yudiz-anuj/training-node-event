import { emitter } from '../util/event.mjs';

function getUsers(res, queryParams) {
  // Your logic to get users
  emitter.emit('response', res, { message: { queryParams } });
}

function createUser(res, queryParams, body) {
  // Your logic to create users
  emitter.emit('response', res, {
    message: { queryParams, body },
  });
}

emitter.addUniqueListener('getUsers', getUsers);
emitter.addUniqueListener('createUser', createUser);
