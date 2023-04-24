import { EventEmitter } from 'node:events';

class Emitter extends EventEmitter {
  /**
   * Set the maximum number of listeners for each event. default-> 10, for inf set -> 0
   * @param [maxListeners] - By default EventEmitters will print a warning if more than 10 listeners are added for a particular event. This is a useful default that helps finding memory leaks. The emitter.setMaxListeners() method allows the limit to be modified for this specific EventEmitter instance. The value can be set toInfinity (or 0) to indicate an unlimited number of listeners.
   */
  constructor(maxListeners = 10) {
    super();
    this.setMaxListeners(maxListeners);
  }

  /** Utility function to list all registered events */
  listEvents() {
    return Object.keys(this._events); // Object.keys(this._events) ~ this.eventNames() // '<name>'[]
  }

  /** Utility function to add a unique event */
  addUniqueListener(eventName, listener) {
    if (!this.eventNames().includes(eventName))
      return this.on(eventName, listener);
  }

  /** Utility function to delete an event. It will remove all listener for given event */
  deleteEvent(eventName) {
    this.removeAllListeners(eventName);
  }
}

export const emitter = new Emitter();
