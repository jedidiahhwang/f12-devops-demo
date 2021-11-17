const express = require("express");
const path = require("path");
const cors = require("cors");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
    accessToken: '16f59f88454c4295a6b54288e8ac3120',
    captureUncaught: true,
    captureUnhandledRejections: true,
})
  
// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const app = express();

app.use(cors());
app.use(express());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("HTML file served successfully!");
});

app.post("/api/student", (req, res) => {
    let {name} = req.body; // This needs to be let (used to be const)
    name = name.trim();
    students.push(name);

    rollbar.log("Student added successfully", {author: "Jeddy", type: "Manual entry"})
    res.status(200).send(students);
});

const port = process.env.PORT || 4545

app.listen(port, () => {
    console.log(`They're taking the Hobbits to port ${port}`);
});