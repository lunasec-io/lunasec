/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
// from: https://raw.githubusercontent.com/elmarx/ts-try/master/src/index.ts

/**
 * helper to test if an object is a Promise.
 *
 * Taken from https://github.com/ssnau/xkit/blob/master/util/is-promise.js,
 * as suggested by https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise
 * as is plausible considering https://promisesaplus.com/#point-53
 */
function isPromiseLike(obj: unknown): obj is PromiseLike<unknown> {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof (obj as any).then === 'function';
}

/**
 * Union type to wrap the original type T and allow Errors additionally
 */
export type ErrorOrResult<T, E extends Error = Error> = T | E;

/**
 * simple function to turn a promise of type T to type T | Error
 *
 * i.e.: catch the error and return it as the value
 */
function tryify<T, E extends Error = Error>(p: PromiseLike<T>): PromiseLike<ErrorOrResult<T, E>> {
  return p.then(
    (x: T) => x,
    (err: E) => err
  );
}

/**
 * tryF wraps code that throws, and returns the result OR the error thrown
 *
 * it imitates the concept (though it's not a monad) of scala.util.Try — but try is a reserved keyword, so it's called tryF
 */
export function catchError<T, E extends Error = Error>(
  asyncBlock: () => PromiseLike<T>
): PromiseLike<ErrorOrResult<T, E>>;
export function catchError<T, E extends Error = Error>(block: () => T): ErrorOrResult<T, E>;
export function catchError<T, E extends Error = Error>(promise: PromiseLike<T>): PromiseLike<ErrorOrResult<T, E>>;
export function catchError<T, E extends Error = Error>(
  input: PromiseLike<T> | (() => T | PromiseLike<T>)
): ErrorOrResult<T, E> | PromiseLike<ErrorOrResult<T, E>> {
  // if the input is a simple promise, a simple try-ify is enough
  if (isPromiseLike(input)) {
    return tryify(input);
  }

  // ok, the input is a (sync or async) function, we need to execute it
  try {
    const v = input();

    // if block is an async function, try-ify the returned promise
    if (isPromiseLike(v)) {
      return tryify<T, E>(v);
    }

    // if block is sync, the result is in v, so just return
    return v;
  } catch (err) {
    // execution of block threw (and it's obviously sync), so return the error
    return err as never;
  }
}

export function threwError(e: unknown): e is Error {
  return e instanceof Error;
}
