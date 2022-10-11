var promise1 = Promise.resolve('success1');
var promise2 = Promise.resolve('success2');

const f = async () => {
    for await (msg of [promise1, promise2]) {
        console.log(msg);
    }
};

f();