setImmediate(() => {
    console.log('immediate');
});

setInterval(() => {
    console.log('setInterval');
});

process.nextTick(() => {
    console.log('nextTick');
});

setTimeout(() => {
    console.log('timeout');
});

Promise.resolve().then(() => console.log('promise'))

// nextTick => promise => setInterval => timeout => immediate