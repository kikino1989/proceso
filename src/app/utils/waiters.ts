export const waitUntil = (condition: boolean | Function, next: Function, frequency = 10, tries?: number) => {
    if (tries === 0) return;
    let t1 = setTimeout(() => {
        if (typeof condition === 'function') {
            condition = condition();
        }
        
        if (!condition) {
            t1 = waitUntil(condition, next, frequency, Number.isInteger(tries) ? tries-1: tries);
        } else {
            next();
            clearTimeout(t1);
        }
    }, frequency);
    return t1;
};