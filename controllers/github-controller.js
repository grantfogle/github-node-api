const axios = require('axios')

function cleanUpUrl(repoUrl) {
    let cleanedUpUrl = repoUrl;

    if (!cleanedUpUrl.includes('repos')) {
        cleanedUpUrl = cleanedUpUrl.replace('.com', '.com/repos');
    }

    if (!cleanedUpUrl.includes("https://")) {
        cleanedUpUrl = "https://api." + cleanedUpUrl;
    } else {
        cleanedUpUrl = cleanedUpUrl.replace("https://", "https://api.");
    }

    if (cleanedUpUrl.charAt(cleanedUpUrl.length - 1) !== "/") {
        cleanedUpUrl += "/";
    }
    return cleanedUpUrl += "pulls?q=is%3Aopen";
}

async function fetchOpenPrs(gitRepoUrl) {
    const cleanFetchUrl = cleanUpUrl(gitRepoUrl);

    return axios.get(cleanFetchUrl)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error("Error fetching open prs", err);
        });
}

async function fetchNumberOfCommits(user, commitsUrl) {
    let retrievedCommitCountObj;
    await axios.get(commitsUrl)
        .then(response => {
            const { commits } = response.data;
            return { user, commitsUrl, commits };
        })
        .then(formattedCommitObj => {
            retrievedCommitCountObj = formattedCommitObj;
        })
        .catch(err => {
            console.error("Error fetching number of commits", err);
        });
    return retrievedCommitCountObj;
}


module.exports = { fetchOpenPrs, fetchNumberOfCommits, cleanUpUrl };
