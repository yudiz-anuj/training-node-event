import { URL } from 'node:url';
import { createServer } from 'node:http';
import { common } from './util/common.mjs';
import { emitter } from './util/event.mjs';
import { Router } from './router.mjs';

// ------------
import './api/user.mjs';
import './api/posts.mjs';

const router = new Router();

// - Middleware: Logging request details
router.use((req, res) => {
  console.log(`\n[${req.method}] ${req.url}`);
  console.log('Query Params:', req.query);
  console.log('Body:', req.body, '\n');
});

router.get('/users', 'getUsers');
router.post('/users', 'createUser');
router.get('/posts', 'getPosts');
router.post('/posts', 'createPost');
router.delete('/posts', 'deletePost');
// ------------

emitter.addUniqueListener('response', (res, data) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(common.stringify(data));
});

emitter.addUniqueListener('notFound', (res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(common.stringify({ message: 'Not Found' }));
});

emitter.addUniqueListener('notImplemented', (res) => {
  res.statusCode = 501;
  res.setHeader('Content-Type', 'application/json');
  res.end(common.stringify({ message: 'Not Implemented' }));
});

export const server = createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);

  req.path = urlObj.pathname;
  req.query = Object.fromEntries(urlObj.searchParams.entries());
  req.body = {};

  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    req.body = await common.getReqPayload(req);
    return router.route(req, res);
  }

  router.route(req, res);
});
