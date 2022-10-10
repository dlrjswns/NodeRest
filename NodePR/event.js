let v = 23;

const k1 = setInterval(() => v += 1, 0);
const k2 = setInterval(() => v -= 1, 200);

const promise = new Promise(resolve => {
    resolve();
    process.nextTick(() => v /= 2);
    v += 1;
})
.then(() => {
    clearInterval(k1);
    v += 1;
    return new Promise(resolve => setTimeout(() => resolve(), 500));
})
.then(() => {
    clearInterval(k2)
    v += 1;
})
.finally(() => v /= 2);

setTimeout(() => console.log(v), 2000);