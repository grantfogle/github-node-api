const express = require("express");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
    res.send('<h1>HelloWorld</h1>')
});

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));