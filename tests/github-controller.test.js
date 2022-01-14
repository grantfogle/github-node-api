const axios = require("axios");
const { fetchOpenPrs, fetchNumberOfCommits, cleanUpUrl } = require("../controllers/github-controller");

jest.mock("axios");

describe('github controller', () => {

    describe("when cleanUpUrl is called", () => {
        it("should return cleaned up url", async () => {
            const testCleanUrl = cleanUpUrl("github.com/mempool/mempool");
            expect(testCleanUrl).toEqual("https://api.github.com/repos/mempool/mempool/pulls?q=is%3Aopen");
        });
    });

    describe("when fetchOpenPrs is called", () => {
        it("should return github response", async () => {
            const mockedRepoResponse = [
                {
                    user: { login: 'grantfogle' },
                    url: 'https://github.com/colinhacks/zod/pull/851'
                }
            ];

            axios.get.mockResolvedValueOnce(mockedRepoResponse)
            const result = await fetchOpenPrs('https://github.com/mempool/mempool');

            expect(axios.get).toHaveBeenCalledWith('https://api.github.com/repos/mempool/mempool/pulls?q=is%3Aopen');
            expect(result).toEqual(mockedRepoResponse);
        });
    });

    describe("when fetchNumberOfCommits is called", () => {
        it("should return user obj with number of commits", async () => {
            const mockUser = { login: 'grantfogle' };
            const mockedReturnObj = {
                user: { login: 'grantfogle' },
                commitsUrl: 'https://api.github.com/repos/mempool/mempool/pulls/1142',
                "commits": 4,
            };
            const mockedCommitRes = { data: { commits: 4 } }

            axios.get.mockResolvedValueOnce(mockedCommitRes);
            const result = await fetchNumberOfCommits(mockUser, 'https://api.github.com/repos/mempool/mempool/pulls/1142');
            expect(axios.get).toHaveBeenCalledWith('https://api.github.com/repos/mempool/mempool/pulls/1142');
            expect(result).toEqual(mockedReturnObj);
        });
    });

});