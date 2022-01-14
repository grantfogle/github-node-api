const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { fetchOpenPrs, fetchNumberOfCommits } = require("./controllers/github-controller");

const path = require("path");
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home", {
        title: "Grant's Github Repo Fetcher",
        openPrs: []
    });
});

app.post("/repo-open-prs", async (req, res, next) => {
    const { repo } = req.body;
    let openPrsWithCommitCount = [];

    await fetchOpenPrs(repo).then(response => {
        return response;
    }).then(repoInfo => {
        if (repoInfo) {
            return repoInfo.data.map(openPR => {
                const { user, url } = openPR;
                return fetchNumberOfCommits(user, url).then(commitRes => {
                    openPrsWithCommitCount.push(commitRes);
                });
            });
        }
    });

    setTimeout(() => {
        res.render("home", {
            title: "Grant's PR Fetcher",
            openPrs: openPrsWithCommitCount
        });
    }, 1000);
});


app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));