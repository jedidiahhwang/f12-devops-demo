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
const students = ["Jeddy"];

app.use(cors());
app.use(express());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("HTML file served successfully!");
});

app.post('/api/students', function(req, res) {
    let { name } = req.body;
    
    const index = students.findIndex((student) => {
        return student === name
    })

    try {
        if (index === -1 && name !== "") {
          students.push(name);
          rollbar.info('Someone added a student')
          res.status(200).send(students);
        } else if (name === "") {
            rollbar.error('Someone tried to enter a blank student')

            res.status(400).send("must provide a name");
        } else {
            rollbar.error('Someone tried to enter a duplicate student name')
          res.status(400).send("that student already exists");
        }
      } catch (err) {
        console.log(err)
        rollbar.error(err)
      }
})

const port = process.env.PORT || 4545

app.use(rollbar.errorHandler());

app.listen(port, () => {
    console.log(`They're taking the Hobbits to port ${port}`);
});