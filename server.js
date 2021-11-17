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
app.use(express.json());

app.use("/css", express.static(path.join(__dirname, "/public/styles.css")));

app.use("/", express.static(path.join(__dirname, "/public/index.html")));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "/public/index.html"));
//     rollbar.info("HTML file served successfully!");
// });

app.get('/api/students', (req, res) => {
  rollbar.info('Someone got the list of students on page load')
  res.status(200).send(students)
})

app.post('/api/students', function(req, res) {
  let {name} = req.body
  name = name.trim()

  const index = students.findIndex(studentName=> studentName === name)

  if(index === -1 && name !== ''){
      students.push(name)
      rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
      res.status(200).send(students)
  } else if (name === ''){
      rollbar.error('No name given')
      res.status(400).send('must provide a name.')
  } else {
      rollbar.error('student already exists')
      res.status(400).send('that student already exists')
  }
})

const port = process.env.PORT || 4545

app.use(rollbar.errorHandler());

app.listen(port, () => {
    console.log(`They're taking the Hobbits to port ${port}`);
});