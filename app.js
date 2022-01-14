const express = require("express");
const app = express();

const path = require("path");
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home", {
        title: "Grant's PR Fetcher",
        openPrs: []
    });
});

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));