const express = require("express");
const app = express();

const path = require("path");
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home", {
        title: "Grant's Github Repo Fetcher",
        openPrs: []
    });
});

app.post("/repo-open-prs", async (req, res) => {
    const openPrsWithCommitCount = [
        {
            user: {
                login: 'grant',
            },
            commitUrl: 'grantcommiturl.com/',
            commits: 5
        }
    ];

    res.render("home", {
        title: "Grant's Github Repo Fetcher",
        openPrs: openPrsWithCommitCount
    });

});


app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));