console.log("global start");

process.nextTick(() => {
    console.log('nextTick');
})

const promise = new Promise((resolve, reject) => {
    let sum = 0;
    for(let i = 0; i < 10000000000; i++) {
        sum++;
    }
    resolve(sum);
    console.log("resolve is called.");
}).then((sum)=>
    {
        console.log(sum+"then is called.")
    });

console.log("global end");