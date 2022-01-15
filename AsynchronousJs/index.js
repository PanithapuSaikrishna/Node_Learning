/*
getUser(12, (userDetails) => {
    console.log(userDetails);
    getRepositories(userDetails, (repos) => {
        console.log(repos);
        getCommits(repos[0], (commits) => {
            console.log(commits);
        });
    });
}); 
*/
// This is call back hell as the calls are nested deeply
// and the alternative is names functions, promises, async await
// getUser(1)
// .then(user => getRepositories(user))
// .then(repos => getCommits(repos[0]))
// .then(commits => console.log(commits))
// .catch(err => {
//     console.log("Error",err.message);
// });

// Running Promises in parallel;
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve({ id: 1, name: 'Sai' })
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ id: 2, name: 'Krishna' });
        // reject(new Error('Something went wrong'))
    }, 2000);
});

Promise.all([p1, p2]).then((result) => {
    console.log(result)
}).catch(err => console.log("Error", err));

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (error) {
        console.log("error", error.message)
    }
};

displayCommits();


function getRepositories(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Got repos');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
};

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('got commits');
            resolve({ commits: [1, 2, 3] })
        }, 2000);
    })
};
/*
There are three patterns to deal with
Asynchronous code.
1. Callbacks
2.Promises
3.Async, await -> it is just the syntactical sugar of promises
*/
function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("got user")
            resolve({ id, name: 'Sai Krishna' });
            // reject("Error");
        }, 2000);
    });
};

