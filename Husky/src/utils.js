export class Chain {
  static queue = Promise.resolve();
  static chain(callback) {
    return (Chain.queue = Chain.queue.then(callback));
  }
}

export const CALC_METHOD = {
  min: (getValue) => (min, curr) => getValue(curr) < getValue(min) ? curr : min,
  max: (getValue) => (max, curr) => getValue(curr) < getValue(max) ? max : curr,
  bottom: (getValue) => (a, b) => getValue(a) < getValue(b) ? -1 : 1,
  top: (getValue) => (a, b) => getValue(a) < getValue(b) ? 1 : -1,
};
