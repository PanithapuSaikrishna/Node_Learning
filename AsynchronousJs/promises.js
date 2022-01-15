const promise = new Promise((resolve , reject) => {
    console.log('executing the promise')
    setTimeout(() => {
        // resolve(1);
        reject(new Error('Something went wrong..'))
    }, 2000);
});

promise.then((value) => {
    console.log(value);
}).catch((err) => {
    console.log(err.message);
})