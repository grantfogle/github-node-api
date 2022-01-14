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

function fetchOpenPrs(gitRepoUrl) {
    const cleanFetchUrl = cleanUpUrl(gitRepoUrl);
    console.log(cleanFetchUrl)
}

module.exports = { fetchOpenPrs, cleanUpUrl };
