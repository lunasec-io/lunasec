export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function randomDelayWith<T>(lower: number, upper: number, withFn: () => T) {
    // TODO: Check that lower is less than upper

    // This is a shitty linear sleep.
    // await sleep(lower + (Math.random() * (upper - lower)));

    // This sleep is a probability distribution (kind of).
    // f(x) = 1 / (x ^ 4)
    // Plus some random linear noise to keep it from being suspiciously close to the lower bound.
    await sleep(
        Math.round(
            lower + Math.round(Math.random() * lower)
        ) + Math.round(
            Math.min(upper, 1 / Math.pow(Math.random(), 4))
        )
    );

    return withFn();
}

export async function swallowErrors<T extends Function, TArgs>(fn: T, ...args: TArgs[]) {
    try {
        return await fn.apply(fn, args);
    } catch (e) {
        return [];
    }
}

export function everyFn<T, R>(...args: ((f: T) => R)[]) {
    return (f: T) => args.every(fn => fn(f));
}
