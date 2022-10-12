let v = 23;

const k1 = setInterval(() => {
    console.log('k1' + v);
    v += 1
}, 0);
const k2 = setInterval(() => { 
    console.log('k2' + v);
    v -= 1
}, 200);

process.nextTick(() => {
    console.log('nextTick');
})

const promise = new Promise(resolve => {
    resolve();
    console.log('before promise' + v);
    process.nextTick(() => v /= 2);
    console.log('before promise nextTick' + v);
    v += 1;
    console.log('after promise' + v);
})
.then(() => {
    console.log('before then' + v);
    clearInterval(k1);
    console.log('before then1' + v);
    v += 1;
    console.log('after then' + v);
    return new Promise(resolve => setTimeout(() => {
        resolve()
        console.log('newPromise' + v);
    }, 601));
})
.then(() => {
    console.log('before then2' + v);
    clearInterval(k2)
    console.log('before then3' + v);
    v += 1;
    console.log('before then4' + v);
})
.finally(() => v /= 2);

console.log('finally' + v);

setTimeout(() => console.log(v), 2000);

// // 먼저 setTimeOut과 setInterval은 각각 timer Queue, check Queue에 들어가게되고 Promise Queue를 먼저 보게된다, Promise는 제어권을 뺏기지않아서 계속 실행이 되다가 
// // return으로 새로운 promise객체를 생성하는데 이때 setTimeout으로 600밀리초라는 시간이 주어지고 k1은 clear됬지만 k2는 남아있기에 600 / 200 총 3번 인터벌되고 이후에 다음 then과 finally를 진행하게된다 

// // 만약에 return으로 새로운 프로미스객체를 반환하여 시간을 주지않았다면 k2는 실행되지않고 두번째 then이 먼저 출력이 된다

// let v = 23;

// const k1 = setInterval(() => {
//     console.log('k1' + v);
//     v += 1
// }, 0);
// const k2 = setInterval(() => { 
//     console.log('k2' + v);
//     v -= 1
// }, 200);

// process.nextTick(() => {
//     console.log('nextTick');
// })

// const promise = new Promise(resolve => {
//     resolve();
//     console.log('before promise' + v);
//     process.nextTick(() => v /= 2);
//     console.log('before promise nextTick' + v);
//     v += 1;
//     console.log('after promise' + v);
// })
// .then(() => {
//     console.log('before then' + v);
//     clearInterval(k1);
//     console.log('before then1' + v);
//     v += 1;
//     console.log('after then' + v);
//     return new Promise(resolve => setTimeout(() => resolve(), 600));
// })
// .then(() => {
//     console.log('before then2' + v);
//     clearInterval(k2)
//     console.log('before then3' + v);
//     v += 1;
//     console.log('before then4' + v);
// })
// .finally(() => v /= 2);

// console.log('finally' + v);

// setTimeout(() => console.log(v), 2000);