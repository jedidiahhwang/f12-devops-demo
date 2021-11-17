const express = require("express");
const path = require("path");
const cors = require("cors");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
    accessToken: 'c6091fb9bf5c4d52ac07cbdc80e01d24',
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
})

const port = process.env.PORT || 4545

app.listen(port, () => {
    console.log(`They're taking the Hobbits to port ${port}`);
});