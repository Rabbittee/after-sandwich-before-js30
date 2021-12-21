export class Chain {
    static queue = Promise.resolve();
    static chain(callback) {
        return (Chain.queue = Chain.queue.then(callback));
    }
}