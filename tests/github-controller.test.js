const { fetchOpenPrs, fetchNumberOfCommits, cleanUpUrl } = require("../controllers/github-controller");

describe('github controller', () => {

    test('cleanUpUrl method should clean up given url', () => {
        const testCleanUrl = cleanUpUrl("github.com/mempool/mempool");
        expect(testCleanUrl).toEqual("https://api.github.com/repos/mempool/mempool/pulls?q=is%3Aopen");
    });

});