const express = require("express");
const path = require("path");
const cors = require("cors");
const Rollbar = require("rollbar");

const app = express();

app.use(cors());
app.use(express());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

const port = process.env.PORT || 4545

app.listen(port, () => {
    console.log(`They're taking the Hobbits to port ${port}`);
});