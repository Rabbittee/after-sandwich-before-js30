export class Chain {
  static queue = Promise.resolve();
  static chain(callback) {
    return (Chain.queue = Chain.queue.then(callback));
  }
}

export const calcMethod = {
  MIN: (getValue) => (min, curr) => getValue(curr) < getValue(min) ? curr : min,
  MAX: (getValue) => (max, curr) => getValue(curr) < getValue(max) ? max : curr,
  BOTTOM: (getValue) => (a, b) => getValue(a) < getValue(b) ? -1 : 1,
  TOP: (getValue) => (a, b) => getValue(a) < getValue(b) ? 1 : -1,
};
