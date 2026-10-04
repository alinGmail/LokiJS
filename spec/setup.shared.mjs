import { it as vitestIt, test as vitestTest } from 'vitest';

// The specs were originally written for Jasmine and many use `done` callbacks.
// Vitest does not support them, so wrap test functions and resolve a promise
// when the spec calls `done([err])`. Functions that return a promise (or take
// no arguments) are left untouched, and repeated `done()` calls are ignored.
function wrapTestFn(fn) {
  if (typeof fn !== 'function' || fn.length === 0) {
    return fn;
  }

  return function () {
    return new Promise((resolve, reject) => {
      let settled = false;

      function done(err) {
        if (settled) {
          return;
        }
        settled = true;
        if (err instanceof Error) {
          reject(err);
        } else {
          resolve();
        }
      }

      try {
        const result = fn.call(this, done);
        if (result && typeof result.then === 'function') {
          result.then(function () { done(); }, done);
        }
      } catch (err) {
        done(err);
      }
    });
  };
}

function withDoneCallbacks(original) {
  const wrapped = function (name, fn, timeout) {
    return original(name, wrapTestFn(fn), timeout);
  };

  wrapped.skip = function (name, fn, timeout) {
    return original.skip(name, wrapTestFn(fn), timeout);
  };
  wrapped.only = function (name, fn, timeout) {
    return original.only(name, wrapTestFn(fn), timeout);
  };

  return wrapped;
}

globalThis.it = withDoneCallbacks(globalThis.it || vitestIt);
globalThis.test = withDoneCallbacks(globalThis.test || vitestTest);
