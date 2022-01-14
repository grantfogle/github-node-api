const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { fetchOpenPrs } = require("./controllers/github-controller");

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

app.post("/repo-open-prs", async (req, res) => {
    const { repo } = req.body;
    fetchOpenPrs(repo);
    await fetchOpenPrs(repo).then(response => {
        console.log(response);
        return response;
    });

    const openPrsWithCommitCount = [
        {
            user: {
                login: 'grant',
            },
            commits: 5,
            commitsUrl: 'grantcommiturl.com/',
        }
    ];

    res.render("home", {
        title: "Grant's Github Repo Fetcher",
        openPrs: openPrsWithCommitCount
    });

});


app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));