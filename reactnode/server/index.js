const express = require('express');
const multer = require('multer');
const cors = require('cors');
const {PythonShell} = require('python-shell');

const PORT = process.env.PORT || 3001;

const app = express();
const upload= multer();
var pbody= "Cooking up your Summary";

app.use(upload.array()); 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.post('/postSum', callPythonScript);

function callPythonScript(req, res) {
      
  var summary="";

  const {spawn} = require("child_process");
  console.log(req.body.patentbody);
    
  var python = spawn('python',["C:/projectfinal/reactnode/server/scripts/inference.py",
      req.body.patentbody] );

  python.stdout.on('data', (data) => {
    console.log("Completed Summarization");
    summary=data.toString();
    console.log(data);
    res.json({sbody: summary});
  } );
    
  python.stderr.on('data', (data) => {
    console.log(`error:${data}`);
  });
  
}
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})
/*
app.post  ("/api", (req, res) => {
  
  const { name } = req.body;
  console.log(name);
  res.json({summary: });
});
*/

app.post("/api", callPythonScript);

function callPythonScript(req, res) {
      
  const { name } = req.body;
  //console.log(name);

  const {spawn} = require("child_process");
  console.log("\n\n\nBeginning Summarization\n\n\n\n");
    
  var python = spawn('python',["C:/projectfinal/reactnode/server/scripts/inference.py",
      name] );

  python.stdout.on('data', (data) => {
    console.log("Completed Summarization");
    var summarizedP=data.toString();
    console.log(summarizedP);
    res.json({summary: summarizedP});
  } );
    
  python.stderr.on('data', (data) => {
    console.log(`error:${data}`);
  });
  
}







app.get("/testapi", (req, res) => {
  (async function() {
    const pbody = await callName();
    console.log('contacts', contacts);
  })();
  res.json({ message:pbody});
  console.log(pbody);
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});