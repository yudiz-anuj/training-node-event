import { emitter } from './util/event.mjs';

export class Router {
  #routes;
  #middlewares;

  constructor() {
    this.#routes = new Map();
    this.#middlewares = [];
  }

  #addRoute(method, path, eventName) {
    const key = `${method.toUpperCase()} ${path}`;
    this.#routes.set(key, eventName);
  }

  use(middleware) {
    this.#middlewares.push(middleware);
  }

  get(path, eventName) {
    this.#addRoute('GET', path, eventName);
  }

  post(path, eventName) {
    this.#addRoute('POST', path, eventName);
  }

  put(path, eventName) {
    this.#addRoute('PUT', path, eventName);
  }

  delete(path, eventName) {
    this.#addRoute('DELETE', path, eventName);
  }

  patch(path, eventName) {
    this.#addRoute('PATCH', path, eventName);
  }

  async route(req, res) {
    const key = `${req.method.toUpperCase()} ${req.path}`;
    const eventName = this.#routes.get(key);

    // Execute middlewares
    for (const middleware of this.#middlewares) {
      await middleware(req, res);
    }

    if (!eventName) return emitter.emit('notFound', res);
    if (emitter.listenerCount(eventName) < 1)
      return emitter.emit('notImplemented', res);
    emitter.emit(eventName, res, req.query, req.body);
  }
}
