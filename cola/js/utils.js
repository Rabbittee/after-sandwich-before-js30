/**
 * 毫無反應，就是個 pipe
 * @param  {...any} fns functions to be executed
 * @returns
 */
export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

/**
 * return the minimum item in an array
 * @param {*} arr
 * @param {*} func
 * @returns
 */
export const minBy = (arr, func) => arr.reduce((prev, curr) => (func(prev, curr) < func(curr, curr) ? prev : curr));

/**
 * return the maximum item in an array
 * @param {*} arr
 * @param {*} func
 * @returns
 */
export const maxBy = (arr, func) => arr.reduce((prev, curr) => (func(prev, curr) > func(curr, curr) ? prev : curr));
